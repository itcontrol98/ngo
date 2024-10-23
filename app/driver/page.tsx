import { getCurrentUser } from "@/actions/getCurrentUser";
import { Container, Row, Col } from "react-bootstrap";
import NullData from "@/app/components/NullData";
import ManageDriver from "./Manage";
import Login from "@/app/login/page";

const AddDriver = async() => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return <Login />;
    }
    
    if (currentUser.role !== 'DRIVER') {
        return <NullData title="Only for new driver" />;
      }
    return (<div>
        <Container>
            <Row>
                <Col>
                    <ManageDriver />
                </Col>
            </Row>
        </Container>
    </div>);
}

export default AddDriver;