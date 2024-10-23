import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Login from "@/app/login/page";
import getService from "@/actions/getService";
import getDriver from "@/actions/getDriver";
import Manage from "./Manage";


const ManageService = async() => {
    const services = await getService();
    const drivers = await getDriver();
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return <Login />;
    }
    
    if (currentUser.role !== 'SUPERADMIN') {
        return <NullData title="Oops! Access Denied" />;
      }
    return ( <div>
       <Container>
        <Row>
            <Col xs={12}>
            <Manage services={services} drivers={drivers} />
            </Col>
        </Row>
       </Container>
    </div> );
}
 
export default ManageService;