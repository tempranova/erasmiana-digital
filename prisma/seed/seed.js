import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import pkg from 'stream-json';
import streamArrayPkg from 'stream-json/streamers/StreamArray.js';

// import letterJSON from '../data/letters-1.json' with { type: "json" };
// import workJSON from '../data/full-work-seed.json' with { type: "json" };
import placenames from '../data/placenames.json' with { type: "json" };

const { parser } = pkg;
const { streamArray } = streamArrayPkg;

const prisma = new PrismaClient();

async function main() {

  const pipeline = fs.createReadStream('prisma/data/full-work-seed.json')
    .pipe(parser())
    .pipe(streamArray());

  for await (const { value } of pipeline) {
    // value is one object from your array
    // let thisWork = workJSON.works[i];
    let thisWork = value;

    const thisPlacename = placenames.find(place => thisWork.placename.indexOf(place.place_raw) > -1);

    let newWork = await prisma.work.create({
      data : {
        title : thisWork.title,
        slug : thisWork.slug,
        alt_title : thisWork.alt_title,
        blurb : thisWork.blurb,
        year : parseInt(thisWork.year),
        month : parseInt(thisWork.month),
        day : parseInt(thisWork.day),
        placename : thisPlacename ? thisPlacename.normalized_name : "",
        publications : {
          createMany : {
            data : thisWork.publications.map(publication => {
              // Need to separate this to be able to insert geometries?
              const publicationPlacename = placenames.find(place => publication.placename.indexOf(place.place_raw) > -1);
              return {
                publisher : publication.publisher,
                language : publication.language,
                year : parseInt(publication.year),
                month : parseInt(publication.month),
                day : parseInt(publication.day),
                placename : publicationPlacename ? publicationPlacename.normalized_name : "",
                title : publication.title ? publication.title : ""
              }
            })
          }
        },
        sources : {
          createMany : {
            data : thisWork.sources.map(source => {
              return {
                author : source.author ? source.author : "",
                publication : source.publication ? source.publication : "",
                title : source.title ? source.title : "",
                url : source.url ? source.url : ""
              }
            })
          }
        },
        commentaries : {
          createMany : {
            data : thisWork.commentary.map(commentary => {
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
            data : thisWork.translations.map(translation => {
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
        UPDATE "Work"
        SET geometry = ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))
        WHERE id = ${newWork.id};
      `)
    }

    for(let ii=0; ii < thisWork.sections.length; ii++) {
      
      let thisSection = thisWork.sections[ii];

      let newSection = await prisma.section.create({
        data : {
          text : thisSection.text,
          title : thisSection.title ? thisSection.title : "",
          pages : thisSection.pages,
          position : thisSection.position,
          workId : newWork.id,
          metadata : {
            create : {
              keywords : thisSection.metadata.keywords,
              themes : thisSection.metadata.themes,
              summary : thisSection.metadata.summary
            }
          }
        },
        select : {
          id : true,
          metadata : true
        }
      });

      const semanticVector = `[${thisSection.metadata.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Metadata"
        SET vector_small = '${semanticVector}'::vector
        WHERE id = ${newSection.metadata.id};
      `)

      console.log(`created section id: ${newSection.id}`)

    }

    console.log(`created work id: ${newWork.id}`)
  }

  // if(letterJSON) {

  //   for(let i=0; i < letterJSON.letters.length; i++) {


  const pipeline2 = fs.createReadStream('prisma/data/letters.json')
    .pipe(parser())
    .pipe(streamArray());

  for await (const { value } of pipeline2) {
    // value is one object from your array
    // let thisWork = workJSON.works[i];
      let thisLetter = value;

      // let thisLetter = letterJSON.letters[i];

      let placename = ""
      if(thisLetter.place_text) {
        placename = placenames.find(place => thisLetter.place_text.indexOf(place.place_raw) > -1);
      }

      let newLetter = await prisma.letter.create({
        data : {
          title : thisLetter.title,
          alt_title : thisLetter.alt_title,
          text : thisLetter.text,
          volume : thisLetter.volume.toString(),
          reference : thisLetter.reference,
          author : thisLetter.author ? thisLetter.author : null,
          recipient : thisLetter.recipient ? thisLetter.recipient : null,
          origin : thisLetter.origin ? thisLetter.origin : placename ? placename.normalized_name : null,
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
                  publication : source.publication,
                  author : source.author,
                  title : source.title,
                  url : source.url
                }
              })
            }
          },
          metadata : {
            create : {
              summary : thisLetter.metadata.summary,
              keywords : thisLetter.metadata.keywords,
              themes : thisLetter.metadata.themes
            }
          }
        },
        select : {
          id : true,
          metadata : true
        }
      });

      if(thisLetter.origin_geo) {
        const geometry = { type : "Point", coordinates : thisLetter.origin_geo }
        await prisma.$executeRawUnsafe(`
          UPDATE "Letter"
          SET origin_geo = ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'))
          WHERE id = ${newLetter.id};
        `)
      } else if(placename) {
        const geometry = { type : "Point", coordinates : [parseFloat(placename.lng), parseFloat(placename.lat)] }
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

      const semanticVector = `[${thisLetter.metadata.vector_small.join(', ')}]`;
      await prisma.$executeRawUnsafe(`
        UPDATE "Metadata"
        SET vector_small = '${semanticVector}'::vector
        WHERE id = ${newLetter.metadata.id};
      `)

      console.log(`created letter id: ${newLetter.id}`)

    }

  // }
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
