import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'

import Book from '@/components/book/book-container';

export const dynamic = 'force-static';
export const revalidate = false;

export default async function Page({ params : { id }}) {
  
  const book = await db.selectFrom('Book')
    .where('id', '=', id)
    .select((eb) => [
      'id', 'title', 'alt_title', 
      jsonArrayFrom(
        eb.selectFrom('Section')
          .select(['id', 'title', 'position', 'text'])
          .whereRef('Section.bookId', '=', 'Book.id')
      ).as('sections'),
      jsonArrayFrom(
        eb.selectFrom('Commentary')
          .select(['id', 'commentator', 'text', 'url', 'title'])
          .whereRef('Commentary.bookId', '=', 'Book.id')
      ).as('commentary'),
      jsonArrayFrom(
        eb.selectFrom('Translation')
          .select(['id', 'translator', 'text', 'language', 'url', 'title'])
          .whereRef('Translation.bookId', '=', 'Book.id')
      ).as('translations'),
      jsonArrayFrom(
        eb.selectFrom('Source')
          .select(['id', 'title', 'url', 'author', 'publication'])
          .whereRef('Source.bookId', '=', 'Book.id')
      ).as('sources'),
  ])
  .executeTakeFirst()

  book.sections.sort((a, b) => a.position > b.position ? 1 : -1);

  return (
    <div className="w-full min-h-screen h-full bg-[url('/assets/erasmus-bg-2.png')] bg-cover bg-center bg-no-repeat bg-[#1d1f1b] bg-blend-overlay p-16">
      <div className="w-full m-auto max-w-7xl pb-16">
        <Book book={book} />
      </div>
    </div>
  );
}
