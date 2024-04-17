import {
  Box,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate} from "react-router-dom";
import { login } from "../services/api";
import { paths } from "../routes/path";
import { ILoginFormInputs } from "../interface/types";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("email is mandatory"),
  password: yup.string().required("Password is required"),
});

function LoginPage() {
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleLogin = async (data: ILoginFormInputs) => {
    try {
      const response = await login(data);
      console.log(response);

      if (response.data) {
        navigate(paths.LOGOUT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterLinkClick = () => {
    navigate(paths.REGISTER);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box mt={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Typography>
            Email<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="tel"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
            FormHelperTextProps={{
              sx: { color: "red", marginLeft: "0px" },
            }}
            autoComplete="new"
            required
          />
          <Typography>
            Password<span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            autoComplete="new"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
            type="submit"
          >
            Login
          </Button>
          <FormHelperText sx={{ textAlign: "right", paddingTop: "5px" }}>
            <Box onClick={handleRegisterLinkClick} sx={{ cursor: "pointer" }}>
              Don't have an Account? Please Register
            </Box>
          </FormHelperText>
        </form>
      </Box>
    </Box>
  );
}


export default LoginPage;
