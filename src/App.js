import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddFlights from "./pages/admin/AddFlights";
import AdminLogin from "./pages/admin/AdminLogin";
import RemoveFlights from "./pages/admin/RemoveFlights";
import BookingTickets from "./pages/user/BookingTickets";
import MyBooking from "./pages/user/MyBooking";
import SearchFlights from "./pages/user/SearchFlights";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignUp";
import BookNow from "./components/BookNow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {console.log(localStorage.getItem("token"))}
        {localStorage.getItem("token") === "true" ? (
          <>
            <Route path="/addflights" element={<AddFlights />} />
            <Route path="/removeflights" element={<RemoveFlights />} />
          </>
        ) : (
          <>
            <Route path="/search" element={<SearchFlights />} />
            <Route path="/mybooking" element={<MyBooking />} />
            <Route path="/bookingtickets" element={<BookingTickets />} />
            <Route path="/bookingtickets/:id" element={<BookNow />} />
          </>
        )}
        <Route path="/" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/*" element={"404 page not found"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
