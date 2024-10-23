"use client";
import { Col, Container, Row } from "react-bootstrap";
import {
  Button,
  FormControl,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import DistrictState from "@/app/utils/state.json";

const AddressForm = ({ id, referral }: any) => {
  const [message, setMessage] = useState("");
  const [state, setState] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [postalCode, setPostalCode] = useState<Number>();
  const [district, setDistrict] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorDistrict, setErrorDistrict] = useState(false);
  const [errorLine1, setErrorLine1] = useState(false);
  const [errorPostalCode, setErrorPostalCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    setErrorMessage(event.target.value.trim() === "");
  };

  const handleState = (event: any) => {
    setState(event.target.value);
    setErrorState(event.target.value.trim() === "");
  };

  const handleDistrict = (event: any) => {
    setDistrict(event.target.value);
    setErrorDistrict(event.target.value.trim() === "");
  };
  const handleLine1 = (event: any) => {
    setLine1(event.target.value);
    setErrorLine1(event.target.value.trim() === "");
  };
  const handlePostalCode = (event: any) => {
    setPostalCode(Number(event.target.value));
  };
  const handleLine2 = (event: any) => {
    setLine2(event.target.value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(message.trim() === "");
    setErrorLine1(line1.trim() === "");
    setErrorState(state.trim() === "");
    setErrorDistrict(district.trim() === "");

    if (
      message.trim() === "" ||
      line1.trim() === "" ||
      state.trim() === "" ||
      district.trim() === ""
    ) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try{
    let response = await fetch("/api/service", {
      method: "POST",
      body: JSON.stringify({message, line1, line2, state,district,postalCode}),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      toast.success("Request Sent");
      router.push('/');
    } else if (response.status === 400 || response.status === 400 || response.status === 404 || response.status === 411|| response.status === 409 || response.status === 410){
      const errorMessage = responseData.message || "Please Login First.";
      toast.error(errorMessage);
      router.push('/login')
     }
      else {
        const errorMessage = responseData.message || "Please Login First.";
        toast.error(errorMessage);
        router.push('/login')
      }}
      catch (error) {
        console.error("Error:", error);
        toast.error("Please try again later.");
      }finally {
        setLoading(false);
      }
  };

  return (
    <div>
      <Container>
        <Row className="bg-body shadow rounded px-4 pt-4">
          <div
            className="fw-semibold  mb-3 text-center"
            style={{ fontSize: "17px" }}
          >
            Request Form
          </div>
          <Col md={6}>
            <TextField
              fullWidth
              value={line1}
              onChange={handleLine1}
              error={errorLine1}
              label="Line 1"
              multiline
              variant="outlined"
              className="m-1 my-3"
              type="text"
              autoComplete="off"
              required
            />
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              value={line2}
              onChange={handleLine2}
              label="Line 2 Optional"
              multiline
              variant="outlined"
              className="m-1 my-3"
              type="text"
              autoComplete="off"
            />
          </Col>
          <Col md={6}>
            <FormControl
              fullWidth
              className="m-1 my-3"
              required
              variant="outlined"
              error={errorState}
            >
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state-select"
                value={state}
                label="State"
                required
                onChange={handleState}
              >
                {DistrictState.map((item: any) => (
                  <MenuItem value={item.state} key={item.state}>
                    {item.state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Col>
          <Col md={6}>
            <FormControl
              fullWidth
              className="m-1 my-3"
              error={errorDistrict}
              disabled={!state}
              variant="outlined"
              required
            >
              <InputLabel id="district-label">District</InputLabel>
              <Select
                labelId="district-label"
                id="district-select"
                value={district}
                label="District"
                required
                onChange={handleDistrict}
              >
                {DistrictState.filter((item) => item.state === state).map(
                  (item) =>
                    item.districts.map((data) => (
                      <MenuItem value={data} key={data}>
                        {data}
                      </MenuItem>
                    ))
                )}
              </Select>
            </FormControl>
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              value={postalCode}
              onChange={handlePostalCode}
              error={errorPostalCode}
              label="Postal Code"
              multiline
              variant="outlined"
              className="m-1 my-3"
              type="text"
              autoComplete="off"
              required
            />
          </Col>

          <Col md={12}>
            <TextField
              fullWidth
              value={message}
              onChange={handleMessage}
              error={errorMessage}
              label="Message"
              multiline
              variant="outlined"
              className="m-1 my-3"
              type="text"
              autoComplete="off"
              rows={5}
              required
            />
          </Col>
          <Col md={12}>
            <div className="d-flex justify-content-center my-4 align-items-center">
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="inherit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "submit"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddressForm;
