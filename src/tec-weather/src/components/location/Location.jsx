import { useState, useEffect } from 'react';
import { Button, CloseButton, Col, Container, FloatingLabel, Form, InputGroup, Nav, Row, Tab } from "react-bootstrap";
import { createNewTab, renderItem, renderTab } from './LocationFunctions';
import { getLocation } from '../../services/Location';

export default function Location() {
    const maximumTabs = 5;
    const [index, setIndex] = useState(0);
    const [tabs, setTabs] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [value, setValue] = useState('');

    const submitLocation = (event) => {
        event.preventDefault();
        setSearchValue(value);
        setValue('');
    }

    const changeValue = (e) => setValue(e.target.value);

    const deleteTab = (position) => setTabs(tabs?.filter((_tab, i) => position !== i));

    useEffect(() => {
        if (searchValue?.length) {
            getLocation(searchValue).then((response) => {
                const newTab = createNewTab(response.data[0]);
                if (!(tabs[tabs.length - 1] === newTab)) {
                    setTabs([...tabs, newTab]);
                }
            }).catch(() => {
                alert('No se encontró la ubicación solicitada');
            });
        }
    }, [searchValue])

    useEffect(() => setIndex(tabs.length - 1), [tabs]);

    return (
        <Container>
            <Row className={'p-3'}></Row>
            <Form
                className={'d-flex'}
                onSubmit={submitLocation}
                disabled={tabs?.length > maximumTabs}>
                <InputGroup className="mb-3">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Localidad">
                        <Form.Control
                            type="search"
                            placeholder="Localidad"
                            aria-label="Localidad"
                            disabled={tabs?.length >= maximumTabs} value={value} onChange={changeValue} />
                    </FloatingLabel>
                    <Button
                        variant="outline-secondary"
                        type="submit"
                        disabled={tabs?.length >= maximumTabs}>Buscar</Button>
                </InputGroup>
            </Form>
            <Row className={'p-3'}></Row>
            <Tab.Container>
                <Row>
                    <Col xs={12} sm={6} md={4} xl={3}>
                        <Nav
                            variant="pills"
                            className="flex-column"
                            activeKey={index} onSelect={i => setIndex(i)}>
                            {tabs.map((tab, i) => renderItem(tab, i, <CloseButton onClick={() => deleteTab(i)} />))}
                        </Nav>
                    </Col>
                    <Col xs={12} sm={6} md={8} xl={9}>
                        <Tab.Content>
                            {tabs.map(renderTab)}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );

};
