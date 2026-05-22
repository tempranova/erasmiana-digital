import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";

export const GET = async (req, route) => {

  const results = await db
    .selectFrom('Metadata')
    .select((eb) => [
      eb.fn('ST_AsGeoJSON', ['geometry']).as('geometry'),
      eb.fn.countAll().as('count'),
    ])
    .groupBy('geometry')
    .execute()

  return NextResponse.json(results);
}
