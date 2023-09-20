import { useState, useEffect, useMemo } from 'react';
import { getTodayBy } from '../../services/Weather';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { BrightnessAltHigh, BrightnessAltHighFill, EyeFill, Moisture, ThermometerHalf, Wind } from 'react-bootstrap-icons';
import SingleRegistry from '../../assets/SingleRegistry';
import DoubleRegistry from '../../assets/DoubleRegistry';
import BigIconRegistry from '../../assets/BigIconRegistry';
import { capitalize, getOrientation } from './TodayFunctions';
import moment from 'moment';

export default function Today(data) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (data?.latitude && data?.longitude) {
            getTodayBy(data.latitude, data.longitude).then(response => {
                setWeather(response.data);
            });
        }
    }, [data]);

    const memoizedWeather = useMemo(() => weather, [weather]);

    return (memoizedWeather != null ?
        <Container>
            <BigIconRegistry title={'Datos actuales'} />
            <Row className='p-2'>
                <Col className='conditions' xs={12} md={4}>
                    <BigIconRegistry
                        icon={memoizedWeather?.weather[0].icon || ''}
                        title={capitalize(memoizedWeather?.weather[0].description || '')}
                        subtitle={data.city?.length ? data.city : (memoizedWeather?.name || '')} />
                </Col>
                <Col className='conditions' xs={12} sm={6} md={4}>
                    <DoubleRegistry
                        values={[`${memoizedWeather?.main.temp.toFixed(1) || ''}°`, `${memoizedWeather?.main.feels_like.toFixed(1) || ''}°`]}
                        labels={['Temperatura', 'S. Térmica']}>
                        <ThermometerHalf size={18} />
                    </DoubleRegistry>
                    <SingleRegistry
                        value={memoizedWeather ? moment.unix(memoizedWeather.sys.sunrise).utcOffset(memoizedWeather.timezone / 3600).format('HH:mm') : ''}
                        label={'Salida del sol'}>
                        <BrightnessAltHighFill size={18} />
                    </SingleRegistry>
                    <SingleRegistry
                        value={memoizedWeather ? moment.unix(memoizedWeather.sys.sunset).utcOffset(memoizedWeather.timezone / 3600).format('HH:mm') : ''}
                        label={'Puesta del sol'}>
                        <BrightnessAltHigh size={18} />
                    </SingleRegistry>
                </Col>
                <Col className='conditions' xs={12} sm={6} md={4}>
                    <DoubleRegistry
                        values={[`${memoizedWeather?.main.humidity || ''}%`, `${memoizedWeather?.main.pressure || ''} hPa`]}
                        labels={['Humedad', 'Presión']}>
                        <Moisture size={18} />
                    </DoubleRegistry>
                    <SingleRegistry
                        value={`${memoizedWeather ? getOrientation(memoizedWeather.wind.deg) : ''} ${memoizedWeather ? (memoizedWeather.wind.speed * 3.6).toFixed(1) : ''} km/h`}
                        label={'Viento'}>
                        <Wind size={18} />
                    </SingleRegistry>
                    <SingleRegistry
                        value={`${memoizedWeather ? (memoizedWeather.visibility / 1000) : ''} km`}
                        label={'Visibilidad'}>
                        <EyeFill size={18} />
                    </SingleRegistry>
                </Col>
            </Row>
        </Container>
        : '');
}