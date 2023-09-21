import { useState, useEffect, useMemo } from 'react';
import { CloseButton, Col, Container, FloatingLabel, Form, FormGroup, ListGroup, Nav, Row, Tab } from "react-bootstrap";
import { possibleTab, renderItem, renderTab } from './LocationFunctions';
import { getLocation } from '../../services/Location';

export default function Location() {
    const maximumTabs = 5, minimumCharacters = 3;
    const [index, setIndex] = useState(0);
    const [tabs, setTabs] = useState([]);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const submitForm = (event) => event.preventDefault();

    useEffect(() => {
        setTimeout(() => setSearchValue(value), 1800);
    }, [value]);

    useEffect(() => {
        if (searchValue?.length > minimumCharacters) {
            getLocation(searchValue).then((response) => {
                setResults(response.data.map(possibleTab));
            });
        } else setResults([]);
    }, [searchValue]);

    const submitLocation = (result) => {
        setTabs([...tabs, result]);
        setIndex(tabs.length - 1);
        setValue('');
    }

    const changeValue = (event) => setValue(event.target.value); 
    const deleteTab = (position) => setTabs(tabs?.filter((_tab, i) => position !== i));

    const memoizedResults = useMemo(() => results, [results]);
    const memoizedTabs = useMemo(() => tabs, [tabs]);

    return (
        <Container>
            <Row className={'p-3'}></Row>
            
            <FormGroup
                onSubmit={submitForm}
                disabled={tabs?.length > maximumTabs}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Localidad">
                    <Form.Control
                        type="search"
                        placeholder="Localidad"
                        disabled={tabs?.length >= maximumTabs}
                        onChange={changeValue}
                        value={value} />
                </FloatingLabel>

                <ListGroup>

{
    memoizedResults?.map((result, i) =>
        <ListGroup.Item
            eventKey={i}
            onClick={() => submitLocation(result)}>
            {result.city}
        </ListGroup.Item>
    )
}
</ListGroup>

            </FormGroup>

           
            <Row className={'p-3'}></Row>
            <Tab.Container>
                <Row>
                    <Col xs={12} sm={6} md={4} xl={3}>
                        <Nav
                            variant="pills"
                            className="flex-column"
                            activeKey={index} onSelect={i => setIndex(i)}>
                            {memoizedTabs?.map((tab, i) => renderItem(tab, i, <CloseButton onClick={() => deleteTab(i)} />))}
                        </Nav>
                    </Col>
                    <Col xs={12} sm={6} md={8} xl={9}>
                        <Tab.Content>
                            {memoizedTabs?.map(renderTab)}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );

};
