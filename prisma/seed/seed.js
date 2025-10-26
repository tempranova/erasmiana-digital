import { PrismaClient } from '@prisma/client'

import importJSON from '../data/seed-1.json' with { type: "json" };

const prisma = new PrismaClient();

async function main() {

  if(importJSON) {

    for(let i=0; i < importJSON.letters.length; i++) {

      let thisLetter = importJSON.letters[i];

      let newWork = await prisma.work.create({
        data : {
          title : thisLetter.work.title,
          type : "letter",
          alt_title : thisLetter.work.alt_title,
          entries : {
            createMany : {
              data : thisLetter.entries.map(entry => {
                return {
                  text : entry.text,
                  position : entry.position
                }
              })
            }
          },
          commentaries : {
            createMany : {
              data : thisLetter.commentary.map(commentary => {
                return {
                  text : commentary.text,
                  commentator : commentary.commentator
                }
              })
            }
          },
          translations : {
            createMany : {
              data : thisLetter.translations.map(translation => {
                return {
                  text : translation.text,
                  translator : translation.translator,
                  language : translation.language,
                }
              })
            }
          },
          entries : {
            createMany : {
              data : thisLetter.entries.map(entry => {
                return {
                  text : entry.text,
                  position : entry.position
                }
              })
            }
          },
          metadata : {
            create : {
              volume : thisLetter.metadata.volume.toString(),
              reference : thisLetter.metadata.reference,
              placename : thisLetter.metadata.placename,
              pages : thisLetter.metadata.pages,
              date_text : thisLetter.metadata.date_text,
              related_to : thisLetter.metadata.related_to,
            }
          },
          summary : {
            create : {
              text : thisLetter.summary.text
            }
          },
          keywords : {
            create : {
              keywords : thisLetter.keywords.text
            }
          },
          themes : {
            create : {
              themes : thisLetter.themes.text
            }
          }
        },
        select : {
          id : true,
          summary : true,
          keywords : true,
          themes : true
        }
      });

      const summaryVector = `[${thisLetter.summary.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Summary"
        SET vector_small = '${summaryVector}'::vector
        WHERE id = ${newWork.summary.id};
      `)

      const themeVector = `[${thisLetter.themes.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Themes"
        SET vector_small = '${themeVector}'::vector
        WHERE id = ${newWork.themes.id};
      `)

      const keywordVector = `[${thisLetter.keywords.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Keywords"
        SET vector_small = '${keywordVector}'::vector
        WHERE id = ${newWork.keywords.id};
      `)

      console.log(`created work id: ${newWork.id}`)

    }

  }
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
