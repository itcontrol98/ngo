"use client";
import { Button, InputAdornment, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrorEmail(!validateEmail(event.target.value));
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail(email.trim() === "");

    if (
      email.trim() === ""
    ) {
      return toast.error('Email is Required');
    }
    setLoading(true);
    try{
    let response = await fetch("/api/forget", {
      method: "POST",
      body: JSON.stringify({email }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      toast.success("Link Sent");
      router.push('/');
    } else if (response.status === 400 || response.status === 404 || response.status === 411|| response.status === 409 || response.status === 410){
      const errorMessage = responseData.message || "An unexpected error occurred.";
      toast.error(errorMessage);
     }
      else {
        const errorMessage = responseData.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      }}
      catch (error) {
        console.error("Error:", error);
        toast.error("Failed to send link. Please try again later.");
      }finally {
        setLoading(false);
      }
  };
  return (
    <div className="d-flex justify-content-center my-5 align-items-center">
      <div className="border rounded shadow p-5">
        <TextField
          fullWidth
          value={email}
          onChange={handleEmail}
          label="Email"
          error={errorEmail}
          helperText={errorEmail ? "Invalid email address" : ""}
          multiline
          variant="outlined"
          className="mx-1 my-3"
          type="email"
          autoComplete="off"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <div className="d-flex justify-content-center my-3 align-items-center">
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="inherit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </div>
        <div>
          <p
            className="my-3 text-center"
            style={{ fontSize: "14px", cursor: "pointer" }}
          >
            Already Have Account ?{" "}
            <span
              style={{ borderBottom: "1px groove black" }}
              onClick={() => router.push("/login")}
              className="text-dark"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
