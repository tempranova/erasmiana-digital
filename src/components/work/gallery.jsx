'use client';

import React, { useEffect, useState } from 'react';

export default function Gallery({ work }) {

  return (
    <div>
      <div className="p-8 grid grid-cols-3 gap-4">
        {work.pages.map((page, index) => {
          const url = `https://d1cmk1mkpb53mi.cloudfront.net/letters/volume-${work.volume}/page-${String(page).padStart(3, '0')}.jpg`
          return (
            <div key={`image-${index}`}>
              <a href={url} target="_blank">
                <img className="w-full" src={url} />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )

}