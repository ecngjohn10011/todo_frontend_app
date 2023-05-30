import { NavLink, Link } from "react-router-dom";

export const Header = () => {
    
    return (
      <div className="flex bg-slate-300">
        <div className="flex pl-8 h-full items-center">
          <NavLink
            className="text-slate-800 mr-4"
            to="/"
            style={({ isActive }: { isActive: boolean }) => ({
              fontWeight: isActive ? "600" : "",
            })}
          >
            Home
          </NavLink>
        </div>
        <div className="flex grow bg-slate-300 p-4 pr-8 w-full justify-end">
          <nav>
            <NavLink
              className="text-slate-800 mr-4"
              to="/login"
              style={({ isActive }: { isActive: boolean }) => ({
                fontWeight: isActive ? "600" : "",
              })}
            >
              Login
            </NavLink>
            <NavLink
              className="text-slate-800"
              to="/signup"
              style={({ isActive }: { isActive: boolean }) => ({
                fontWeight: isActive ? "600" : "",
              })}
            >
              Sign Up
            </NavLink>
          </nav>
        </div>
      </div>
    );

}


export default {}
