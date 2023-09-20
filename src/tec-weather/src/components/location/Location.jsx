import { useState, useEffect } from 'react';
import { getLocation } from "../../services/Location";
import Today from "../today/Today";
import Extended from "../extended/Extended";
import { Alert, Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";

export default function Location() {
    const maximumTabs = 5;
    const [search, setSearch] = useState(null);
    const [index, setIndex] = useState(0);
    const [tabs, setTabs] = useState([]);
    
    const submitLocation = (event) => {
        event.preventDefault();
        setSearch(event.target[0].value);
    }

    useEffect(() => {
        if (search) {
            getLocation(search).then(response => {
                let city = `${response.data[0].name}${response.data[0].state ? `, ${response.data[0].state}` : ''}`;
                let newTab = {
                    city: city,
                    content:
                        <>
                            <Today city={city} latitude={response.data[0].lat} longitude={response.data[0].lon} />
                            <Extended city={city} latitude={response.data[0].lat} longitude={response.data[0].lon} />
                        </>
                };
                setTabs([...tabs, newTab]);
                setIndex(tabs.length);
            }).catch(() => {
                alert('No se encontró la ubicación solicitada');
            });
        }
    }, [search]);

    return (
        <>
            <Row className={'p-3'}></Row>
            <Form className="d-flex" onSubmit={submitLocation} disabled={tabs?.length > maximumTabs}>
                <Form.Control type="search" placeholder="Localidad" className="me-2" aria-label="Localidad" disabled={tabs.length >= maximumTabs} />
                <Button variant="outline-success" type="submit" disabled={tabs?.length >= maximumTabs}>Buscar</Button>
            </Form>
            <Row className={'p-2'}></Row>
            <Tab.Container>
                <Row>
                    <Col xs={12} sm={6} md={4} xl={3}>
                        <Nav variant="pills" className="flex-column" selectedIndex={index} onSelect={i => setIndex(i)}>
                            {
                                tabs.map((tab, i) => (
                                    <Nav.Item>
                                        <Nav.Link eventKey={i}>{tab.city}</Nav.Link>
                                    </Nav.Item>
                                ))
                            }
                        </Nav>
                    </Col>
                    <Col xs={12} sm={6} md={8} xl={9}>
                        <Tab.Content>
                            {
                                tabs.map((tab, i) => (
                                    <Tab.Pane eventKey={i}>{tab.content}</Tab.Pane>
                                ))
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );

};
