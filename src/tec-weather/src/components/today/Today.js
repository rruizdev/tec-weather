import { useState, useEffect, useMemo } from 'react';
import { getTodayBy, getOrientation } from '../../services/WeatherService';
import { capitalize } from '../../utilities/StringUtilities';
import { getTime } from '../../utilities/TimeUtilities';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { ArrowDownSquare, ArrowUpSquare, CloudSun, EyeFill, Moisture, ThermometerHalf, Wind } from 'react-bootstrap-icons';
import './Today.scss';

function Today() {
    const [coordinates, setCoordinates] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position => {
            setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }));
    }, []);

    useEffect(() => {
        if (coordinates != null) {
            getTodayBy(coordinates.latitude, coordinates.longitude).then(response => {
                setWeather(response.data);
            }).catch();
        }
    }, [coordinates]);

    const memoizedWeather = useMemo(() => weather, [weather]);

    return (
        <Container>
            <Row className='p-2'></Row>
            <Row>
                <Col className='conditions' xs={12} md={4}>
                    <div className='p-2'>
                        <CloudSun size={72} />
                    </div>
                    <div className='p-2'>
                        <p className='description'>{capitalize(memoizedWeather?.weather[0].description || '')}</p>
                        <p>{memoizedWeather?.name || ''}</p>
                    </div>
                </Col>
                <Col className='conditions' xs={6} md={4}>
                    <div className='p-2'>
                        <div className='icon'>
                            <ThermometerHalf size={32} />
                        </div>
                        <div className='numbers'>
                            <p className='featured'>
                                <span>{memoizedWeather?.main.temp.toFixed(1) || ''}º</span>
                                <span className='label'>Temperatura</span>
                            </p>
                            <p className='common'>
                                <span>{memoizedWeather?.main.feels_like.toFixed(1) || ''}º</span>
                                <span className='label'>S. Térmica</span>
                            </p>
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className='icon'>
                            <ArrowUpSquare size={18} />
                        </div>
                        <div className='numbers'>
                            <p className='common'>
                                <span>{memoizedWeather ? getTime(memoizedWeather.sys.sunrise) : ''}</span>
                                <span className='label'>Salida del sol</span>
                            </p>
                        </div>
                        <div className='icon'>
                            <ArrowDownSquare size={18} />
                        </div>
                        <div className='numbers'>
                            <p className='common'>
                                <span>{memoizedWeather ? getTime(memoizedWeather.sys.sunset) : ''}</span>
                                <span className='label'>Puesta del sol</span>
                            </p>
                        </div>
                    </div>
                </Col>
                <Col className='conditions' xs={6} md={4}>
                    <div className='p-2'>
                        <div className='icon head'>
                            <Moisture size={18} />
                        </div>
                        <div className='numbers'>
                            <p className='featured'>
                                <span>{memoizedWeather?.main.humidity || ''}%</span>
                                <span className='label'>Humedad</span>
                            </p>
                            <p className='common'>
                                <span>{memoizedWeather?.main.pressure || ''} hPa</span>
                                <span className='label'>Presión</span>
                            </p>
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className='icon'>
                            <Wind size={18} />
                        </div>
                        <div className='numbers'>
                            <p className='common'>
                                <span>{memoizedWeather ? getOrientation(memoizedWeather.wind.deg) : ''} {memoizedWeather ? (memoizedWeather.wind.speed * 3.6).toFixed(1) : ''} km/h</span>
                                <span className='label'>Viento</span>
                            </p>
                        </div>
                        <div className='icon'>
                            <EyeFill size={18} />
                        </div>
                        <div className='numbers'>
                            <p className='common'>
                                <span>{memoizedWeather ? (memoizedWeather.visibility / 1000) : ''} km.</span>
                                <span className='label'>Visibilidad</span>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Today;