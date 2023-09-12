import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Today from './components/today/Today';
import Extended from './components/extended/Extended';
import Location from './components/location/Location';


function App() {
  const navigate = useNavigate();

  function getForecast(event) {  
    event.preventDefault();

    let location = event.target[0].value;
    if (location.length)
      navigate('/location?name=' + event.target[0].value);
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/home">Pronóstico</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Hoy</Nav.Link>
              <Nav.Link href="/extended">Extendido</Nav.Link>
              <Form className="d-flex" onSubmit={ getForecast }>
                <Form.Control type="search" placeholder="Localidad" className="me-2" aria-label="Localidad" />
                <Button variant="outline-success" type="submit">Buscar</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route>
          <Route path="/home" element={ <Today /> } />
          <Route path="extended" element={ <Extended /> } />
          <Route path="location" element={ <Location /> } />
          <Route path='*' element={ <Navigate to="/home" /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
