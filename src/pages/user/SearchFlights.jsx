import NavBar from "../../components/NavBar";
import Search from "../../components/Search";

const SearchFlights = () => {
  return (
    <div className="bg-gray-300 h-screen">
      <NavBar />
      <h5 className="text-center my-10 font-semibold">Flight Booking</h5>
      <Search />
    </div>
  );
};
export default SearchFlights;
