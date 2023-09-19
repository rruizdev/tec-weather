import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from 'react';
import { getLocation } from "../../services/LocationService";
import Today from "../today/Today";
import Extended from "../extended/Extended";

function Location() {
    const query = new URLSearchParams(useLocation().search).get('name');

    const [location, setLocation] = useState(null);

    if (!query?.length) {
        window.location.href = '/home';
    }

    useEffect(() => {
        getLocation(query).then(response => {
            setLocation(response.data[0]);
        });
    }, [query]);

    const memoizedLocation = useMemo(() => location, [location]);

    return (
        <>
            <Today city={memoizedLocation?.name} latitude={memoizedLocation?.lat} longitude={memoizedLocation?.lon} />
            <Extended city={memoizedLocation?.name} latitude={memoizedLocation?.lat} longitude={memoizedLocation?.lon} />
        </>
    );
}

export default Location;