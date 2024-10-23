import {Col, Container, Row,Image } from "react-bootstrap";

const NotFound = () => {
    return ( 
        <Container>
  <Row>
    <Col md={12}>
    <Image src="/404.svg" alt="404 page_not_found" fluid/>
    </Col>
  </Row>
  </Container>

     );
}
export default NotFound;