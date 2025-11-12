import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Commentary = {
    id: Generated<number>;
    commentator: string | null;
    text: string;
    url: string | null;
    title: string | null;
    workId: number | null;
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
export type Metadata = {
    id: Generated<number>;
    summary: string;
    keywords: string[];
    themes: string[];
    sectionId: number | null;
    letterId: number | null;
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
    workId: number | null;
};
export type Section = {
    id: Generated<number>;
    title: string | null;
    text: string;
    pages: number[];
    position: number | null;
    workId: number;
};
export type Source = {
    id: Generated<number>;
    publication: string | null;
    author: string | null;
    title: string | null;
    url: string | null;
    letterId: number | null;
    workId: number | null;
};
export type Translation = {
    id: Generated<number>;
    translator: string | null;
    text: string;
    language: string;
    url: string | null;
    title: string | null;
    workId: number | null;
    letterId: number | null;
};
export type Work = {
    id: Generated<number>;
    title: string;
    alt_title: string | null;
    blurb: string | null;
    year: number | null;
    month: number | null;
    day: number | null;
    placename: string | null;
};
export type DB = {
    Commentary: Commentary;
    Letter: Letter;
    Metadata: Metadata;
    Publication: Publication;
    Section: Section;
    Source: Source;
    Translation: Translation;
    Work: Work;
};
