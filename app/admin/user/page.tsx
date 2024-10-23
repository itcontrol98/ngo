import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import ShowAdmin from "./ShowAdmin";
import Login from "@/app/login/page";
import NullData from "@/app/components/NullData";
import getUsers from "@/actions/getUsers";

const AdminUser = async() => {
    const currentUser = await getCurrentUser();
    const users = await getUsers();
    if (!currentUser) {
        return <Login />;
    }
    
    if (currentUser.role !== 'SUPERADMIN') {
        return <NullData title="Oops! Access Denied" />;
    }
    return (<div>
        <Container>
            <Row>
                <Col md={12}>
                   <ShowAdmin users={users}/>
                </Col>
            </Row>
        </Container>
    </div>);
}

export default AdminUser;
