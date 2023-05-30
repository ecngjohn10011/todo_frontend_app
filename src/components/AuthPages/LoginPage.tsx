import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  usernameValidationRules,
  passwordValidationRules,
} from "./validationRules";
import { useAuth } from "./auth";

interface IFormInput {
  username: string;
  password: string;
}

interface loginData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  let auth = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [session, setSession] = useState("");

  // login with basic auth
  const onSubmit = async (data: IFormInput) => {
    const loginData: loginData = data;
    const username = loginData["username"];
    const password = loginData["password"];

    const response = await auth.loginBasic(username, password);
    if (response === "success") {
      setErrMsg("");
    } else {
      setErrMsg(response);
    }
    navigate(`/dashboard`);
  };

  // handle callback from google
  const handleCredentialResponse = async (response: any) => {
    const credential = response;
    // if (credential) {
    //   const response = await auth.loginJWT(credential);
    //   if (response === "success") {
    //     setErrMsg("");
    //   } else {
    //     setErrMsg(response);
    //   }
    // }
    navigate(`/login`);
  };

  let client: {
    requestAccessToken: () =>
      | React.MouseEventHandler<HTMLButtonElement>
      | undefined;
  } | null = null;

  // Initialize google api and button
  // useEffect(() => {
  //   const sessionLocal = localStorage.getItem("session");
  //   if (sessionLocal) {
  //     setSession("Session has expired. Please log in again.");
  //     localStorage.removeItem("session");
  //   }

  //   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  //   const initGoogleSignIn = async () => {
  //     await new Promise((resolve) => {
  //       const script = document.createElement("script");
  //       script.src = "https://accounts.google.com/gsi/client";
  //       script.async = true;
  //       script.defer = true;
  //       script.onload = resolve;
  //       document.body.appendChild(script);
  //     });

  //     client = (window as any).google.accounts.oauth2.initTokenClient({
  //       client_id: clientId,
  //       scope:
  //         "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  //       callback: (tokenResponse: any) => {
  //         if (tokenResponse && tokenResponse.access_token) {
  //           handleCredentialResponse(tokenResponse["access_token"]);
  //         }
  //       },
  //     });

  //     // Create a new button element
  //     const authButton = document.getElementById("authBtn");

  //     // Set the onClick event handler
  //     authButton!.onclick = () => {
  //       (client as any).requestAccessToken();
  //     };
  //   };

  //   initGoogleSignIn();
  // }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="bg-slate-100 md:px-8 px-4 rounded-md md:p-0 flex text-center text-slate-700 items-center justify-center">
      <div
        id="loginForm"
        className="md:p-8 p-4 flex flex-col items-center justify-start rounded-md"
      >
        <h1 className="text-4xl font-light mb-6">Sign in</h1>
        {/* <h4 className="font-normal mb-3">
          Please sign in here with your Google account.
        </h4> */}

        <button
          id="authBtn"
          className="h-auto border border-slate-200 bg-white p-4 w-full flex justify-center items-center hover:shadow-md rounded-lg hover:border-slate-300"
        >
          <img
            src="/g-logo.png"
            className="h-6 mr-3"
            alt="Google logo"
          />
          <span className="font-semibold text-slate-700">
            Sign in with Google
          </span>
        </button>
        {errMsg.length > 1 && (
          <div className="text-red-500 text-sm mt-3 font-medium">
            <p>{errMsg} </p>
            <p className="text-slate-600">
              For further information please contact us at <br></br>
              <i>caribbeantechpioneers@gmail.com</i>
            </p>
          </div>
        )}
        <span className="text-center mt-4">OR</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-2 w-full text-left"
        >
          <div className="my-2.5 w-full">
            <FormControl
              className="w-full"
              error={Boolean(errors.username)}
            >
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.username)}
                    className="w-full bg-white hover:border-slate-400"
                    label="Google Account"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <div className="text-gray-600">@gmail.com</div>
                      ),
                    }}
                  />
                )}
                name="username"
                control={control}
                defaultValue=""
                rules={usernameValidationRules}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-2 font-medium">
                  {errors.username.message || "Username is required."}
                </span>
              )}
            </FormControl>
          </div>
          <div className="mb-2.5 w-full">
            <FormControl
              className="w-full"
              error={Boolean(errors.password)}
            >
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.password)}
                    className={`w-full bg-white hover:border-slate-400`}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                name="password"
                control={control}
                defaultValue=""
                rules={passwordValidationRules}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-2 font-medium">
                  {errors.password.message || "Password is required."}
                </span>
              )}
            </FormControl>
          </div>
          <button
            type="submit"
            className=" text-white py-2 px-4 rounded bg-primary"
          >
            Sign In
          </button>
          {errMsg.length > 1 && (
            <div className="text-red-500 text-sm mt-2 font-medium">
              {errMsg}
            </div>
          )}

          {session && (
            <div>
              <div className="text-red-500 text-sm mt-2 font-medium">
                {session}
              </div>
            </div>
          )}
        </form>

        {session && (
          <div>
            <div className="text-red-500 text-sm mt-2 font-medium">
              {session}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { LoginPage };
