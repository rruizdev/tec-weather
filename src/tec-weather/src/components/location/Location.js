import React from "react";
import { useLocation } from "react-router-dom";

function Location() {
    function useQuery() {
        const { search } = useLocation();      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let name = useQuery().get("name");

    if (!name || !name.length) {
        window.location.href = '/home';
    }
        
    return('<p>Forecast for ' + name + '</p>'); 
}

export default Location;