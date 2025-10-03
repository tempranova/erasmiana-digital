'use client';

import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { darkMatterStyle } from '@/lib/map/constants';
import { correspondenceToPoints, staysToPoints, correspondenceToLines, publicationsToPoints } from '@/lib/map/processing';

export default function MapContainer({ correspondence, stays, publications }) {

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
    if(map && correspondence) {
      if(!map.getSource('correspondence-points')) {

        /* 
          Ideas 
          - Make circles larger the more letters are related to them there
          - A kind of graph of recieved/sent (pie chart on each location with appropriate size)
          - Along with time slider, the letters shoot out in a slow animation on the line (NOT accurate, they aren't flying...)
          - Could be too much data -- instead, just a little letter icon in the "To" destination on any given date with a number
        */

        const correspondenceLines = correspondenceToLines(correspondence);
        map.addSource('correspondence-line', {
          type : "geojson",
          data  : correspondenceLines
        })
        map.addLayer({
          id : "correspondence-line",
          source : "correspondence-line",
          type : "line",
          paint : {
            'line-color' : "black",
            'line-dasharray' : [3, 3],
            'line-gap-width' : 0
          }
        })

        const correspondencePoints = correspondenceToPoints(correspondence);
        map.addSource('correspondence-points', {
          type : "geojson",
          data  : correspondencePoints
        })
        map.addLayer({
          id : "correspondence-points",
          source : "correspondence-points",
          type : "circle",
          paint : {
            'circle-color' : [
              'case',
              ['==', ['get', 'source'], true], "red",
              ['==', ['get', 'source'], false], 'blue',
              'black'
            ]
          }
        })

      } else {
        const correspondencePoints = correspondenceToPoints(correspondence);
        console.log(correspondencePoints)
        // map.getSource('correspondence').setData()
      }
    }

    if(map && publications) {
      if(!map.getSource('publications-points')) {

        /* 
          Ideas 
          - Little book icons
          - Slightly different icon if a reprint
        */

        const publicationsPoints = publicationsToPoints(publications);
        map.addSource('publications-points', {
          type : "geojson",
          data  : publicationsPoints
        })
        map.addLayer({
          id : "publications-points",
          source : "publications-points",
          type : "circle",
          paint : {
            'circle-color' : 'white',
            'circle-radius' : 5,
            'circle-stroke-color' : 'black',
            'circle-stroke-width' : 2
          }
        })

      } else {
        const publicationsPoints = publicationsToPoints(publications);
        console.log(publicationsPoints)
        // map.getSource('correspondence').setData()
      }
    }

    if(map && stays) {
      if(!map.getSource('stay-points')) {

        /* 
          Ideas 
          - Size is correpondent to longer stays
          - Little label underneath with name of the place

        */

        const stayPoints = staysToPoints(stays);
        map.addSource('stay-points', {
          type : "geojson",
          data  : stayPoints
        })
        map.addLayer({
          id : "stay-points",
          source : "stay-points",
          type : "circle",
          paint : {
            'circle-color' : 'black',
            'circle-radius' : ['get', 'length']
          }
        })

      } else {
        const staysPoints = staysToPoints(correspondence);
        // console.log(correspondencePoints)
        // map.getSource('correspondence').setData()
      }
    }
  }, [map, correspondence, stays, publications])

  return (
    <div 
      id="erasmus-map"
      className="w-full flex-1" 
    />
  )
}
