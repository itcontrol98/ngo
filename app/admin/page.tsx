import { Col, Container, Row } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Login from "@/app/login/page";

const Admin = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <Login />;
}
if (currentUser.role !== 'SUPERADMIN') {
  return <NullData title="Oops! Access Denied" />;
}

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="flex gap-4 justify-between flex-wrap">
            <h1>ADMIN</h1>
          </div>
          </Col>
      </Row>
    </Container>
  );
};

export default Admin;
