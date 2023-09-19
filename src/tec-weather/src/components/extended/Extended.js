import { useState, useEffect, useMemo } from 'react';
import { getExtendedBy } from '../../services/WeatherService';
import Container from 'react-bootstrap/esm/Container';
import BigIconRegistry from '../../assets/BigIconRegistry';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import DoubleRegistry from '../../assets/DoubleRegistry';
import { ThermometerHalf } from 'react-bootstrap-icons';
import { parseForecasts } from './ExtendedFunctions';
import SingleRegistry from '../../assets/SingleRegistry';

export default function Extended(data) {
    const [weather, setWeather] = useState(null);
    const [forecasts, setForecasts] = useState(null);

    useEffect(() => {
        getExtendedBy(data.latitude, data.longitude).then(response => {
            setWeather(response.data);
        });
    }, [data]);

    const memoizedWeather = useMemo(() => weather, [weather]);

    useEffect(() => {
        if (memoizedWeather != null) {
            setForecasts(parseForecasts(memoizedWeather));
        }
    }, [memoizedWeather]);

    const memoizedForecasts = useMemo(() => forecasts, [forecasts]);

    return (
        <Container>
            <BigIconRegistry
                title={data.city?.length ? 'Pronóstico extendido' : (memoizedWeather?.city.name || '')}
                subtitle={data.city?.length ? '' : 'Pronóstico extendido'}>
            </BigIconRegistry>
            <Row className='p-2'>
                {
                    memoizedForecasts?.map((forecast => {
                        let forecastRegistry = <></>
                        if (forecast.maximum?.length && forecast?.minimum?.length) {
                            forecastRegistry =
                                <DoubleRegistry
                                    values={[`${forecast.maximum}º`, `${forecast.minimum}º`]}
                                    labels={['Máxima', 'Mínima']}>
                                    <ThermometerHalf size={18} />
                                </DoubleRegistry>;
                        } else if (forecast.maximum?.length) {
                            forecastRegistry =
                                <SingleRegistry
                                    value={`${forecast.maximum}º`}
                                    label={'Máxima'}>
                                    <ThermometerHalf size={18} />
                                </SingleRegistry>
                        } else {
                            forecastRegistry =
                                <SingleRegistry
                                    value={`${forecast.minimum}º`}
                                    label={'Mínima'}>
                                    <ThermometerHalf size={18} />
                                </SingleRegistry>
                        };

                        return (
                            <Col xs={12} md={6} lg={4} xl={3} className='p-2'>
                                <BigIconRegistry
                                    icon={forecast.icon}
                                    subtitle={forecast.date} />
                                {forecastRegistry}
                            </Col>
                        );
                    })) || <></>
                }
            </Row>
        </Container>
    );
}