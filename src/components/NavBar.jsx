import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <nav className="bg-orange-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <Link to="/search">Search Flights</Link>
          <Link to="/mybooking">My Bookings</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
