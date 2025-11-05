import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Book = {
    id: Generated<number>;
    title: string;
    alt_title: string | null;
    excerpt: string | null;
    year: number | null;
    month: number | null;
    day: number | null;
    placename: string | null;
};
export type Commentary = {
    id: Generated<number>;
    commentator: string | null;
    text: string;
    url: string | null;
    title: string | null;
    bookId: number | null;
    letterId: number | null;
};
export type Keywords = {
    id: Generated<number>;
    keywords: string[];
    sectionId: number | null;
    letterId: number | null;
};
export type Letter = {
    id: Generated<number>;
    title: string;
    alt_title: string | null;
    reference: string | null;
    volume: string | null;
    pages: number[];
    year: number | null;
    season: number | null;
    month: number | null;
    day: number | null;
    author: string | null;
    recipient: string | null;
    date_text: string | null;
    place_text: string | null;
    origin: string | null;
    destination: string | null;
    related_to: string | null;
    text: string;
};
export type Publication = {
    id: Generated<number>;
    title: string;
    publisher: string | null;
    language: string | null;
    year: number | null;
    month: number | null;
    day: number | null;
    placename: string | null;
    bookId: number | null;
};
export type Section = {
    id: Generated<number>;
    title: string | null;
    text: string;
    position: number | null;
    bookId: number;
};
export type Source = {
    id: Generated<number>;
    publication: string | null;
    author: string | null;
    title: string | null;
    url: string | null;
    letterId: number | null;
    bookId: number | null;
};
export type Summary = {
    id: Generated<number>;
    text: string;
    sectionId: number | null;
    letterId: number | null;
};
export type Themes = {
    id: Generated<number>;
    themes: string[];
    sectionId: number | null;
    letterId: number | null;
};
export type Translation = {
    id: Generated<number>;
    translator: string | null;
    text: string;
    language: string;
    url: string | null;
    title: string | null;
    bookId: number | null;
    letterId: number | null;
};
export type DB = {
    Book: Book;
    Commentary: Commentary;
    Keywords: Keywords;
    Letter: Letter;
    Publication: Publication;
    Section: Section;
    Source: Source;
    Summary: Summary;
    Themes: Themes;
    Translation: Translation;
};
