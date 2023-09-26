import { useEffect } from 'react';
import { Moon, Sun } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../reducers/ThemeReducer';

export default function Header() {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.darkMode);

    const handleToggle = () => {
        dispatch(toggleDarkMode());
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
                        <Nav.Link className='icon' href={''} onClick={handleToggle}>
                            {darkMode ? <Sun /> : <Moon />}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}