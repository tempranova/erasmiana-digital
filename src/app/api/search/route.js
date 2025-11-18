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

    const candidates = await db
      .selectFrom("Metadata")
      .select(["id", sql`vector_small <=> ${vectorLiteral}::vector`.as("distance")])
      .orderBy(sql`vector_small <=> ${vectorLiteral}::vector`)
      .limit(100)   // limit BEFORE joins
      .execute();

    const ids = candidates.map((c) => c.id);

    let sub = db
      .selectFrom("Metadata")
      .select((eb) => [
        sql`vector_small <=> ${vectorLiteral}::vector`.as('distance'),
        jsonBuildObject({
          summary : sql.ref('summary'), 
          keywords : sql.ref('keywords'), 
          themes : sql.ref('themes')
        }).as('metadata'),
        jsonObjectFrom(
          eb.selectFrom('Letter')
            .select(['id', 'title', 'alt_title', 'reference', 'year', 'month', 'day', 'date_text', 'origin', 'destination', 'place_text'])
            .whereRef('Letter.id', '=', 'Metadata.letterId')
        ).as('letter'),
        jsonObjectFrom(
          eb.selectFrom('Section')
            .select((eb) => [
              'id', 'title', 'pages',
              jsonObjectFrom(
                eb.selectFrom('Work')
                  .select(['id', 'title', 'alt_title', 'year', 'month', 'day', 'placename'])
                  .whereRef('Section.workId', '=', 'Work.id')
              ).as('work')
            ])
            .whereRef('Section.id', '=', 'Metadata.sectionId')
        ).as('section')
      ])
      .where("Metadata.id", "in", ids)
      .orderBy('distance')
      
    if(body.objects === 'letters') {
      sub = sub.where('Metadata.letterId', 'is not', null)
    }
    if(body.objects === 'works') {
      sub = sub.where('Metadata.sectionId', 'is not', null)
    }
    if(body.selectedWorks && body.selectedWorks.length > 0) {
      sub = sub.leftJoin('Section', 'Section.id', 'Metadata.sectionId')
        .where('Section.workId', 'in', body.selectedWorks)
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
      totalResults : 1000,
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
          jsonObjectFrom(
            db.selectFrom('Metadata')
              .select('summary', 'themes', 'keywords')
              .whereRef('Metadata.letterId', '=', 'Letter.id')
          ).as('metadata'),
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


    if(body.objects === 'all' || body.objects === 'works') {
      let sectionResultsQuery = db
        .selectFrom("Section")
        .select((eb) => [
          jsonObjectFrom(
            db.selectFrom('Metadata')
              .select('summary', 'themes', 'keywords')
              .whereRef('Metadata.sectionId', '=', 'Section.id')
          ).as('metadata'),
          jsonBuildObject({
            id : sql.ref('id'), 
            title : sql.ref('title'), 
            pages : sql.ref('pages'),
            work : jsonObjectFrom(
              eb.selectFrom('Work')
                .select(['id', 'title', 'alt_title', 'year', 'month', 'day', 'placename'])
                .whereRef('Section.workId', '=', 'Work.id')
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

        if(body.selectedWorks && body.selectedWorks.length > 0) {
          sectionResultsQuery = sectionResultsQuery.where('Section.workId', 'in', body.selectedWorks)
        }

      let sectionResults = await sectionResultsQuery.execute();

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
            eb.selectFrom('Work')
              .select(['id', 'title', 'alt_title', 'year', 'month', 'day', 'placename'])
              .whereRef('Translation.workId', '=', 'Work.id')
          ).as('work')
        ])
        .where(sql`LOWER(text) LIKE LOWER(${searchTerm})`)
        .orderBy('text')

    
        if(body.objects === 'letters') {
          translationQuery = translationQuery.where('Translation.letterId', 'is not', null)
        }
        if(body.objects === 'works') {
          translationQuery = translationQuery.where('Translation.workId', 'is not', null)
        }
        if(body.selectedWorks && body.selectedWorks.length > 0) {
          translationQuery = translationQuery.where('Translation.workId', 'in', body.selectedWorks)
        }

      const translationResults = await translationQuery.execute()
      
      translationResults.forEach(result => {
        if(result.work) {
          result.section = {
            work : result.work
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
