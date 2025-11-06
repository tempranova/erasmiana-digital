'use client';

import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import bbox from '@turf/bbox';
import 'maplibre-gl/dist/maplibre-gl.css';

import { formatDate } from '@/lib/utils/dates';

export default function MapContainer({ letters }) {

  const [map, setMap] = useState(false);
  const [popup, setPopup] = useState(false)
  const [currentYear, setCurrentYear] = useState(false)
  const [currentVis, setCurrentVis] = useState('year');
  const [currentLetterSet, setCurrentLetterSet] = useState([])
  const [currentTableRefs, setCurrentTableRefs] = useState([])
  const [clickedLetterSetFeature, setClickedLetterSetFeature] = useState(false)
  const [clickedLetterSet, setClickedLetterSet] = useState(false)

  useEffect(() => {
    const newMap = new maplibregl.Map({
      container: 'erasmus-map', // container id
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [4.4777, 51.9244], // starting position [lng, lat]
      zoom: 6 // starting zoom
    });

    const newPopup = new maplibregl.Popup({ closeButton : false });
    setPopup(newPopup);

    newMap.on('load', () => {
      setMap(newMap);
      lettersByYearAndLocation();
    })
  }, [])

  const lettersByYearAndLocation = () => {
    const places = [];
    const letterGroup = [];
    letters.sort((a, b) => a.year > b.year ? 1 : -1);
    letters.forEach(letter => {
      if(letter.origin_geo) {
        const thisIndex = places.indexOf(`${letter.origin} - ${letter.year}`);
        if(thisIndex === -1) {
          places.push(`${letter.origin} - ${letter.year}`);
          letterGroup.push({
            groupId : `${letter.origin} - ${letter.year}`,
            year : letter.year,
            location : letter.origin_geo,
            totalLetters : 1,
            letters : [letter.id]
          })
        } else {
          letterGroup[thisIndex].letters.push(letter.id)
          letterGroup[thisIndex].totalLetters = letterGroup[thisIndex].totalLetters + 1;
        }
      }
    })
    letterGroup.sort((a, b) => a.year > b.year ? 1 : -1);
    setCurrentYear(letterGroup[0].year);
    setCurrentVis('year')
    setCurrentLetterSet(letterGroup);
    setCurrentTableRefs([{ label : "Origin", ref : 'groupId' }, { label : "Year", ref : 'year' }, { label : "Total", ref : 'totalLetters'} ]);
  }

  useEffect(() => {
    if(map && currentLetterSet.length > 0) {
      const letters_geojson = { 
        type : "FeatureCollection", 
        features : currentLetterSet.map(letterGroup => {
          return {
            type : "Feature",
            properties : {
              groupId : letterGroup.groupId,
              year : letterGroup.year,
              letter_count : letterGroup.letters.length
            },
            geometry : JSON.parse(letterGroup.location)
          }
        })
      }

      if(!map.getSource('letters-points')) {

        const counts = letters_geojson.features.map(f => f.properties.letter_count);
        const minLetterCount = Math.min(...counts);
        const maxLetterCount = Math.max(...counts);

        map.addSource('letters-points', {
          type : "geojson",
          data  : letters_geojson
        })
        map.addLayer({
          id : "letters-points",
          source : "letters-points",
          type : "circle",
          paint : {
            'circle-color' : 'black',
            'circle-opacity' : 0.5,
            'circle-stroke-color' : '#FFF',
            'circle-radius' : [
              'case',
              ['==', ['get', 'year'], currentYear], 
              5,
              0
            ],
            'circle-stroke-width' : [
              'case',
              ['==', ['get', 'year'], currentYear], 
              2,
              0
            ]
          }
        })

        map.on('mousemove', 'letters-points', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers : ['letters-points']});
          if(features.length > 0) {
            let html = "";
            for(let prop in features[0].properties) {
              html += `<div>${features[0].properties[prop]}</div>`;
            }
            popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
          }
        })

        map.on('mouseleave', 'letters-points', (e) => {
          popup.remove();
        })

        map.on('click', 'letters-points', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers : ['letters-points']});
          if(features.length > 0) {
            setClickedLetterSetFeature(features[0])
          }
        })

        map.fitBounds(bbox(letters_geojson), { padding : 100, duration : 0 })
      } else {
        map.getSource('letters-points').setData(letters_geojson)
      }
    }

  }, [map, currentLetterSet])

  useEffect(() => {
    if(clickedLetterSetFeature) {
      const thisLetterSet = currentLetterSet.find(letterSet => letterSet.groupId === clickedLetterSetFeature.properties.groupId);
      setClickedLetterSet(thisLetterSet)
    }
  }, [clickedLetterSetFeature])

  useEffect(() => {
    if(currentYear && map) {
      if(map.getLayer('letters-points')) {
        map.setPaintProperty('letters-points', 'circle-radius', [
          'case',
          ['==', ['get', 'year'], currentYear], 
          5,
          0
        ])
        map.setPaintProperty('letters-points', 'circle-stroke-width', [
          'case',
          ['==', ['get', 'year'], currentYear], 
          2,
          0
        ])
      }
    }
  }, [currentYear])

  return (
    <div>
      <div className="flex gap-4">
        <div onClick={() => lettersByYearAndLocation()} className={`${currentVis === 'year' ? 'bg-gray-300' : ''} px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-300`}>By Year</div>
      </div>
      <div>
        {currentLetterSet && currentLetterSet.length > 0 ? 
          <div>
            <div>Current Year : {currentYear}</div>
            <input type="range" id="volume" onChange={(e) => setCurrentYear(parseInt(e.target.value))} value={currentYear} min={currentLetterSet[0].year} max={currentLetterSet[currentLetterSet.length - 1].year} />
            <div>{currentLetterSet[0].year} - {currentLetterSet[currentLetterSet.length - 1].year}</div>
          </div>
        : false}
      </div>
      <div className="relative">
        <div 
          id="erasmus-map"
          className="mt-4 w-full h-[70vh]" 
        />
        {clickedLetterSet ? 
          <div className="absolute bottom-0 left-0 p-4 bg-white max-w-[350px] max-h-[300px] m-4 shadow-md overflow-y-auto">
            {clickedLetterSet.letters.map((letterId, i) => {
              const thisLetter = letters.find(letter => letter.id === letterId)
              return (
                <div key={`letter-${i}`} className="mb-2.5 capitalize">
                  <a href={`/letters/${thisLetter.id}`} target="_blank" className="hover:opacity-70">
                    <div className="text-black">{thisLetter.alt_title.toLowerCase()}</div>
                  </a>
                  <div className="text-gray-500">{formatDate(thisLetter.day, thisLetter.month, thisLetter.year)}</div>
                </div>
              )
            })}
          </div>
        : false}
      </div>
      <div className="mt-8 cardo-regular text-left">
        <table>
          {currentLetterSet.length > 0 ? 
            <>
              <thead>
                <tr>
                  {currentTableRefs.map((tableRef, i) => {
                    return (
                      <th key={`header-${i}`} className="px-2 py-1 capitalize">{tableRef.label}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {currentLetterSet.sort((a, b) => a.year > b.year ? 1 : -1).map((letters, i) => {
                  return (
                    <tr key={`row-${i}`}>
                      {currentTableRefs.map((tableRef, ii) => {
                        return (
                          <td key={`${i}-cell-${ii}`} className="px-2 py-1 capitalize">{letters[tableRef.ref]}</td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </>
          : false}
        </table>
      </div>
    </div>
  )
}
