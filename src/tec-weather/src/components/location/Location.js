import React from "react";
import { useLocation } from "react-router-dom";

function Location() {
    function useQuery() {
        const { search } = useLocation();      
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();

    return('<p>Forecast for ' + query.get("name") + '</p>');
}

export default Location;