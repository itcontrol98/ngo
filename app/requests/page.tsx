import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Login from "@/app/login/page";
import getService from "@/actions/getService";
import Manage from "./Manage";


const Requests = async() => {
    const services = await getService();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return <Login />;
    }
    return ( <div>
       <Container>
        <Row>
            <Col xs={12}>
            <Manage services={services} drivers={currentUser.id} />
            </Col>
        </Row>
       </Container>
    </div> );
}
 
export default Requests;