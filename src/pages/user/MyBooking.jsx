import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

const MyBooking = () => {
  const [myFlights, setMyFlights] = useState([]);
  const [availableFilghts, setAvailableFilghts] = useState([]);
  const [isFlightIdFetched, setIsFlightIdFetched] = useState(false);

  const urlForIds = "https://weak-pear-magpie.cyclic.app/getAllids";
  const getCurrentFlights = async () => {
    try {
      const response = await axios.get(urlForIds);
      const objects = response.data;
      const ids = [];
      for (let i = 0; i < objects.length; i++) {
        ids.push(objects[i].id);
      }
      setAvailableFilghts(ids);
      setIsFlightIdFetched(true);
      console.log(ids);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const url = `https://weak-pear-magpie.cyclic.app/mylist/${localStorage.getItem(
      "userId"
    )}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const myBookings = response.data;
        console.log(myBookings);
        const selectedFlights = myBookings.filter((flight) =>
          availableFilghts.includes(flight.flightid)
        );
        console.log(selectedFlights);
        setMyFlights(selectedFlights);
      } catch (error) {
        console.error(error);
      }
    };
    if (isFlightIdFetched) {
      fetchData();
    } else {
      getCurrentFlights();
    }
  }, [isFlightIdFetched]);

  return (
    <div>
      <NavBar />
      <h2 className="text-center my-10 font-semibold">My Bookings</h2>
      <div className="mx-auto mt-10">
        <div className="relative flex items-center justify-center overflow-x-auto">
          <table className="w-full sm:w-[600px] text-xs sm:text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-2 py-2 sm:px-6 sm:py-3">S.No</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Name</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">From</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">To</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Departure</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Seats</th>
                <th className="px-2 py-2 sm:px-6 sm:py-3">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {myFlights.map((flight, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
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
                      {flight.seats}
                    </td>
                    <td className="px-2 py-2 sm:px-6 sm:py-4 font-medium text-gray-900 sm:whitespace-nowrap">
                      {flight.price * flight.seats}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MyBooking;
