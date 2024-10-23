"use client";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "@/app/components/Heading";
import axios from "axios";

const UpdateProduct = () => {
  const [vehicletype, setVehicletype] = useState("");
  const [vehiclenumber, setVehiclenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const params = useParams();
  useEffect(() => {
    const pullData = async () => {
      let singleData = await axios
        .get(`/api/driver/${params.id}`)
        .then((res) => res.data.data)
        .catch((err) => console.log(err, +"Error Found Fetch API"));
        setVehicletype(singleData.vehicletype);
        setVehiclenumber(singleData.vehiclenumber);
    };

    pullData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const pushData = await fetch(`/api/driver/${params.id}`, {
      method: "Put",
      body: JSON.stringify({
        vehicletype,
        vehiclenumber
      }),
      headers: { "Content-Type": "application/json" },
    });
    await pushData.json();
    router.push("/admin/managedriver");
    toast.success("Driver Updated");
  };

  return (
    <>
      <div>
        <Heading title="Update Driver" center />
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

export default UpdateProduct;
