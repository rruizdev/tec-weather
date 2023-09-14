import { useState, useEffect, useMemo } from 'react';
import { getExtendedBy } from '../../services/WeatherService';

function Extended(data) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        getExtendedBy(data.latitude, data.longitude).then(response => {
            setWeather(response.data);
        }).catch(() => {
        });
    }, [data]);
    
    const memoizedWeather = useMemo(() => weather, [weather]);

    return('<p>Extended forecast</p>');
}

export default Extended;