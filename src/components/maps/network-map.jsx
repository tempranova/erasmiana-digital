'use client';

import { useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import bbox from '@turf/bbox';
import greatCircle from "@turf/great-circle";
import RangeSlider from 'react-range-slider-input';
import 'maplibre-gl/dist/maplibre-gl.css';

import { formatDate } from '@/lib/utils/dates';

import 'react-range-slider-input/dist/style.css';

export default function MapContainer({ letters }) {

  const [map, setMap] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [popup, setPopup] = useState(false)
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(0);
  const [selectedMinYear, setSelectedMinYear] = useState(false);
  const [selectedMaxYear, setSelectedMaxYear] = useState(false);
  const [currentVis, setCurrentVis] = useState('network');
  const [currentLetterSet, setCurrentLetterSet] = useState([])
  const [currentTableRefs, setCurrentTableRefs] = useState([])
  const [clickedLetterSetFeature, setClickedLetterSetFeature] = useState(false)
  const [clickedLetterSet, setClickedLetterSet] = useState(false)

  useEffect(() => {
    const newMap = new maplibregl.Map({
      container: 'erasmus-map', // container id
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [4.4777, 51.9244], // starting position [lng, lat]
      zoom: 6, // starting zoom
      attributionControl : false
    });

    const newPopup = new maplibregl.Popup({ closeButton : false });
    setPopup(newPopup);

    newMap.on('load', () => {
      setMap(newMap);
    })
  }, [])

  useEffect(() => {
    if(map && selectedMaxYear && selectedMinYear && firstLoad) {
      groupLetters('from-origin');
      setFirstLoad(false)
    }
  }, [map, selectedMaxYear, selectedMinYear])

  useEffect(() => {
    if(letters.length > 0) {
      const min = Math.min(...letters.map(o => o.year));
      setMinYear(min)
      setSelectedMinYear(min)
      const max = Math.max(...letters.map(o => o.year));
      setMaxYear(max)
      setSelectedMaxYear(max)
    }
  }, [letters])

  const groupLetters = (viz) => {
    const places = [];
    const letterGroup = [];
    if(viz === 'from-origin') {
      letters.forEach(letter => {
        if(letter.origin_geo && letter.destination_geo) {
          if(letter.year >= selectedMinYear && letter.year <= selectedMaxYear) {
            if(letter.author && letter.author.indexOf("Erasmus") > -1) {
              const thisIndex = places.indexOf(`${letter.origin} - ${letter.destination}`);
              if(thisIndex === -1) {
                places.push(`${letter.origin} - ${letter.destination}`);
                letterGroup.push({
                  groupId : `${letter.origin} - ${letter.destination}`,
                  origin : letter.origin_geo,
                  destination : letter.destination_geo,
                  totalLetters : 1,
                  letters : [letter.id]
                })
              } else {
                letterGroup[thisIndex].letters.push(letter.id)
                letterGroup[thisIndex].totalLetters = letterGroup[thisIndex].totalLetters + 1;
              }
            }
          }
        }
      })
      setCurrentVis('from-origin')
      setCurrentLetterSet(letterGroup);
      setCurrentTableRefs([{ label : "Origin", ref : 'groupId' }, { label : "Total", ref : 'totalLetters'} ]);
    }
    if(viz === 'to-origin') {
      letters.forEach(letter => {
        if(letter.origin_geo && letter.destination_geo) {
          if(letter.year >= selectedMinYear && letter.year <= selectedMaxYear) {
            if(letter.recipient && letter.recipient.indexOf("Erasmus") > -1) {
              const thisIndex = places.indexOf(`${letter.origin} - ${letter.destination}`);
              if(thisIndex === -1) {
                places.push(`${letter.origin} - ${letter.destination}`);
                letterGroup.push({
                  groupId : `${letter.origin} - ${letter.destination}`,
                  origin : letter.origin_geo,
                  destination : letter.destination_geo,
                  totalLetters : 1,
                  letters : [letter.id]
                })
              } else {
                letterGroup[thisIndex].letters.push(letter.id)
                letterGroup[thisIndex].totalLetters = letterGroup[thisIndex].totalLetters + 1;
              }
            }
          }
        }
      })
      setCurrentVis('to-origin')
      setCurrentLetterSet(letterGroup);
      setCurrentTableRefs([{ label : "Origin", ref : 'groupId' }, { label : "Total", ref : 'totalLetters'} ]);
    }
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
              letter_count : letterGroup.letters.length
            },
            geometry : greatCircle(JSON.parse(letterGroup.origin), JSON.parse(letterGroup.destination)).geometry
          }
        })
      }

      if(!map.getSource('letters-lines')) {

        const counts = letters_geojson.features.map(f => f.properties.letter_count);
        const minLetterCount = Math.min(...counts);
        const maxLetterCount = Math.max(...counts);

        map.addSource('letters-lines', {
          type : "geojson",
          data  : letters_geojson
        })
        map.addLayer({
          id : "letters-lines",
          source : "letters-lines",
          type : "line",
          paint : {
            'line-color' : '#090',
            'line-opacity' : [
              'interpolate',
              ['linear'],
              ['get', 'letter_count'],
              minLetterCount, 0.2,
              maxLetterCount, 0.8
            ],
            'line-width' : [
              'interpolate',
              ['linear'],
              ['get', 'letter_count'],
              minLetterCount, 2,
              maxLetterCount, 5
            ]
          }
        })

        map.on('mousemove', 'letters-lines', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers : ['letters-lines']});
          if(features.length > 0) {
            let html = "";
            for(let prop in features[0].properties) {
              html += `<div>${features[0].properties[prop]}</div>`;
            }
            popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
          }
        })

        map.on('mouseleave', 'letters-lines', (e) => {
          popup.remove();
        })

        map.on('click', 'letters-lines', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers : ['letters-lines']});
          if(features.length > 0) {
            setClickedLetterSetFeature(features[0])
          }
        })

        map.fitBounds(bbox(letters_geojson), { padding : 100, duration : 0 })
      } else {
        map.getSource('letters-lines').setData(letters_geojson)
      }
    }

  }, [map, currentLetterSet])

  useEffect(() => {
    if(clickedLetterSetFeature) {
      const thisLetterSet = currentLetterSet.find(letterSet => letterSet.groupId === clickedLetterSetFeature.properties.groupId);
      setClickedLetterSet(thisLetterSet)
    }
  }, [clickedLetterSetFeature])

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 h-[60vh] cardo-regular">
        <div className="relative col-span-3">
          <div 
            id="erasmus-map"
            className="mt-4 w-full h-[60vh]" 
          />
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <RangeSlider onThumbDragEnd={() => groupLetters(currentVis)} min={minYear} max={maxYear} defaultValue={[minYear, maxYear]} value={[selectedMinYear, selectedMaxYear]} onInput={(e) => { setSelectedMinYear(e[0]); setSelectedMaxYear(e[1]); }} />
            </div>
            <div className="text-center text-xl">
              {selectedMinYear} - {selectedMaxYear}
            </div>
          </div>
          <table className="mt-4">
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
                  {currentLetterSet.sort((a, b) => a.totalLetters < b.totalLetters ? 1 : -1).map((letters, i) => {
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
        <div className="cardo-regular text-left text-sm">
          <div onClick={() => groupLetters('from-origin')} className={`${currentVis === 'from-origin' ? 'bg-gray-300' : ''} mb-2 px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-300`}>Letters from Erasmus</div>
          <div onClick={() => groupLetters('to-origin')} className={`${currentVis === 'to-origin' ? 'bg-gray-300' : ''} mb-2 px-4 py-2 border border-black rounded-md cursor-pointer hover:bg-gray-300`}>Letters to Erasmus</div>

          <hr className="my-4"></hr>
          {clickedLetterSet ? 
            <div className="grid grid-cols-1 gap-2">
              <h4 className="text-xl">{clickedLetterSetFeature.properties.groupId}</h4>
              {clickedLetterSet.letters.map((letterId, i) => {
                const thisLetter = letters.find(letter => letter.id === letterId)
                return (
                  <div key={`letter-${i}`} className="capitalize">
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
      </div>
    </div>
  )
}
