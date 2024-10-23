"use client";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";
import { useState } from "react";
import DropdownMenu from "./Menu";
interface NavbarProps {
  id: string | null | undefined;
  email: string | null | undefined;
  name: string | null | undefined;
  role: string | null | undefined;
  drivers: any;
}

const NavbarData: React.FC<NavbarProps> = ({ id, email, name, role, drivers }) => {
  const [expanded, setExpanded] = useState(false);

  const filtered = drivers.filter((item: any) => item.userId === id);
  const closeNavbar = () => setExpanded(false);

  return (
    <div  id="navbar" className="bg-light">
    <Container>
      <Navbar
        expand="lg"
        className="sticky-top bg-light"
        expanded={expanded}
       
      >
        <Container>
          <Link href="/" passHref legacyBehavior>
            <a onClick={closeNavbar}>
              <Image
                src="/logo.png"
                className="m-0 p-2 responsive-logo"
                width={90}
                height={90}
                alt="logo"
              />
            </a>
          </Link>
          <Navbar.Toggle
            className="me-3 text-light"
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="text-dark fw-semibold d-flex align-items-center">
              {role === "SUPERADMIN" && (
                <Nav.Link href="/admin" onClick={closeNavbar} style={{ textDecoration: "none", fontSize: "15px" }}>
                  Admin
                </Nav.Link>
              )}
                <Nav.Link href="/service" onClick={closeNavbar} style={{ textDecoration: "none", fontSize: "15px" }}>
                  Service
                </Nav.Link>
              {role === "DRIVER" && filtered.length === 0 && (
                <Nav.Link href="/driver" onClick={closeNavbar} className="ms-2 ps-1" style={{ textDecoration: "none", fontSize: "15px" }}>
                 Add Driver
                </Nav.Link>
              )}
              <DropdownMenu name={name} email={email} closeNavbar={closeNavbar} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container></div>
  );
};

export default NavbarData;
