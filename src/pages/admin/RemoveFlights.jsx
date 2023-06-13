import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
const RemoveFlights = () => {
  const [flights, setFlights] = useState([]);

  const url = "https://weak-pear-magpie.cyclic.app/getallflights";
  useEffect(() => {
    const getFlights = async () => {
      try {
        const response = await axios.get(url);
        const flights = response.data;
        setFlights(flights);
        console.log(flights);
      } catch (error) {
        console.error(error);
      }
    };
    getFlights();
  }, []);

  const handleRemove = async (flightId) => {
    try {
      const url = `https://weak-pear-magpie.cyclic.app/removeflight/${flightId}`;
      const response = await axios.put(url);
      const updatedList = response.data;
      setFlights(updatedList);
      console.log(updatedList);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <AdminNavBar />
      <h2 className="text-center my-8 font-semibold">Flights</h2>
      <div className="flex flex-col items-center overflow-x-auto">
        <table className="w-full sm:w-[800px] text-xs sm:text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-2 py-2 sm:px-6 sm:py-3">S.no</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Flight Name</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">From</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">To</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Departure</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Price</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Seats</th>
              <th className="px-2 py-2 sm:px-6 sm:py-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => {
              return (
                <tr key={index}>
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
                      onClick={() => handleRemove(flight.id)}
                      className="text-red-700 underline decoration-indigo-500 font-semibold px-2 py-2 sm:px-6 sm:py-4"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RemoveFlights;
