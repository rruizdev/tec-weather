import { Nav, Tab } from "react-bootstrap";
import Today from "../today/Today";
import Extended from "../extended/Extended";

export const createNewTab = (data) => ({
    city: `${data.name}${data.state ? `, ${data.state}` : ''}`,
    latitude: data.lat,
    longitude: data.lon
});

export const renderItem = (tab, i, children) => tab ?
    <Nav.Item>
        <Nav.Link eventKey={i} align={'left'}>
            {children}
            {tab.city}
        </Nav.Link>
    </Nav.Item> : <></>;

export const renderTab = (tab, i) => tab ?
    <Tab.Pane eventKey={i}>
        <Today city={tab.city} latitude={tab.latitude} longitude={tab.longitude} />
        <Extended city={tab.city} latitude={tab.latitude} longitude={tab.longitude} />
    </Tab.Pane>
    : <></>;