import { useState, useEffect, useMemo } from 'react';
import { getExtendedBy } from '../../services/WeatherService';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import BigIconRegistry from '../../assets/BigIconRegistry';
import { getDayWithDate } from '../../utils/TimeUtils';
import DoubleRegistry from '../../assets/DoubleRegistry';
import { ThermometerHalf } from 'react-bootstrap-icons';

export default function Extended(data) {
    const [weather, setWeather] = useState(null);
    const [forecasts, setForecasts] = useState(null);

    useEffect(() => {
        getExtendedBy(data.latitude, data.longitude).then(response => {
            setWeather(response.data);
        }).catch(() => {
        });
    }, [data]);

    useEffect(() => {
        if (weather != null) {
            let mappedForecasts = [];
            for (let i = 0; i < weather.list.length; i += 8) {
                const group = weather.list.slice(i, i + 8);
                const temperatures = group.map(forecast => forecast.main.temp);

                mappedForecasts.push({
                    minimum: Math.min(...temperatures).toFixed(0),
                    maximum: Math.max(...temperatures).toFixed(0),
                    date: group[0].dt,
                    icon: Math.max(...group.map(forecast => forecast.weather[0].icon.substring(0, 2))).toString().padStart(2, '0') + 'd'
                });
            }

            setForecasts(mappedForecasts);
        }
    }, [weather])


    const memoizedWeather = useMemo(() => weather, [weather]);
    const memoizedForecasts = useMemo(() => forecasts, [forecasts]);

    return (
        <Container>
            <BigIconRegistry
                title={data.city ? data.city : (memoizedWeather?.city.name || '')}
                subtitle={'Pronóstico extendido'}>
            </BigIconRegistry>
            <Row className='p-2'>
                {
                    memoizedForecasts?.map((forecast => {
                        return (
                            <Col xs={12} md={6} lg={4} xl={3} className='p-2'>
                                <BigIconRegistry
                                    icon={forecast.icon}
                                    subtitle={getDayWithDate(forecast.date)} />
                                <DoubleRegistry
                                    values={[forecast.maximum + '°', forecast.minimum + '°']}
                                    labels={['Máxima', 'Mínima']}>
                                    <ThermometerHalf size={18} />
                                </DoubleRegistry>
                            </Col>
                        );
                    })) || <></>
                }
            </Row>
        </Container>
    );
}