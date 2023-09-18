import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
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
        }).catch(() => {

        });
    }, [location, query]);

    return (
        <>
            <Today city={location?.name} latitude={location?.lat} longitude={location?.lon} />
            <Extended city={location?.name} latitude={location?.lat} longitude={location?.lon} />
        </>
    );
}

export default Location;