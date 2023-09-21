import { Nav } from "react-bootstrap";

export default function LocationItem(data) {
    return (data.tab ?
        <Nav.Item>
            <Nav.Link eventKey={data.i} align={'left'}>
                {data.children}
                {data.tab.city}
            </Nav.Link>
        </Nav.Item> : <></>
    );
}