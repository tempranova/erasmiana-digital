import { PrismaClient } from '@prisma/client'

import letterJSON from '../data/seed-1.json' with { type: "json" };
import bookJSON from '../data/book-seed.json' with { type: "json" };
import placenames from '../data/placenames.json' with { type: "json" };

const prisma = new PrismaClient();

async function main() {

  if(bookJSON) {

    for(let i=0; i < bookJSON.length; i++) {

      let thisBook = bookJSON[i];

      const thisPlacename = placenames.find(place => thisBook.placename.indexOf(place.place_raw) > -1);

      let newBook = await prisma.book.create({
        data : {
          title : thisBook.title,
          type : thisBook.type,
          alt_title : thisBook.alt_title,
          excerpt : thisBook.excerpt,
          year : parseInt(thisBook.year),
          month : parseInt(thisBook.month),
          day : parseInt(thisBook.day),
          placename : thisPlacename ? thisPlacename.normalized_name : "",
          translations : {
            createMany : {
              data : thisBook.translations.map(translation => {
                return {
                  text : translation.text ? translation.text : "",
                  translator : translation.translator,
                  language : translation.language,
                  title : translation.title ? translation.title : "",
                  url : translation.url ? translation.url : ""
                }
              })
            }
          },
        },
        select : {
          id : true
        }
      });

      if(thisPlacename) {
        const geometry = { type : "Point", coordinates : [parseFloat(thisPlacename.lng), parseFloat(thisPlacename.lat)] }
        await prisma.$executeRawUnsafe(`
          UPDATE "Book"
          SET geometry = ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))
          WHERE id = ${newBook.id};
        `)
      }

      for(let ii=0; ii < thisBook.sections.length; ii++) {
        
        let thisSection = thisBook.sections[ii];

        let newSection = await prisma.section.create({
          data : {
            text : thisSection.text,
            title : thisSection.title,
            position : thisSection.position,
            bookId : newBook.id,
            keywords : {
              create : {
                keywords : thisSection.keywords
              }
            },
            themes : {
              create : {
                themes : thisSection.themes
              }
            },
            summary : {
              create : {
                text : thisSection.summary
              }
            }
          },
          select : {
            id : true,
            themes : true,
            keywords : true,
            summary : true
          }
        });

        const summaryVector = `[${thisSection.summary_embed.join(', ')}]`;
        await prisma.$executeRawUnsafe(`
          UPDATE "Summary"
          SET vector_small = '${summaryVector}'::vector
          WHERE id = ${newSection.summary.id};
        `)

        const themeVector = `[${thisSection.themes_embed.join(', ')}]`;
        await prisma.$executeRawUnsafe(`
          UPDATE "Themes"
          SET vector_small = '${themeVector}'::vector
          WHERE id = ${newSection.themes.id};
        `)

        const keywordVector = `[${thisSection.keyword_embed.join(', ')}]`;
        await prisma.$executeRawUnsafe(`
          UPDATE "Keywords"
          SET vector_small = '${keywordVector}'::vector
          WHERE id = ${newSection.keywords.id};
        `)

        console.log(`created section id: ${newSection.id}`)

      }

      console.log(`created book id: ${newBook.id}`)

    }

  }

  if(letterJSON) {

    for(let i=0; i < letterJSON.letters.length; i++) {

      let thisLetter = letterJSON.letters[i];

      const thisPlacename = placenames.find(place => thisLetter.place_text.indexOf(place.place_raw) > -1);

      let newLetter = await prisma.letter.create({
        data : {
          title : thisLetter.title,
          alt_title : thisLetter.alt_title,
          text : thisLetter.text,
          volume : thisLetter.volume.toString(),
          reference : thisLetter.reference,
          author : thisLetter.author ? thisLetter.author : null,
          recipient : thisLetter.recipient ? thisLetter.recipient : null,
          origin : thisLetter.origin ? thisLetter.origin : thisPlacename ? thisPlacename.normalized_name : null,
          destination : thisLetter.destination ? thisLetter.destination : null,
          place_text : thisLetter.place_text,
          year : parseInt(thisLetter.year),
          month : parseInt(thisLetter.month),
          season : parseInt(thisLetter.season),
          day : parseInt(thisLetter.day),
          pages : thisLetter.pages,
          date_text : thisLetter.date_text,
          related_to : thisLetter.related_to,
          commentaries : {
            createMany : {
              data : thisLetter.commentary.map(commentary => {
                return {
                  text : commentary.text ? commentary.text : "",
                  commentator : commentary.commentator,
                  title : commentary.title ? commentary.title : "",
                  url : commentary.url ? commentary.url : ""
                }
              })
            }
          },
          translations : {
            createMany : {
              data : thisLetter.translations.map(translation => {
                return {
                  text : translation.text ? translation.text : "",
                  translator : translation.translator,
                  language : translation.language,
                  title : translation.title ? translation.title : "",
                  url : translation.url ? translation.url : ""
                }
              })
            }
          },
          sources : {
            createMany : {
              data : thisLetter.sources.map(source => {
                return {
                  publication : source.book,
                  author : source.author,
                  title : source.title,
                  url : source.url
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

      if(thisLetter.origin_geo) {
        const geometry = { type : "Point", coordinates : thisLetter.origin_geo }
        await prisma.$executeRawUnsafe(`
          UPDATE "Letter"
          SET origin_geo = ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))
          WHERE id = ${newLetter.id};
        `)
      } else if(thisPlacename) {
        const geometry = { type : "Point", coordinates : [parseFloat(thisPlacename.lng), parseFloat(thisPlacename.lat)] }
        await prisma.$executeRawUnsafe(`
          UPDATE "Letter"
          SET origin_geo = ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))
          WHERE id = ${newLetter.id};
        `)
      }
      if(thisLetter.destination_geo) {
        const geometry = { type : "Point", coordinates : thisLetter.destination_geo }
        await prisma.$executeRawUnsafe(`
          UPDATE "Letter"
          SET destination_geo = ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))
          WHERE id = ${newLetter.id};
        `)
      } 

      const summaryVector = `[${thisLetter.summary.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Summary"
        SET vector_small = '${summaryVector}'::vector
        WHERE id = ${newLetter.summary.id};
      `)

      const themeVector = `[${thisLetter.themes.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Themes"
        SET vector_small = '${themeVector}'::vector
        WHERE id = ${newLetter.themes.id};
      `)

      const keywordVector = `[${thisLetter.keywords.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Keywords"
        SET vector_small = '${keywordVector}'::vector
        WHERE id = ${newLetter.keywords.id};
      `)

      console.log(`created letter id: ${newLetter.id}`)

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
