import { Col, Container, Row } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import Login from "@/app/login/page";
import Summary from "./Summary";
import getDriver from "@/actions/getDriver";
import getService from "@/actions/getService";
import getUsers from "@/actions/getUsers";

const Admin = async () => {
  const currentUser = await getCurrentUser();
  const driver = await getDriver();
  const services = await getService();
  const users = await getUsers();

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
           <Summary driver={driver} users={users} services={services} />
          </div>
          </Col>
      </Row>
    </Container>
  );
};

export default Admin;
