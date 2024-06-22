

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { auth } from "@service";
import "./index.css";

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleVerification = async () => {
    try {
      const result = await auth.sign_up({ ...formData, verification_code: verificationCode });
      console.log(result);
      if (result.success) {
        setOpen(false); 
      } else {
        alert("Verification failed, please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during verification. Please try again.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  return (
    <div className="logol">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="full_name"
                    autoComplete="fullName"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone_number"
                    label="Phone Number"
                    type="text"
                    id="phone_number"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Email Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the verification code sent to your email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="verificationCode"
            label="Verification Code"
            type="text"
            fullWidth
            variant="standard"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleVerification}>Verify</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
