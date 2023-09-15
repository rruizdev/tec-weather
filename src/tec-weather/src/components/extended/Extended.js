import { useState, useEffect, useMemo } from 'react';
import { getExtendedBy } from '../../services/WeatherService';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import BigIconRegistry from '../shared/BigIconRegistry';
import { PinMap } from 'react-bootstrap-icons';

function Extended(data) {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        getExtendedBy(data.latitude, data.longitude).then(response => {
            setWeather(response.data);
        }).catch(() => {
        });
    }, [data]);

    useEffect(() => {
        if (weather != null) {
            let forecasts = [];
            for (let i = 0; i < weather.list.length; i += 8) {
                const group = weather.list.slice(i, i + 8);
                const temperatures = group.map(forecast => forecast.main.temp);

                forecasts.push({
                    minimum: Math.min(...temperatures).toFixed(0),
                    maximum: Math.max(...temperatures).toFixed(0),
                    date: group[0].dt,
                    icon: Math.max(...group.map(forecast => forecast.weather[0].icon.substring(0, 2))).toString().padStart(2, '0') + 'd'
                });
            }

            setForecast(forecasts);
        }
    }, [weather])


    const memoizedWeather = useMemo(() => weather, [weather]);
    const memoizedForecast = useMemo(() => forecast, [forecast]);

    return (
        <Container>
            <Row className='p-2'></Row>
            <BigIconRegistry
                title={memoizedWeather?.city.name || ''}
                subtitle={'Pronóstico extendido'}>
                <PinMap size={48} />
            </BigIconRegistry>
            <Row className='p-2'>

            </Row>
        </Container>
    );
}

export default Extended;