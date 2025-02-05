import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// Navbar component renders the top navigation bar for the application
const Navbar = () => {
  // Destructure logout and authUser from the useAuthStore hook
  const { logout, authUser } = useAuthStore();

  // Return the JSX for the header element with a fixed position at the top
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            {/* Link to the home page with logo and app name */}
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Ongea</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Link to the settings page */}
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
               
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Render profile and logout buttons only if user is authenticated */}
            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
