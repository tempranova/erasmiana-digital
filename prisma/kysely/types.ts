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
    workId: number | null;
    entryId: number | null;
};
export type Entry = {
    id: Generated<number>;
    text: string;
    position: number | null;
    workId: number;
};
export type Keywords = {
    id: Generated<number>;
    keywords: string[];
    workId: number;
};
export type Source = {
    id: Generated<number>;
    name: string | null;
    url: string | null;
    workId: number | null;
};
export type Summary = {
    id: Generated<number>;
    text: string;
    workId: number;
};
export type Themes = {
    id: Generated<number>;
    themes: string[];
    workId: number;
};
export type Translation = {
    id: Generated<number>;
    translator: string | null;
    text: string;
    language: string;
    workId: number | null;
    entryId: number | null;
};
export type Work = {
    id: Generated<number>;
    title: string;
    secondary_title: string | null;
    reference: string | null;
    pages: number[];
    notes: string | null;
    year: number | null;
    season: number | null;
    month: number | null;
    day: number | null;
    date_text: string | null;
    placename: string | null;
};
export type DB = {
    Commentary: Commentary;
    Entry: Entry;
    Keywords: Keywords;
    Source: Source;
    Summary: Summary;
    Themes: Themes;
    Translation: Translation;
    Work: Work;
};
