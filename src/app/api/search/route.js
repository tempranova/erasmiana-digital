import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ 
  apiKey: process.env.OPEN_AI_KEY
});

export const POST = async (req, route) => {
	const body = await req.json();

  if (!body.search || body.search === "") {
    return NextResponse.json({ error : "No search sent." }, { status: 400 });
  } else {
    
    const queryEmbedding = (
      await client.embeddings.create({
        model: "text-embedding-3-small",
        input: body.search,
      })
    ).data[0].embedding;

    const vectorLiteral = `[${queryEmbedding.join(', ')}]`

    const sub = db
      .selectFrom('Summary')
      .select(['id', 'text'])
      .distinctOn(['text'])
      .select(sql`vector_small <=> ${vectorLiteral}::vector`.as('distance'))
      .orderBy('text')
      .orderBy('distance')
      .as('deduped')

    const results = await db
      .selectFrom(sub)
      .selectAll()
      .orderBy('distance')
      .limit(10)
      .execute()
  
    return NextResponse.json(results);
  }
}