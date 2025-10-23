CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "vector_small" vector(1536) NOT NULL,
    "vector_large" vector(3072) NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Summary" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "vector_small" vector(1536) NOT NULL,
    "vector_large" vector(3072) NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keywords" (
    "id" SERIAL NOT NULL,
    "keywords" TEXT[],
    "vector_small" vector(1536) NOT NULL,
    "vector_large" vector(3072) NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Themes" (
    "id" SERIAL NOT NULL,
    "themes" TEXT[],
    "vector_small" vector(1536) NOT NULL,
    "vector_large" vector(3072) NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "translator" TEXT,
    "text" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "workId" INTEGER,
    "entryId" INTEGER,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commentary" (
    "id" SERIAL NOT NULL,
    "commentator" TEXT,
    "text" TEXT NOT NULL,
    "url" TEXT,
    "workId" INTEGER,
    "entryId" INTEGER,

    CONSTRAINT "Commentary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "secondary_title" TEXT,
    "reference" TEXT,
    "pages" INTEGER[],
    "notes" TEXT,
    "year" INTEGER,
    "season" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "date_text" TEXT,
    "placename" TEXT,
    "geometry" geometry(Point, 4326),

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "url" TEXT,
    "workId" INTEGER,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Summary_workId_key" ON "Summary"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_workId_key" ON "Keywords"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "Themes_workId_key" ON "Themes"("workId");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Themes" ADD CONSTRAINT "Themes_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;
