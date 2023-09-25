import { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = (event) => {
        event.preventDefault();
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <Navbar expand={'lg'} className={'bg-body-tertiary'}>
            <Container>
                <Navbar.Brand href={'/today'}>Pronóstico</Navbar.Brand>
                <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
                <Navbar.Collapse>
                    <Nav className={'me-auto'}>
                        <Nav.Link href={'/today'}>Hoy</Nav.Link>
                        <Nav.Link href={'/extended'}>Extendido</Nav.Link>
                        <Nav.Link href={'/locations'}>Localidades</Nav.Link>
                    </Nav>
                    <Nav className={'ms-auto'}>
                        <Nav.Link className='icon' href={''} onClick={toggleDarkMode}>
                            {darkMode ? <Sun /> : <Moon />}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}