import { useMemo } from "react";
import Today from "../today/Today";
import { Tab } from "react-bootstrap";
import Extended from "../extended/Extended";

export default function LocationTab(data) {
    const TodayComponent = useMemo(() => <Today city={data.tab.city} latitude={data.tab.latitude} longitude={data.tab.longitude} />, []);
    const ExtendedComponent = useMemo(() => <Extended city={data.tab.city} latitude={data.tab.latitude} longitude={data.tab.longitude} />, []);

    return (data.tab ?
        <Tab.Pane eventKey={data.i}>
            {TodayComponent}
            {ExtendedComponent}
        </Tab.Pane>
        : <></>);
}