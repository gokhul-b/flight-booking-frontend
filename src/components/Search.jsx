import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departue, setDeparture] = useState("");
  const [seatCount, setSeatCount] = useState("");
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const fromOptions = [
    "Chennai",
    "Bengaluru",
    "Kochi",
    "Goa",
    "Hyderabad",
    "Pune",
    "Mumbai",
  ];

  const getToOptions = (from) => {
    if (from === "Chennai") {
      return [
        "Bengaluru",
        "Kochi",
        "Goa",
        "Hyderabad",
        "Pune",
        "Mumbai",
        "Vizhakapatnam",
        "Surat",
        "New Delhi",
      ];
    } else if (from === "Bengaluru") {
      return [
        "Chennai",
        "Madurai",
        "Coimbatore",
        "Mangalore",
        "Kozhikode",
        "Mumbai",
        "Ahmedabad",
        "Kolkata",
        "New Delhi",
      ];
    } else if (from === "Kochi") {
      return [
        "Chennai",
        "Bengaluru",
        "Goa",
        "Hyderabad",
        "Pune",
        "Mumbai",
        "Vizhakapatnam",
        "Surat",
        "New Delhi",
      ];
    } else if (from === "Goa") {
      return [
        "Chennai",
        "Bengaluru",
        "Kochi",
        "Hyderabad",
        "Pune",
        "Mumbai",
        "Vizhakapatnam",
        "Surat",
        "New Delhi",
      ];
    } else if (from === "Hyderabad") {
      return [
        "Chennai",
        "Bengaluru",
        "Kochi",
        "Goa",
        "Pune",
        "Mumbai",
        "Vizhakapatnam",
        "Surat",
        "New Delhi",
      ];
    } else if (from === "Pune") {
      return [
        "Chennai",
        "Bengaluru",
        "Kochi",
        "Goa",
        "Hyderabad",
        "Mumbai",
        "Vizhakapatnam",
        "Surat",
        "New Delhi",
      ];
    } else if (from === "Mumbai") {
      return [
        "Chennai",
        "Bengaluru",
        "Kochi",
        "Goa",
        "Hyderabad",
        "Pune",
        "Vizhakapatnam",
        "Surat",
        "New Delhi",
      ];
    } else {
      return [];
    }
  };

  const toOptions = getToOptions(fromCity);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = {
      fromCity: fromCity,
      toCity: toCity,
      departue: departue,
      seatCount: seatCount,
    };
    const url = "https://weak-pear-magpie.cyclic.app/onSearch";
    axios
      .get(url, { params: query })
      .then((response) => {
        const flightsAvailable = response.data;
        setFlights(flightsAvailable);
        setIsVisible(true);
        console.log(flightsAvailable);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBook = (flightId) => {
    navigate(`/bookingtickets/${flightId}`);
  };

  return (
    <div className="bg-gray-300 h-full w-full">
      <div className="max-w-md mx-auto ">
        <form
          onSubmit={handleSearch}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center"
        >
          {/* <h5 className="text-start ml-1">Search</h5> */}
          <div className="grid grid-cols-2 gap-7">
            <div className="flex flex-col space-y-2">
              <label htmlFor="from">From: </label>
              <select
                name="from"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              >
                <option value="">start</option>
                {fromOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-col space-y-2">
              <label htmlFor="to">To: </label>
              {fromCity && (
                <select
                  name="to"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="">end</option>
                  {toOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="mb-4 flex flex-col space-y-2">
              <label htmlFor="date">Departure: </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={departue}
                onChange={(e) => setDeparture(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4 flex flex-col space-y-2">
              <label htmlFor="seats">Seats: </label>
              <input
                type="number"
                value={seatCount}
                onChange={(e) => setSeatCount(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
          </div>
          <button
            type="submit"
            className="max-w-fit bg-blue-500 text-white font-semibold py-2 px-4 rounded self-center mt-3"
          >
            Search
          </button>
        </form>
      </div>
      {isVisible && (
        <div className="w-full flex flex-col items-center overflow-x-auto">
          <table className="w-full sm:w-[800px] text-xs sm:text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-2 py-2 sm:px-6 sm:py-3">S.No</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Name</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">From</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">To</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Departure</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Price</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Available Seats</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Book Now</th>
              </tr>
            </thead>
            {flights.length > 0 ? (
              flights.map((flight, index) => {
                return (
                  <tbody>
                    <tr
                      key={index}
                      className="bg-gray-200 rounded m-1 p-2 text-center items-center"
                    >
                      <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                        {flight.flightname}
                      </td>
                      <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                        {flight.from}
                      </td>
                      <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                        {flight.to}
                      </td>
                      <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                        {flight.departure}
                      </td>
                      <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                        {flight.price}
                      </td>
                      <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                        {flight.seats}
                      </td>
                      <td>
                        <button
                          onClick={() => handleBook(flight.id)}
                          className="px-2 py-2 sm:px-6 sm:py-4 font-medium underline text-green-700 decoration-blue-700 sm:whitespace-nowrap"
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <p className="text-center">Oops! No flight is available now.</p>
            )}
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
