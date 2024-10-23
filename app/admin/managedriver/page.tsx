import { Container, Row, Col } from "react-bootstrap";
import getDriver from "@/actions/getDriver";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Login from "@/app/login/page";
import ShowDriver from "./ShowDriver";


const ManageDriver = async() => {
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
            <ShowDriver drivers={drivers} />
            </Col>
        </Row>
       </Container>
    </div> );
}
 
export default ManageDriver;