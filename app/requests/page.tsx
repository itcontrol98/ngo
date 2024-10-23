import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Login from "@/app/login/page";
import getService from "@/actions/getService";
import Manage from "./Manage";
import Deliver from "./Driver";

const Requests = async () => {
    try {
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

                        {(!services || services.length === 0) && (
                            <Col xs={12}>
                                <NullData title="No services available." />
                            </Col>
                        )}
                    </Row>
                </Container>
            </>
        );
    } catch (error) {
        console.error("Failed to fetch services or current user:", error);
        return <NullData title="An error occurred. Please try again later." />;
    }
}

export default Requests;
