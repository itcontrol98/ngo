"use client";
import { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "@/app/components/Heading";

const ManageDriver = () => {
  const [vehicletype, setVehicletype] = useState("");
  const [vehiclenumber, setVehiclenumber] = useState("");
  const [status, setStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      let response = await fetch("/api/driver", {
        method: "POST",
        body: JSON.stringify({
          vehicletype,
          vehiclenumber,
          status,
        }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const responseData = await response.json();
      
      if (response.ok) {
        toast.success("Driver Added Successfully");
        router.push("/");
      } else if (response.status === 400) {
        const errorMessage = responseData.message || "Missing required fields.";
        toast.error(errorMessage);
      } else if (response.status === 401) {
        const errorMessage = responseData.message || "Unauthorized access.";
        toast.error(errorMessage);
      } else if (response.status === 403) {
        const errorMessage =
          responseData.message || "You are already Driver.";
        toast.error(errorMessage);
      } else if (response.status === 404) {
        const errorMessage = responseData.message || "Resource not found.";
        toast.error(errorMessage);
      } else if (response.status === 409) {
        const errorMessage = responseData.message || "Conflict in data.";
        toast.error(errorMessage);
      } else if (response.status === 500) {
        const errorMessage =
          responseData.message || "Please try again later.";
        toast.error(errorMessage);
      } else {
        const errorMessage =
          responseData.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add driver.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div>
        <Heading title="Add Driver" center />
      </div>
      <Container>
        <Row
          className="p-3 my-3 rounded"
          style={{ border: "1px solid black" }}
        >
          <Col md={6}>
            <TextField
              fullWidth
              value={vehicletype}
              onChange={(e) => setVehicletype(e.target.value)}
              label="Vehicle Type"
              variant="outlined"
              type="text"
              autoComplete="off"
              className="m-1 my-4"
              required
            />
          </Col>
          <Col md={6}>
            <TextField
              fullWidth
              value={vehiclenumber}
              onChange={(e) => setVehiclenumber(e.target.value)}
              label="Vehicle Number"
              variant="outlined"
              className="m-1 my-4"
              type="text"
              autoComplete="off"
              required
            />
          </Col>
          <Col md={12}>
            <div className="d-flex justify-content-center align-items-center my-3">
              <Button
                variant="contained"
                color="inherit"
                className="mt-4"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ManageDriver;
