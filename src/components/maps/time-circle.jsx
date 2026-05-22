'use client'
import { useState, useEffect, useRef } from 'react';

export default function TimeCircle() {

  const svgRef = useRef()
  const [ringRotation, setRingRotation] = useState(0)
  const [mouseDown, setMouseDown] = useState(false)

  const handleStartDrag = (e) => {
    console.log('hey')
    setMouseDown(true)
  }

  const handleDrag = (e) => {
    if(mouseDown) {
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      setRingRotation(Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI))
    }
  }

  const handleEndDrag = (e) => {
    setMouseDown(false)
  }

  const cx = 100, cy = 100;
  const r = 70;

  const startYear = 1500;
  const endYear = 1536;

  const years = [];
  for(let i=0; i < endYear - startYear; i++) {
    years.push(startYear + i);
  }
  const step = 360 / years.length;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      className="h-full aspect-square cardo-regular"
    >
      {/* Background ring */}
      <defs>
        <clipPath id="parchmentClip">
          <circle cx="100" cy="100" r="80" />
        </clipPath>
      </defs>

      <image
        href="/assets/bg-parchment-2.png"
        x="0"
        y="0"
        width="200"
        height="200"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#parchmentClip)"
        opacity="0.9"
      />

      <defs>
        {/* Path for text (midpoint between outer & inner circle) */}
        <path
          id="ringTextPath"
          d="
            M 100,100
            m -70,0
            a 70,70 0 1,1 140,0
            a 70,70 0 1,1 -140,0
          "
        />
      </defs>

      {/* Outer circle */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#444"
        strokeWidth="2"
      />

      {/* Inner circle */}
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="#444"
        strokeWidth="2"
      />

      {/* Curved text */}
      {/* <text
        transform="rotate(-108 100 100)"
        fill="#222"
        fontSize="10"
        letterSpacing="1.5"
      >
        <textPath href="#ringTextPath" startOffset="0%">1474</textPath>
        <textPath href="#ringTextPath" startOffset="10%">1475</textPath>
        <textPath href="#ringTextPath" startOffset="20%">1476</textPath>
        <textPath href="#ringTextPath" startOffset="30%">1477</textPath>
      </text> */}

       <g 
          transform={`rotate(${ringRotation} ${cx} ${cy})`} 
          onMouseDown={(e) => handleStartDrag(e)} 
          onMouseMove={(e) => handleDrag(e)} 
          onMouseUp={() => handleEndDrag()} >
          {years.map((y, i) => {
            const a = (i * step + 180) * (Math.PI / 180); // -90 puts first at top
            const x = cx + r * Math.cos(a);
            const yy = cy + r * Math.sin(a);

            // Pointing toward center (radial in), but still computed:
            const rot = (i * step); // degrees, matches ring rotation frame

            return (
              <text
                key={y}
                x={x}
                y={yy}
                fontSize="6"
                textAnchor="middle"
                className="select-none cursor-pointer"
                dominantBaseline="middle"
                transform={`rotate(${rot} ${x} ${yy})`}
              >
                {y}
              </text>
            );
          })}
        </g>
    
    </svg>
  );
}
