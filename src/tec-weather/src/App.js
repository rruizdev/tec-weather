import { Route, Routes, Navigate } from 'react-router-dom';
import Today from './components/today/Today';
import Extended from './components/extended/Extended';
import Location from './components/location/Location';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route>
          <Route path="/today" element={ <Today /> } />
          <Route path="extended" element={ <Extended /> } />
          <Route path="location" element={ <Location /> } />
          <Route path='*' element={ <Navigate to="/today" /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
