import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Today from './components/today/Today';
import Extended from './components/extended/Extended';
import Location from './components/location/Location';
import Header from './components/header/Header';
import Container from 'react-bootstrap/esm/Container';
import './App.scss'
import { Provider } from 'react-redux';
import store, { persistor } from './Stores/Store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }, () => {
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <div className='app'>
          <Container>
            <Routes>
              <Route>
                <Route path={'today'} element={<Today latitude={latitude} longitude={longitude} />} />
                <Route path={'extended'} element={<Extended latitude={latitude} longitude={longitude} />} />
                <Route path={'locations'} element={<Location />} />
                <Route path={'*'} element={<Navigate to={'/today'} />} />
              </Route>
            </Routes>
          </Container>
        </div>
      </PersistGate>
    </Provider>
  );
};
