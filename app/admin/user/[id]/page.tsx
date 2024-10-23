"use client";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import Heading from "@/app/components/Heading";

const UserAdmin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorContact, setErrorContact] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorRole, setErrorRole] = useState(false);
  const [errorMembershipId, setErrorMembershipId] = useState(false);
  const params = useParams();

  //  Email Validate Start

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorEmail(!validateEmail(event.target.value));
  };

  //  Email Validate End

  // Contact Validate Start

  const validateContact = (number: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const handleContact = (event: any) => {
    const input = event.target.value;
    setContact(input);
    setErrorContact(!validateContact(input));
  };
  // Contact Validate End

  // Name Validate Start

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setErrorName(event.target.value.trim() === "");
  };

  // Name Validate End

  // Role Validate Start

  const handleRole = (event: any) => {
    setRole(event.target.value);
    setErrorRole(event.target.value.trim() === "");
  };

  // Role Validate End

  useEffect(() => {
    const pullData = async () => {
      try {
        const { data } = await axios.get(`/api/user/${params.id}`);
        setName(data.name);
        setEmail(data.email);
        setContact(data.contact);
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    pullData();
  }, [params.id]);
  // Data

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorName(name.trim() === "");
    setErrorRole(role.trim() === "");
    setErrorEmail(email.trim() === "");
    setErrorContact(contact.trim() === "");

    if (
      name.trim() === "" ||
      contact.trim() === "" ||
      role.trim() === "" ||
      email.trim() === ""
    ) {
      return toast.error("Missing Field is Required");
    }

    try {
      const response = await axios.put(`/api/user/${params.id}`, {
        name,
        email,
        contact,
        role,
      });
      if (response.status === 200) {
        toast.success("Data updated successfully");
        router.push("/admin/user");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (
          status === 400 ||
          status === 404 ||
          status === 409 ||
          status === 410
        ) {
          const errorMessage = data.message || "An unexpected error occurred.";
          toast.error(errorMessage);
        } else {
          toast.error("Failed to update product");
        }
      } else {
        toast.error("Failed to update");
      }
    }
  };

  // END
  return (
    <div className="p-3">
    <Container>
      <Row>
        <Col md={12}>
        <div>
        <Heading title="Update User Details" center />
      </div>
        </Col>
      </Row>
      <Row className="p-3 rounded" style={{border:'1px solid black'}}>
        <Col md={6}>
          <TextField
            fullWidth
            value={name}
            onChange={handleName}
            label="Name"
            error={errorName}
            variant="outlined"
            type="text"
            autoComplete="off"
            className="p-1 my-4"
            required
          />
        </Col>
        <Col md={6}>
          <TextField
            fullWidth
            value={email}
            onChange={handleEmail}
            label="Email"
            error={errorEmail}
            helperText={errorEmail ? "Invalid email address" : ""}
            disabled
            variant="outlined"
            className="p-1 my-4"
            type="email"
            autoComplete="off"
            required
          />
        </Col>
        <Col md={6}>
          <TextField
            fullWidth
            value={contact}
            onChange={handleContact}
            error={errorContact}
            helperText={errorContact ? "Invalid contact number" : ""}
            label="Contact"
            variant="outlined"
            className="p-1 my-4"
            type="tel"
            autoComplete="off"
            required
          />
        </Col>
        <Col md={6}>
          <FormControl fullWidth className="m-1 my-4" error={errorRole}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
              Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              required
              onChange={handleRole}
            >
              <MenuItem value="USER" key="USER">
                USER
              </MenuItem>
              <MenuItem value="DRIVER" key="DRIVER">
                DRIVER
              </MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col md={12}>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="contained"
              color="inherit"
              className="mt-4"
              onClick={handleSubmit}
            >
              submit
            </Button>
          </div>
        </Col>
      </Row>
    </Container></div>
  );
};
export default UserAdmin;
