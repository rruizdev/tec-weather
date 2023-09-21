import { ListGroup } from "react-bootstrap";

export default function LocationAutoComplete(data) {
    return (
        data.result ?
            <ListGroup.Item
                eventKey={data.i}
                onClick={data.action}>
                {data.result.city}
            </ListGroup.Item>
            : <></>
    );
}