import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Login from "@/app/login/page";
import getService from "@/actions/getService";
import Manage from "./Manage";
import Deliver from "./Driver";

const Requests = async () => {
        const services = await getService();
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return <Login />;
        }

        return (
            <>
                <Container>
                    <Row>
                        {currentUser.role === 'USER' ? (
                            <Col xs={12}>
                                <Manage services={services} drivers={currentUser.id} />
                            </Col>
                        ) : null}

                        {currentUser.role === 'DRIVER' ? (
                            <Col xs={12}>
                                <Deliver services={services} drivers={currentUser.id} />
                            </Col>
                        ) : null}
                    </Row>
                </Container>
            </>
        );
}

export default Requests;
