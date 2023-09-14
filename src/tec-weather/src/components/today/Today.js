import { useState, useEffect, useMemo } from 'react';
import { getTodayBy, getOrientation } from '../../services/WeatherService';
import { capitalize } from '../../utilities/StringUtilities';
import { getTime } from '../../utilities/TimeUtilities';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { ArrowDownSquare, ArrowUpSquare, CloudSun, EyeFill, Moisture, ThermometerHalf, Wind } from 'react-bootstrap-icons';
import './Today.scss';
import SingleRegistry from '../shared/SingleRegistry';
import DoubleRegistry from '../shared/DoubleRegistry';

function Today(data) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        getTodayBy(data.latitude, data.longitude).then(response => {
            setWeather(response.data);
        }).catch(() => {
        });
    }, [data]);

    const memoizedWeather = useMemo(() => weather, [weather]);

    return (memoizedWeather != null ?
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
                    <DoubleRegistry values={[(memoizedWeather?.main.temp.toFixed(1) || '') + '°', (memoizedWeather?.main.feels_like.toFixed(1) || '') + '°']} labels={['Temperatura', 'S. Térmica']}>
                        <ThermometerHalf size={32} />
                    </DoubleRegistry>
                    <SingleRegistry value={memoizedWeather ? getTime(memoizedWeather.sys.sunrise) : ''} label={'Salida del sol'}>
                        <ArrowUpSquare size={18} />
                    </SingleRegistry>
                    <SingleRegistry value={memoizedWeather ? getTime(memoizedWeather.sys.sunset) : ''} label={'Puesta del sol'}>
                        <ArrowDownSquare size={18} />
                    </SingleRegistry>
                </Col>
                <Col className='conditions' xs={6} md={4}>
                    <DoubleRegistry values={[(memoizedWeather?.main.humidity || '') + '%', (memoizedWeather?.main.pressure || '') + ' hPa']} labels={['Humedad', 'Presión']}>
                        <Moisture size={18} />
                    </DoubleRegistry>
                    <SingleRegistry value={(memoizedWeather ? getOrientation(memoizedWeather.wind.deg) : '') + ' ' + (memoizedWeather ? (memoizedWeather.wind.speed * 3.6).toFixed(1) : '') + ' km/h'} label={'Viento'}>
                        <Wind size={18} />
                    </SingleRegistry>
                    <SingleRegistry value={(memoizedWeather ? (memoizedWeather.visibility / 1000) : '') + ' km'} label={'Visibilidad'}>
                        <EyeFill size={18} />
                    </SingleRegistry>
                </Col>
            </Row>
        </Container>
        : '');
}

export default Today;