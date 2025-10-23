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
          secondary_title : thisLetter.work.secondary_title,
          reference : thisLetter.work.reference,
          notes : thisLetter.work.notes,
          pages : thisLetter.work.pages,
          date_text : thisLetter.work.date_text,
          placename : thisLetter.work.placename,
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