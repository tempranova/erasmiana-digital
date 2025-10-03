'use client';
import { useEffect, useState } from 'react';

import Map from '@/components/map/map';

export default function MapContainer() {

  const [correspondence, setCorrespondence] = useState(false)
  const [publications, setPublications] = useState(false)
  const [stays, setStays] = useState(false)

  useEffect(() => {
    fetch('/api/map').then(resp => resp.json()).then(response => {
      setCorrespondence(response.correspondence);
      setPublications(response.publications);
      setStays(response.stays);
    })
  }, [])

  return (
    <div className="w-full flex-1 flex flex-col">
      <Map correspondence={correspondence} publications={publications} stays={stays} />
    </div>
  )
}
