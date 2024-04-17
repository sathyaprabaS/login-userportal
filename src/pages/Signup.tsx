import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signUp } from "../services/api";
import { paths } from "../routes/path";
import { useAuthContext } from "../context/AuthContext";
import { ISignUp } from "../interface/types";

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .typeError("Please enter the PhoneNumber")
    .matches(/^[0-9]{10}$/, "Please enter a valid phone number"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  name: yup.string().required("Name is mandatory"),
});

function Signup() {
  const navigate = useNavigate();

  const { updateUserData } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const moveToLogin = () => {
    navigate(paths.ROOT);
  };

  const handleSign = async (data: ISignUp) => {
    if (data) {
      await signUp({ ...data, role: "customer" })
        .then((response) => {
          if (response.data) {
            updateUserData({
              ...response.data,
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.log(error.response.data);
          }
        });
    }
  };

  const handleSignupSuccess = () => {
    navigate(paths.LOGOUT);
  };

  return (
    <Container>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        padding="20px 0px 10px 0px"
      >
        Signup
      </Typography>
      <form onSubmit={handleSubmit(handleSign)}>
        <Box paddingBottom="20px">
          <Typography padding="5px 0px 5px 0px">
            Name<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            inputProps={{ style: { padding: "10px" } }}
            required
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
            FormHelperTextProps={{
              sx: { color: "red", marginLeft: "0px" },
            }}
            autoComplete="new"
          />
          <Typography padding="5px 0px 5px 0px">
            PhoneNumber<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            inputProps={{ style: { padding: "10px" } }}
            required
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message?.toString()}
            FormHelperTextProps={{
              sx: { color: "red", marginLeft: "0px" },
            }}
            autoComplete="new"
            type="tel"
          />
          <Typography padding="5px 0px 5px 0px">Email</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            inputProps={{ style: { padding: "10px" } }}
            {...register("email")}
            autoComplete="new"
          />
          <Typography padding="5px 0px 5px 0px">
            Password<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            inputProps={{ style: { padding: "10px" } }}
            required
            {...register("password")}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            FormHelperTextProps={{ sx: { margin: "0px" } }}
          />
          <Typography padding="5px 0px 5px 0px">
            Confirm Password<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            inputProps={{ style: { padding: "10px" } }}
            required
            {...register("confirmPassword")}
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message?.toString()}
            FormHelperTextProps={{ sx: { margin: "0px" } }}
          />
        </Box>
        <Button
          onClick={handleSignupSuccess}
          variant="contained"
          fullWidth
          type="submit"
        >
          Sign up
        </Button>
        <FormHelperText
          onClick={moveToLogin}
          sx={{ textAlign: "right", paddingTop: "5px" }}
        >
          <Box sx={{ cursor: "pointer" }}>Already have an Account? Login</Box>
        </FormHelperText>
      </form>
    </Container>
  );
}

export default Signup;



