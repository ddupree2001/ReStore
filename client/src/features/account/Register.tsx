import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data: any) =>
            agent.Account.register(data)
                .then(() => {
                    toast.success("Registration successful - you can now login");
                    navigate("/login");
                })
                .catch((error) => handleApiErrors(error))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          autoFocus
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors?.username?.message?.toString()}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message?.toString()}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          id="password"
                  {...register("password", {
                      required: "Password is required",
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: "Password does not meet complexity requirements",
                        },
           })}
          error={!!errors.password}
          helperText={errors?.password?.message?.toString()}
        />
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login">{"Already have an account? Sign In"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
