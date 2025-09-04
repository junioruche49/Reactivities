import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { GitHub, LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import useAccount from "../../lib/hooks/useAccount";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAccount();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
      onError: (error) => {},
    });
  };

  const loginWithGithub = () => {
    const clientId = import.meta.env.VITE_GIHUB_CLIENT_ID;
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirectUri=${redirectUrl}&scope=read:user user:email`;
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <TextInput label="Email" control={control} name="email" />
      <TextInput
        label="Password"
        type="password"
        control={control}
        name="password"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
      <Button
        onClick={loginWithGithub}
        startIcon={<GitHub />}
        sx={{ backgroundColor: "black" }}
        type="button"
        variant="contained"
        size="large"
      >
        Login with Github
      </Button>
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        <Typography sx={{ textAlign: "center" }}>
          Don't have an account?
          <Typography
            sx={{ ml: 2 }}
            component={Link}
            to="/register"
            color="primary"
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Paper>
  );
}
