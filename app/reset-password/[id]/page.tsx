"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";

const ResetPassword = ({ params }: any) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: params.id }),
        });

        if (response.ok) {
          const newData = await response.json();
          setUserData(newData);
        } else {
          console.log("user data not found");
        }
      } catch (error: any) {
        console.log(error, "Api Error");
      }
    };

    verifyToken();
  }, [params.id]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const oldData = JSON.parse(userData);
    setErrorPassword(password.trim() === "");
    try {
      if (
      password.trim() === ""
    ) {
      return toast.error('Password is Required');
    }
      const response = await fetch("/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email: oldData.email }),
      });

      const responseData = await response.json();
    if (response.ok) {
      toast.success("Succesfully Registered Please Login !");
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
        toast.error("Failed to add customer. Please try again later.");
      }
  };
  // END
  return (
    <div className="d-flex justify-content-center my-5 align-items-center">
      <div className="border rounded shadow p-5">
        <FormControl className="my-3" required variant="outlined" error={errorPassword}>
          <InputLabel htmlFor="outlined-adornment-password">
            Reset Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password}
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
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
        </FormControl>{" "}
        <div className="d-flex justify-content-center my-2 align-items-center">
          <Button onClick={handleSubmit} variant="contained" color="inherit">
            Reset password
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
