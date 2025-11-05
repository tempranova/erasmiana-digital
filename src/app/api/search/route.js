import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';
import { jsonBuildObject, jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
});

export const POST = async (req, route) => {
	const body = await req.json();

  if (!body.search || body.search === "") {
    return NextResponse.json({ error : "No search sent." }, { status: 400 });
  } 
  if (!body.type || body.type === "") {
    return NextResponse.json({ error : "No search type sent." }, { status: 400 });
  } 
  if (!body.objects || body.objects === "") {
    return NextResponse.json({ error : "No search objects sent." }, { status: 400 });
  } 

  const page = body.page ? body.page : 1;
  const pageSize = 10;

  if(body.type === 'semantic') {
    const queryEmbedding = (
      await client.embeddings.create({
        model: "text-embedding-3-small",
        input: body.search,
      })
    ).data[0].embedding;

    const vectorLiteral = `[${queryEmbedding.join(', ')}]`

    const combined = sql`
      (
        SELECT 
          id,
          text::text AS content,
          "letterId",
          "sectionId",
          vector_small
        FROM "Summary"

        UNION ALL

        SELECT 
          id,
          array_to_string(themes, ', ')::text AS content,
          "letterId",
          "sectionId",
          vector_small
        FROM "Themes"

        UNION ALL

        SELECT 
          id,
          array_to_string(keywords, ', ')::text AS content,
          "letterId",
          "sectionId",
          vector_small
        FROM "Keywords"
      )
    `.as('combined');

    let sub = db
      .selectFrom(combined)
      .distinctOn(['summary'])
      .select((eb) => [
        sql`vector_small <=> ${vectorLiteral}::vector`.as('distance'),
        sql`(
          SELECT "text" FROM "Summary"
          WHERE "Summary"."id" = combined."id"
          LIMIT 1
        )`.as('summary'),
        jsonArrayFrom(
          db.selectFrom('Keywords')
            .select('keywords')
            .whereRef('Keywords.id', '=', 'combined.id')
        ).as('keywords'),
        jsonArrayFrom(
          db.selectFrom('Themes')
            .select('themes')
            .whereRef('Themes.id', '=', 'combined.id')
        ).as('themes'),
        jsonObjectFrom(
          eb.selectFrom('Letter')
            .select(['id', 'title', 'alt_title', 'reference', 'year', 'month', 'day', 'date_text', 'origin', 'destination', 'place_text'])
            .whereRef('Letter.id', '=', 'combined.letterId')
        ).as('letter'),
        jsonObjectFrom(
          eb.selectFrom('Section')
            .select((eb) => [
              'id', 'title',
              jsonObjectFrom(
                eb.selectFrom('Book')
                  .select(['id', 'title', 'alt_title', 'year', 'month', 'day', 'placename'])
                  .whereRef('Section.bookId', '=', 'Book.id')
              ).as('book')
            ])
            .whereRef('Section.id', '=', 'combined.sectionId')
        ).as('section')
      ])
      .orderBy('summary')
      .orderBy('distance')
      
    if(body.objects === 'letters') {
      sub = sub.where('combined.letterId', 'is not', null)
    }
    if(body.objects === 'books') {
      sub = sub.where('combined.sectionId', 'is not', null)
    }
    
    sub = sub.as('deduped')

    const results = await db
      .selectFrom(sub)
      .selectAll()
      .orderBy('distance')
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .execute()

    return NextResponse.json({
      searchTerm : body.search,
      totalResults : false,
      results : results
    });
    
  } else if(body.type === 'text') {

    const searchTerm = `%${body.search}%`;
    const snippetLength = 200;
    const context = 50;

    let totalResults = 0;
    let results = [];

    if(body.objects === 'all' || body.objects === 'letters') {
      let letterResults = await db
        .selectFrom("Letter")
        .distinctOn(['text'])
        .select([
          jsonArrayFrom(
            db.selectFrom('Keywords')
              .select('keywords')
              .whereRef('Keywords.letterId', '=', 'Letter.id')
          ).as('keywords'),
          jsonArrayFrom(
            db.selectFrom('Themes')
              .select('themes')
              .whereRef('Themes.letterId', '=', 'Letter.id')
          ).as('themes'),
          jsonBuildObject({
            id : sql.ref('id'), 
            title : sql.ref('title'), 
            alt_title : sql.ref('alt_title'), 
            reference : sql.ref('reference'), 
            year : sql.ref('year'), 
            month : sql.ref('month'), 
            day : sql.ref('day'), 
            date_text : sql.ref('date_text'), 
            origin : sql.ref('origin'), 
            destination : sql.ref('destination'), 
            place_text : sql.ref('place_text')
          }).as('letter'),
          sql`
            substring(
              text from greatest(position(lower(${body.search}) in lower(text)) - ${context}, 1)
              for ${snippetLength}
            )
          `.as('snippet')
        ])
        .where(sql`LOWER(text) LIKE LOWER(${searchTerm})`)
        .orderBy('text')
        .execute()
      results = results.concat(letterResults)
    }


    if(body.objects === 'all' || body.objects === 'books') {
      let sectionResults = await db
        .selectFrom("Section")
        .select((eb) => [
          jsonArrayFrom(
            db.selectFrom('Keywords')
              .select('keywords')
              .whereRef('Keywords.sectionId', '=', 'Section.id')
          ).as('keywords'),
          jsonArrayFrom(
            db.selectFrom('Themes')
              .select('themes')
              .whereRef('Themes.sectionId', '=', 'Section.id')
          ).as('themes'),
          jsonBuildObject({
            id : sql.ref('id'), 
            title : sql.ref('title'), 
            book : jsonObjectFrom(
              eb.selectFrom('Book')
                .select(['id', 'title', 'alt_title', 'year', 'month', 'day', 'placename'])
                .whereRef('Section.bookId', '=', 'Book.id')
            )
          }).as('section'),
          sql`
            substring(
              text from greatest(position(lower(${body.search}) in lower(text)) - ${context}, 1)
              for ${snippetLength}
            )
          `.as('snippet')
        ])
        .where(sql`LOWER(text) LIKE LOWER(${searchTerm})`)
        .orderBy('text')
        .execute()

      let translationQuery = db
        .selectFrom("Translation")
        .distinctOn(['text'])
        .select((eb) => [
          jsonBuildObject({
            id : sql.ref('id'), 
            title : sql.ref('title'), 
            alt_title : sql.ref('language')
          }).as('translation'),
          sql`
            substring(
              text from greatest(position(lower(${body.search}) in lower(text)) - ${context}, 1)
              for ${snippetLength}
            )
          `.as('snippet'),
          jsonObjectFrom(
            eb.selectFrom('Letter')
              .select(['id', 'title', 'alt_title', 'reference', 'year', 'month', 'day', 'date_text', 'origin', 'destination', 'place_text'])
              .whereRef('Translation.letterId', '=', 'Letter.id')
          ).as('letter'),
          jsonObjectFrom(
            eb.selectFrom('Book')
              .select(['id', 'title', 'alt_title', 'year', 'month', 'day', 'placename'])
              .whereRef('Translation.bookId', '=', 'Book.id')
          ).as('book')
        ])
        .where(sql`LOWER(text) LIKE LOWER(${searchTerm})`)
        .orderBy('text')

    
        if(body.objects === 'letters') {
          translationQuery = translationQuery.where('Translation.letterId', 'is not', null)
        }
        if(body.objects === 'books') {
          translationQuery = translationQuery.where('Translation.bookId', 'is not', null)
        }

      const translationResults = await translationQuery.execute()
      
      translationResults.forEach(result => {
        if(result.book) {
          result.section = {
            book : result.book
          }
        }
      })

      results = results.concat(sectionResults).concat(translationResults);
      totalResults = results.length;
      const beginResult = (page - 1) * pageSize;
      results = results.slice(beginResult, beginResult + pageSize)
    }

    return NextResponse.json({
      searchTerm : body.search,
      totalResults : totalResults,
      results : results
    });
  }

}
