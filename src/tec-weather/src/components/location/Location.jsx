import { useState, useEffect, useMemo, useRef } from 'react';
import { CloseButton, Col, Container, FloatingLabel, Form, FormGroup, ListGroup, Nav, Row, Spinner, Tab } from "react-bootstrap";
import { possibleTab, renderAutocomplete, renderItem, renderTab } from './LocationFunctions';
import { getLocation } from '../../services/Location';
import './Location.scss'
import { debounce } from 'lodash';

export default function Location() {
    const maximumTabs = 5, minimumCharacters = 4;
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('');

    const submitForm = (event) => event.preventDefault();

    const submitLocation = (result) => {
        setTabs([...tabs, result]);
    }

    const delayedQuery = useRef(debounce(q => {
        if (q?.length > minimumCharacters) {
            setIsLoading(true);
            getLocation(q).then((response) => {
                setResults(response.data.map(possibleTab));
                setIsLoading(false);
            });
        } else setResults([]);
    }, 1800)).current;

    const changeValue = (event) => {
        setValue(event.target.value);
        delayedQuery(event.target.value);
    }
    const deleteTab = (position) => setTabs(tabs?.filter((_tab, i) => position !== i));

    useEffect(() => {
        setValue('');
        setResults([]);
    }, [tabs]);

    const memoizedIndex = useMemo(() => index, [index]);
    const memoizedResults = useMemo(() => results, [results]);
    const memoizedTabs = useMemo(() => tabs, [tabs]);

    return (
        <Container>
            <Row className={'p-3'}></Row>
            <FormGroup
                onSubmit={submitForm}
                disabled={tabs?.length > maximumTabs}>
                <FloatingLabel
                    controlId={'floatingInput'}
                    label={'Localidad'}>
                    <Form.Control
                        type={'search'}
                        placeholder={'Localidad'}
                        disabled={tabs?.length >= maximumTabs}
                        onChange={changeValue}
                        value={value} />
                </FloatingLabel>
            </FormGroup>
            <ListGroup variant={'flush'}>
                <ListGroup.Item disabled hidden={!isLoading}>
                    <Spinner animation="grow" />
                    Cargando...
                </ListGroup.Item>
                {memoizedResults?.map((result, i) => renderAutocomplete(result, i, () => submitLocation(result)))}
            </ListGroup>
            <Row className={'p-3'}></Row>
            <Tab.Container>
                <Row>
                    <Col className={'p-3'} xs={12} lg={4}>
                        <Nav
                            variant={'pills'}
                            className={'flex-column'}
                            activeKey={memoizedIndex} onSelect={i => setIndex(i)}>
                            {memoizedTabs?.map((tab, i) => renderItem(tab, i, <CloseButton onClick={() => deleteTab(i)} />))}
                        </Nav>
                    </Col>
                    <Col className={'p-3'} xs={12} lg={8}>
                        {
                            memoizedTabs?.length ?
                                <Tab.Content>
                                    {memoizedTabs?.map(renderTab)}
                                </Tab.Content> : <></>
                        }
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );

};
