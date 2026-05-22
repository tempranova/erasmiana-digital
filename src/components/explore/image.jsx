'use client';
import { usePathname, useRouter } from 'next/navigation'

export default function Image({ params }) {

  const router = useRouter()

  return (
    <div className="m-auto">
      <div className="w-6/7 m-auto mt-10 relative">
        <div class="container">
          <svg viewBox="0 0 2062 1302" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="fuzzyEdgeFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
              <linearGradient id="textGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="transparent" />
                <stop offset="100%" stop-color="rgba(0,0,0,0.6)" stop-opacity="0.6" />
              </linearGradient>
            </defs>

            <image href="/assets/text-entry-pages.png" width="100%" height="100%" />


            <g class="map-area" onClick={() => router.push('/life')}>
              <rect x="0" y="220" width="695" height="990" class="-rotate-12 mix-blend-multiply fill-black/20 hover:fill-black/5 cursor-pointer duration-500" />
            </g>
            <g class="letter-area" onClick={() => router.push('/debate')}>
              <path
                d="M735,60, L967,1010 L745,1060 L745,1120 L1420,1110 L1415,60 Z"
                class="rotate-2 mix-blend-multiply fill-black/20 hover:fill-black/5 cursor-pointer duration-500"
              />
            </g>
            <g class="books-area" onClick={() => router.push('/learn')}>
              <path
                d="M1415,200, L1420,1110 L820,1120 L820,1215 L2070,1085 L1980,190 Z"
                class="rotate-2 mix-blend-multiply fill-black/20 hover:fill-black/5 cursor-pointer duration-500"
              />
            </g>

            <g class="map-section pointer-events-none">
              <rect x="80" y="450" width="500" height="220" class="-rotate-12"
                fill="url(#textGradient)"
                filter="url(#fuzzyEdgeFilter)"
              />
              <text x="330" y="600" text-anchor="middle" class="cardo-bold fill-white text-8xl uppercase text-shadow-lg -rotate-12">
                Life
              </text>
              <text x="330" y="650" text-anchor="middle" class="cardo-bold fill-white text-4xl text-shadow-lg -rotate-12">
                A map of Erasmus‘s travels
              </text>
            </g>

            <g class="letter-section pointer-events-none">
              <rect x="850" y="250" width="500" height="220" class="rotate-1"
                fill="url(#textGradient)"
                filter="url(#fuzzyEdgeFilter)"
              />
              <text x="1100" y="400" text-anchor="middle" class="cardo-bold fill-white text-6xl uppercase text-shadow-lg rotate-1">
                Debate
              </text>
              <text x="1100" y="450" text-anchor="middle" class="cardo-bold fill-white text-4xl text-shadow-lg rotate-1">
                Chat with ErasmusAI
              </text>
            </g>

            <g class="books-section pointer-events-none">
              <rect x="1380" y="900" width="500" height="220" class="-rotate-4"
                fill="url(#textGradient)"
                filter="url(#fuzzyEdgeFilter)"
              />
              <text x="1630" y="1050" text-anchor="middle" class="cardo-bold fill-white text-6xl uppercase text-shadow-lg -rotate-4">
                Links
              </text>
              <text x="1630" y="1100" text-anchor="middle" class="cardo-bold fill-white text-4xl text-shadow-lg -rotate-4">
                See more great sites
              </text>
            </g>
          </svg>
        </div>
      </div>
      <img src="/assets/text-entry-pages.png" className="w-full opacity-0" />
    </div>
  );
}
