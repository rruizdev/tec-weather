import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Today from './components/today/Today';
import Extended from './components/extended/Extended';
import Location from './components/location/Location';
import Header from './components/header/Header';
import Container from 'react-bootstrap/esm/Container';
import { getBy } from './services/WeatherService';

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }));
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getBy(latitude, longitude).then(response => {
        setWeather(response.data);
      });
    }
  }, [latitude, longitude]);

  return (
    <>
      <Header/>
      <Container>
        <Routes>
          <Route>
            <Route path="/today" element={ <Today /> } />
            <Route path="extended" element={ <Extended /> } />
            <Route path="location" element={ <Location /> } />
            <Route path='*' element={ <Navigate to="/today" /> } />
          </Route>
        </Routes>
      </Container>
    </>
  );
};
