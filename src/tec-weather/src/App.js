import { Route, Routes, Navigate } from 'react-router-dom';
import Today from './components/today/Today';
import Extended from './components/extended/Extended';
import Location from './components/location/Location';
import Header from './components/header/Header';
import Container from 'react-bootstrap/esm/Container';

export default function App() {
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
