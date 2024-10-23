import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const Footer = () => {
  return (
    <div className="p-4" id="Footer">
      <Container fluid>
        <Row>
          <Col md={4}>
            <div className="flex justify-center items-center flex-col">
              <Image
                src="/logo.png"
                alt="babba"
                className="me-5 my-1"
                width={130}
                height={100}
                objectFit="cover"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <div className="my-1 text-center fw-bold">© 2024 Test</div>
      </Container>
    </div>
  );
};

export default Footer;
