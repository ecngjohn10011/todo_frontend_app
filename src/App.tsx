import './App.css'
import {Header} from './components/Header'
import { Footer } from './components/Footer'
import { LandingPage } from './components/LandingPage'
import { LoginPage } from "./components/AuthPages/LoginPage";
import { SignUpPage } from "./components/AuthPages/SignUpPage";
import { Navigate } from "react-router-dom";

import { AuthProvider } from "./components/AuthPages/auth";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { PrivateRoute } from "./components/AuthPages/PrivateRoute";
import { RedirectIfAuthenticated } from "./components/AuthPages/RedirectIfAuthenticated";

function App() {
  return (
    <div className="App h-full flex flex-col">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex grow justify-center items-center">
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/login"
              element={<RedirectIfAuthenticated element={<LoginPage />} />}
            />
            <Route
              path="/signup"
              element={<SignUpPage />}
            />

            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
          </Routes>{" "}
        </AuthProvider>
      </div>

      {/* Body */}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default App
