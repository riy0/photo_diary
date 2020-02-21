import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './LogEntryForm';

const App = () => {
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [logEntries, setLogEntries] = useState([]); 
  const [showPopup, setShowPopup] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.5,
    zoom: 0
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ latitude, longitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/riy0/ck6vgws4m0jhc1iqnuono8w9n"
      mapboxApiAccessToken={process.env.CLIENT_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <>
            <Marker
            key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
            >
              <div
                onClick = {() => setShowPopup({
                  [entry._id]:true,
                })}
              >
                <img 
                  className="marker" 
                  src="https://i.imgur.com/y0G5YTX.png"
                  alt="marker"
                />
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({
                    showPopup,
                    [entry._id]: false,
                  })}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>{new Date(entry.vistDate).toLocaleDateString}</small>
                  </div>
                </Popup>
              ) : null
            }
          </>
        ))
      }
      {
        addEntryLocation ? (
          <>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
            <div>
              <img 
                className="marker" 
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
              />
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className="popup">
              <LogEntryForm />
            </div>
          </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;
