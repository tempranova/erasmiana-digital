# Erasmus Web Map

## DEv setup
- Run docker compose and npm install
- Migrate DB, prisma generate
- Run seed file (`npx prisma db seed`)

## Prod setup
- Supabase, install extensions PostGIS and Vector
- `npx prisma migrate deploy`
- `npx prisma db seed`

## To Do:
- Improving further the OCR, going through looking for issues
  - Sometimes random characters on lines
  - Translation cut off (letter 61) - means chunking, plus chunking the translation
  - In the Metadata, I could include a "from" and "to" field, it's not a bad idea


- Sorting letters by dates, people, etc
- Adding a direct match text search
- Creating comprehensive search page
- Adding disclaimer for errors, Greek, etc
- Searching also update query params for going back (save result IDs?)
- Building in a way to send/submit fixes is probably reasonably important
- review ChatGPT interface suggestoins, like the candle flare or slight gradient rubbing

- Improving mapping of who wrote TO him and FROM him

- Trying to figure out the Greek shit??
- Possibly parsing apart https://www.dbnl.org/tekst/eras001corr01_01/ to get Dutch translations to link in
- Index the vector fields
- Setting up static page generation

- Nicer background transition into pages

Considerations:
- URLs for pages, should they be the letter number instead? Is it reliable enough?
- Doing a second pass on letters to improve the Latin text...

### Data Visualization

- How to handle multiple points on the same location? (publication and stay)
- Maybe three big switches along the bottom
- What is MOST INTERESTING to people about Erasmus's life and influence? Have that be first and foremost.
- The interconnectivity seems very valuable
- Then something about how he moved around the world
- A visualization that shows the old map would be stunning

### Maps

- Kingdom Come
  - Totally illustrated map, with clouds on the outside that move around and scatter, a moving icon drifting over the landscape with a path behind it
  - Little scrolls indicating different towns or places
  - Paths illustrated, a bit Tolkien-esque drawing of landscape
- Witcher 3
  - Animated timeline map online; different animations directly on the map, snow falling or seasonality immersive
  - Perspective map skewed with mountains behind, a section of the world shown
  - Tolkien-esque again, more of an illustration than a map; forests, lakes, rivers, etc
  - A map with clouds on it, a compass rose, terrain-style detail (relief map)
  - Ability to have dotted polygons showing provinces or areas, outlined red cities
  - More almost of a satellite map impression
- Total War
  - Usually not a lot of color, color emerging according to ownership of land
  - Indicating major rivers and cities noted
  - Lots of icons with text beside them for principalities
  - Interact by hovering over sections
  - Rome Total War's general map of Europe with nature being first on there, is not a bad starting-point (https://static.wikia.nocookie.net/totalwar/images/3/35/TWRR_campaign_map.png/revision/latest/scale-to-width-down/1200?cb=20210430181842) too bulky/blocky but it's not awful
  - Really focused on dividing up land into sections (to be taken over, clicked, revealed, different colors according to relationships), banners representing armies
- Assassins' Creed
  - Absolutely littered with POIs which have big popups
  - Ohterwise really nicely ilustrated in a gothic kind of style, with straightforward pins on it
  - Almost the idea of switching between a high-level world map and individual city maps
  - Kind of a cool straightforward map: https://oyster.ignimgs.com/mediawiki/apis.ign.com/assassins-creed-vikings/f/f5/AllianceMapFull.jpg
  -

- Possibilities
  - Might be worth creating a kind of relief map with general sense of European geographic features in Northwestern Europe
  - The idea of a kind of goofy figure animating over the map with a dotted line, like a chess piece, is cool
  - Having some medieval type map but with Erasmus-like handwriting on top, DaVinci style drawings/compass rose things/architecture

## Concepts
- Landing and a bit of a fly-in, some kind of animation with Erasmus appearing and talking (you can skip), setting the stage
- In the background zooming or showing some visual paintings or sketches of places in his life, mountains of letters
- Then we land on some kind of circular timeline thing: maybe it's taking up the bottom 1/3rd of the screen, a half-circle, concentric circles you can grab and spin (centuries, years, seasons, scholastic or liturgical cycles)
- Would be cool to have a sort of satellite map drawing-style of Europe and specifically his area
- With some animations depending on the season as an immersive take on things
- Maybe the timeline comes out depending on if you ask it to come out
- A totally separate section for a more typical query-type of result for academics
- Quasi-3D to keep it as a more interesting map, but in the sorta style of the 1500s
- The actual information being shown (where he lived, what he did) depends on what the librarians recommend, but... a game-piece that's Erasmus, a pile of books that fly around for his publications (or books stacking up in different cities), piles of letters flying around and/or stacking up in different cities
  - You click on one for details about it in a modal, you can see the whole correspondence or go to the details page about that event/place/book/letter

## Questions for librarians
- What do people find most fascinating or interesting about Erasmus? General public vs academic inquiries? Yourself?
- What do people not know about Erasmus that's interesting?
- What are Erasmus's biggest impacts on European life and thought?
- What value do you think a timeline-style look at Erasmus's life might have?
- What kind of view of time did Erasmus or people in his era have? What cycles defined his life on a yearly or more-than-yearly basis?
  - Were there patterns of publication or letters at certain times of year, did he get sick regularly, was he at schools and seminaries, etc?
- How might Erasmus have divided up and looked at his own life? By place, by book, by particular concept, by outside historical events?
- What's most undervalued about Erasmus?
- How connected was he?
- When people ask "and why did Erasmus matter" what is a good answer?
- Any museums about Erasmus I can visit?
- Any DH sites or displays that you find particularly interesting?
- Who are the users? What's the point of this website? Where is it going to be used? How well are things already digitized?



NOTE ON DB STRUCTURE

- Entry is meant either for chunks of text -- like paragraphs within a larger work, parts of letters, generally not exceeding 500 words
  - OR for small independent pieces of work that are part of a larger work but well-defined -- like adages
- Summary and metadata are only really useful for letters -- for huge long works the chunks will do the lifting

- May add more in terms of published dates and so on
