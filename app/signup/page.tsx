"use client";
import { useState, useEffect } from "react";
import {
  FormControl,
  Button,
  InputAdornment,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  OutlinedInput,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomerForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorContact, setErrorContact] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

   // Show Password Start

   const handleClickShowPassword = () => setShowPassword((show) => !show);
   const handleMouseDownPassword = (
     event: React.MouseEvent<HTMLButtonElement>
   ) => {
     event.preventDefault();
   };
 
   // Show Password End
 
   // Password Validation Start
 
   const handlePasswordChange = (event: any) => {
     setPassword(event.target.value);
     setErrorPassword(event.target.value.trim() === "");
   };
 
   // Password Validation End

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorName(name.trim() === "");
    setErrorEmail(email.trim() === "");
    setErrorContact(contact.trim() === "");
    setErrorPassword(password.trim() === "");

    if (
      name.trim() === "" ||
      contact.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      return toast.error('All Field is Required');
    }
    setLoading(true);
    try{
    let response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({name, email, contact, password }),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      toast.success("Registered Please Login !");
      router.push('/login');
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
        toast.error("Failed to add customer. Please try again later.");
      }finally {
        setLoading(false);
      }
  };

  return (
    <div className="d-flex justify-content-center bg-body my-4 align-items-center flex-column">
      <div className="border shadow my-3 py-4 rounded px-5">
        <TextField
          fullWidth
          value={name}
          onChange={handleName}
          label="Name"
          error={errorName}
          variant="outlined"
          type="text"
          autoComplete="off"
          className="m-1 my-3"
          required
        />
        <br />
        <TextField
          fullWidth
          value={email}
          onChange={handleEmail}
          label="Email"
          error={errorEmail}
          helperText={errorEmail ? "Invalid email address" : ""}
          multiline
          variant="outlined"
          className="m-1 my-3"
          type="email"
          autoComplete="off"
          required
        />
        <br />
        <TextField
          fullWidth
          value={contact}
          onChange={handleContact}
          error={errorContact}
          helperText={errorContact ? "Invalid contact number" : ""}
          label="Contact"
          multiline
          variant="outlined"
          className="m-1 my-3"
          type="tel"
          autoComplete="off"
          required
        />
        <br />
        <FormControl
      className="m-1 my-3"
      required
      variant="outlined"
      error={errorPassword}
      fullWidth
    >
      <InputLabel htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        value={password}
        fullWidth
        onChange={handlePasswordChange}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="New Password"
        required
      />
    </FormControl>
        <br />
        <div className="d-flex justify-content-center align-items-center">
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

export default CustomerForm;
