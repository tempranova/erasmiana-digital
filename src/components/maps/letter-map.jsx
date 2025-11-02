'use client';

import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import bbox from '@turf/bbox';
import 'maplibre-gl/dist/maplibre-gl.css';

import { darkMatterStyle } from '@/lib/map/constants';

export default function MapContainer({ letter_points }) {

  const [map, setMap] = useState(false);

  useEffect(() => {
    const newMap = new maplibregl.Map({
      container: 'erasmus-map', // container id
      style: darkMatterStyle,
      center: [4.4777, 51.9244], // starting position [lng, lat]
      zoom: 6 // starting zoom
    });

    newMap.on('load', () => {
      setMap(newMap);
    })
  }, [])

  useEffect(() => {
    if(map && letter_points) {
      const letter_points_geojson = { type : "FeatureCollection", features : letter_points.map(letter_point => {
        return {
          type : "Feature",
          properties : {
            placename : letter_point.placename,
            letter_count : parseInt(letter_point.count)
          },
          geometry : JSON.parse(letter_point.geometry)
        }
      })}

      if(!map.getSource('correspondence-points')) {

        const counts = letter_points_geojson.features.map(f => f.properties.letter_count);
        const minLetterCount = Math.min(...counts);
        const maxLetterCount = Math.max(...counts);

        map.addSource('correspondence-points', {
          type : "geojson",
          data  : letter_points_geojson
        })
        map.addLayer({
          id : "correspondence-points",
          source : "correspondence-points",
          type : "circle",
          paint : {
            'circle-color' : 'black',
            'circle-radius' : [
              'interpolate',
              ['linear'],
              ['get', 'letter_count'],
              minLetterCount, 5,
              maxLetterCount, 25
            ]
          }
        })

        map.fitBounds(bbox(letter_points_geojson), { padding : 100, duration : 0 })

      } else {
        map.getSource('correspondence-points').setData(letter_points_geojson)
      }
    }

  }, [map, letter_points])

  return (
    <div 
      id="erasmus-map"
      className="w-full h-[50vh]" 
    />
  )
}
