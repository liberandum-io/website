'use client';

import { Map, Marker } from 'pigeon-maps';

export default function MapBox() {
  return (
    <Map
      height={300}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={11}
      boxClassname="block!"
    >
      <Marker width={50} anchor={[50.879, 4.6997]} color="#ec5078" />
    </Map>
  );
}
