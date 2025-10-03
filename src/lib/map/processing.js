import { greatCircle } from '@turf/turf';

export const correspondenceToPoints = (correspondence) => {
  const geojson = {
    type : "FeatureCollection",
    features : []
  }
  correspondence.forEach(thisCorrespondence => {
    // From point
    geojson.features.push({
      type : "Feature",
      id : thisCorrespondence.id,
      properties : {
        id : thisCorrespondence.id,
        reference : thisCorrespondence.reference,
        source : true,
        destination : false,
        from : thisCorrespondence.from.id,
        to : thisCorrespondence.to.id,
        location : thisCorrespondence.pointFrom.placename
      },
      geometry : {
        type : "Point",
        coordinates : thisCorrespondence.pointFrom.location
      }
    })
    // To point
    geojson.features.push({
      type : "Feature",
      id : thisCorrespondence.id,
      properties : {
        id : thisCorrespondence.id,
        reference : thisCorrespondence.reference,
        source : false,
        destination : true,
        from : thisCorrespondence.from.id,
        to : thisCorrespondence.to.id,
        location : thisCorrespondence.pointTo.placename
      },
      geometry : {
        type : "Point",
        coordinates : thisCorrespondence.pointTo.location
      }
    })
  })
  return geojson;
}

export const correspondenceToLines = (correspondence) => {
  const geojson = {
    type : "FeatureCollection",
    features : []
  }
  correspondence.forEach(thisCorrespondence => {
    const circleLine = greatCircle(thisCorrespondence.pointFrom.location, thisCorrespondence.pointTo.location, {
      properties : {
        id : thisCorrespondence.id,
        reference : thisCorrespondence.reference
      }
    })
    geojson.features.push(circleLine);
  });
  return geojson;
}

export const staysToPoints = (stays) => {
  const geojson = {
    type : "FeatureCollection",
    features : []
  }
  stays.forEach(thisStay => {
    // From point
    geojson.features.push({
      type : "Feature",
      id : thisStay.id,
      properties : {
        id : thisStay.id,
        summary : thisStay.reference,
        startYear : thisStay.startYear,
        startMonth : thisStay.startMonth,
        startDay : thisStay.startDay,
        endYear : thisStay.endYear,
        endMonth : thisStay.endMonth,
        endDay : thisStay.endDay,
        length : thisStay.endYear - thisStay.startYear,
        location : thisStay.point.placename
      },
      geometry : {
        type : "Point",
        coordinates : thisStay.point.location
      }
    })
  })
  return geojson;
}

export const publicationsToPoints = (publications) => {
  const geojson = {
    type : "FeatureCollection",
    features : []
  }
  publications.forEach(thisPublication => {
    // From point
    geojson.features.push({
      type : "Feature",
      id : thisPublication.id,
      properties : {
        id : thisPublication.id,
        titles : thisPublication.titles,
        description : thisPublication.description,
        year : thisPublication.year,
        month : thisPublication.month,
        day : thisPublication.day,
        isAbridged : thisPublication.isAbridged,
        isReprint : thisPublication.isReprint,
        isTranslation : thisPublication.isTranslation,
        translator : thisPublication.translator,
        location : thisPublication.point.placename
      },
      geometry : {
        type : "Point",
        coordinates : thisPublication.point.location
      }
    })
  })
  return geojson;
}