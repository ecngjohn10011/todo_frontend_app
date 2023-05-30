import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { PayloadData } from "../../types";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string;
  userRoles: string[];
  userEmail: string;
  userName: string;
  user_id: string;
  setAuthenticated: (authenticated: boolean) => void;
  loginJWT: (credential: string) => Promise<string>;
  loginBasic: (username: string, password: string) => Promise<string>;
  logout: () => void;
}

interface loginData {
  username: string;
  password: string;
}

interface ResponseData {
  user_role: string;
  status: number;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: "",
  userEmail: "",
  userName: "",
  userRoles: [],
  user_id: "",
  setAuthenticated: () => {},
  loginJWT: async () => {
    return Promise.resolve("");
  },
  loginBasic: async () => {
    return Promise.resolve("");
  },
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("");
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [user_id, setUserId] = useState<string>("");
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    let jwt_token = localStorage.getItem("user_jwt");

    if (!jwt_token) {
      setAuthenticated(false);
      setUserRole("");
      setUserRoles([]);
      setUserEmail("");
      setUserId("");
      setUserName("");
    } else {
      //   // Decode the Base64-encoded payload
      //   const payload: PayloadData = jwt_decode(jwt_token);

      //   // get user role
      //   const user_role = payload["scope"][0];
      console.log(isAuthenticated);
      setAuthenticated(true);
      //   setUserRole(user_role);
      //   setUserRoles(payload["scope"]);
      //   setUserEmail(payload["sub"]);
      //   setUserId(payload["id"]);
      //   setUserName(`${payload["given_name"]} ${payload["family_name"]}`);
    }
  }, [isAuthenticated]);

  // LOGIN WITH JWT
  const loginJWT = async (credential: string) => {
    const body = {
      access_token: credential,
    };
    const path = "/auth/google-token";

    try {
      const response: any = await axios.post(
        `${import.meta.env.VITE_AUTH_API_ENDPOINT}/auth/google-token`,
        body,
        {
          withCredentials: true, // make sure to include this option
        }
      );

      // If response is successful
      if (response.data.access_token) {
        const jwt_token = response.data.access_token;

        // Decode the Base64-encoded payload
        const payload: PayloadData = jwt_decode(jwt_token);

        console.log(payload);

        // get user role
        const user_role = payload["scope"][0];

        // set jwt token in local storage
        localStorage.setItem("jwt", credential);
        localStorage.setItem("user_jwt", jwt_token);

        // user is authed successfully
        setAuthenticated(true);

        // set global user role
        setUserRole(user_role);

        // set user roles
        setUserRoles(payload["scope"]);

        // set user email
        setUserEmail(payload["sub"]);

        // set user id
        setUserId(payload["id"]);

        // set user name
        setUserName(`${payload["given_name"]} ${payload["family_name"]}`);

        const oneHourAway = Date.now() + 60 * 60 * 1000;
        localStorage.setItem("expiryTime", oneHourAway.toString());
        localStorage.setItem("user_email", payload["sub"]);

        return "success";
      } else {
        // Else error with user auth
        return "User does not exist in this system";
      }
    } catch (error) {
      return "Apologies. Your user credentials weren't found.";
    }
  };

  const loginBasic = async (username: string, password: string) => {
    try {
      // const response: ResponseData = await axios.post(`${baseURL}/loginBasic`, {
      //   username: username,
      //   password: password,
      // });
      // console.log(response);
      // console.log(username, password);

      const response = {
        user_role: "mentee",
        status: 200,
      };

      if (response.status === 200) {
        console.log(response);

        // get user role
        const user_role = response["user_role"];

        // set jwt token in local storage
        localStorage.setItem("user_jwt", "123123");

        // user is authed successfully
        setAuthenticated(true);

        // set global user role
        setUserRole("mentor");

        return "success";
      } else {
        return "User does not exist in system";
      }
    } catch (error) {
      console.error(error);
      return "Failure";
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_jwt");
    localStorage.removeItem("user_email");
    localStorage.removeItem("expiryTime");
    localStorage.removeItem("intendedRoute");
    setAuthenticated(false);
    if (import.meta.env.VITE_ENVIRONMENT === "production") {
      window.location.href = "https://app.caribbeantechpioneers.org/login";
    } else if (import.meta.env.VITE_ENVIRONMENT === "staging") {
      window.location.href = "https://testapp.caribbeantechpioneers.org/login";
    } else {
      window.location.href = "https://localhost:5173/login";
    }
  };

  function hasDynamicPath(pathname: string) {
    const pathPattern = /^\/mentor\/applicants\/.*\d+.*\/email$/;
    return pathPattern.test(pathname);
  }

  function hasDynamicPathReject(pathname: string) {
    const pathPattern = /^\/mentor\/applicants\/.*\d+.*\/reject\/email$/;
    return pathPattern.test(pathname);
  }

  const logoutSessionExpired = () => {
    if (window.location.pathname === "/mentor/mentee/profile") {
      setTimeout(() => {
        logoutSessionExpired();
      }, 0.5 * 60 * 1000);
    } else {
      // console.log("log out");
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_jwt");
      localStorage.removeItem("user_email");
      localStorage.removeItem("expiryTime");
      setAuthenticated(false);
      localStorage.setItem("session", "Session Expired. Please log in again.");
      if (import.meta.env.VITE_ENVIRONMENT === "production") {
        window.location.href = "https://app.caribbeantechpioneers.org/login";
      } else if (import.meta.env.VITE_ENVIRONMENT === "staging") {
        window.location.href =
          "https://testapp.caribbeantechpioneers.org/login";
      } else {
        window.location.href = "https://localhost:5173/login";
      }
    }
  };

  const contextValue = {
    isAuthenticated,
    userRole,
    userRoles,
    userEmail,
    userName,
    user_id,
    setAuthenticated,
    loginJWT,
    loginBasic,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
