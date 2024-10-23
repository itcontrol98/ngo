import { Container, Row,Col, Image } from "react-bootstrap";
import Form from "../components/Form";

const Service = () => {
    return ( 
        <Container>
            <Row className="my-4">
                <Col md={6}>
                <Image src="/logo.png" alt="logo" className="p-3" fluid/>
                </Col>
                <Col md={6}>
                <Form />
                </Col>
            </Row>
        </Container>
     );
}
 
export default Service;