import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from 'react';

function Location() {
    const query = new URLSearchParams(useLocation().search).get('name');
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);


    if (query?.length) {
        // Reutilize current and extended conditions
    } else {
        window.location.href = '/home';
    }
        
    return('<p>Forecast for ' + query + '</p>'); 
}

export default Location;