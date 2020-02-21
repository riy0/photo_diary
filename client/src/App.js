import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.5,
    zoom: 0
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/riy0/ck6vgws4m0jhc1iqnuono8w9n"
      mapboxApiAccessToken={process.env.CLIENT_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    />
  );
}

export default App;
