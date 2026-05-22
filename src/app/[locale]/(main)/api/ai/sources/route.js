import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';
import { jsonBuildObject, jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import { NextResponse } from "next/server";
import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY
});

export const POST = async (req, route) => {
  const body = await req.json();

  console.log(body)

  if (!body.messages || body.messages.length === 0) {
    return NextResponse.json({ error : "No messages sent." }, { status: 400 });
  }

  const messagesToSend = [{ role: 'system', content: `
    "You are an assistant to a chat bot.\n
    "Summarize the user's messages in a few key themes that could relate to Erasmus of Rotterdam.\n
    "Generalize or abstract if necessary, if the themes appear totally unrelated.\n
    Be concise, no more than 10 word response."
  `}];

  body.messages.forEach(message => {
    messagesToSend.push({
      role : "user",
      content : typeof message.message === 'string' ? message.message : message.message.props.dangerouslySetInnerHTML["__html"]
    })
  })

  const textResult = await generateText({
    model : deepseek('deepseek-chat'),
    messages: messagesToSend,
    // maxTokens: 200,
    temperature : 1.3,
  });

  const queryEmbedding = (
    await client.embeddings.create({
      model: "text-embedding-3-small",
      input: textResult.text,
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
  
  sub = sub.as('deduped')

  const results = await db
    .selectFrom(sub)
    .selectAll()
    .orderBy('distance')
    .limit(3)
    .execute()

  return NextResponse.json({
    searchTerm : textResult.text,
    results : results
  });

}
