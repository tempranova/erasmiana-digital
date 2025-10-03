import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  
  return NextResponse.json({ 
    publications : [{
      id : 1,
      titles : ["Adagia"],
      description : "A description of this book.",
      language : "Latin",
      year : 1500,
      month : false,
      day : false,
      isAbridged : false,
      isReprint : false,
      isTranslation : false,
      translator : null,
      point : {
        placename : "Paris",
        location : [2.349014, 48.864716]
      },
    },{ 
      id : 2,
      titles : ["Enchiridion militis Christiani"],
      description : "A description of this book.",
      language : "English",
      year : 1533,
      month : false,
      day : false,
      isAbridged : false,
      isReprint : false,
      isTranslation : true,
      translator : "William Tyndale",
      point : {
        placename : "London",
        location : [0.1276, 51.5072]
      },
    },{ 
      id : 3,
      titles : ["Stultitiae Laus", "Moriae Encomium"],
      description : "A description of this book.",
      language : "Latin",
      year : 1511,
      month : 6,
      day : false,
      isAbridged : false,
      isReprint : false,
      isTranslation : false,
      translator : null,
      point : {
        placename : "Paris",
        location : [2.349014, 48.864716]
      },
    }],
    correspondence : [{
      id : 4,
      from : {
        id: 10,
        name : "Gerard Bachuus"
      },
      to : {
        id: 11,
        name : "Desiderius Erasmus"
      },
      reference : 1287,
      year : 1522,
      month : 5,
      day : 27,
      pointFrom : {
        placename : "Bruges",
        location : [3.2247, 51.2094]
      },
      pointTo : {
        placename : "Basel",
        location : [7.588576, 47.559601]
      }
    },{
      id : 5,
      from : {
        id: 11,
        name : "Desiderius Erasmus"
      },
      to : {
        id: 12,
        name : "Joeroen van der Noot"
      },
      reference : 1300,
      year : 1522,
      month : 7,
      day : 14,
      pointFrom : {
        placename : "Basel",
        location : [7.588576, 47.559601]
      },
      pointTo : {
        placename : "Brussels",
        location : [4.3517, 50.8467]
      }
    },{
      id : 6,
      from : {
        id: 13,
        name : "Maternus Hatten"
      },
      to : {
        id: 11,
        name : "Desiderius Erasmus"
      },
      reference : 1289,
      year : 1522,
      month : 6,
      day : 4,
      pointFrom : {
        placename : "Speyer",
        location : [8.43111, 49.32083]
      },
      pointTo : {
        placename : "Basel",
        location : [7.588576, 47.559601]
      }
    }],
    stays : [{
      id : 7,
      point : {
        placename : "Woerden",
        location : [4.88333, 52.085]
      },
      summary : "His father became the vice-curate.",
      description : "A central description of the situation.",
      sources : [],
      media : [],
      isResidence : true,
      startYear : 1471,
      startMonth : false,
      startDay : false,
      endYear : 1476,
      endMonth : false,
      endDay : false
    },{
      id : 8,
      point : {
        placename : "Den Bosch",
        location : [5.303675, 51.697816]
      },
      summary : "For school",
      description : "Another description of the situation.",
      sources : [],
      media : [],
      isResidence : true,
      startYear : 1484,
      startMonth : false,
      startDay : false,
      endYear : 1487,
      endMonth : false,
      endDay : false
    },{
      id : 9,
      point : {
        placename : "Paris",
        location : [2.349014, 48.864716]
      },
      summary : "To study theology.",
      description : "Description of the situation.",
      sources : [],
      media : [],
      isResidence : true,
      startYear : 1495,
      startMonth : false,
      startDay : false,
      endYear : 1503,
      endMonth : false,
      endDay : false
    }]

  }, { status: 200 });

}