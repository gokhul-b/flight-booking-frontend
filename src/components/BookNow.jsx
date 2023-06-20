import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";

const BookNow = () => {
  const [currentFlight, setCurrentFlight] = useState([]);
  const [seatBooked, setSeatBooked] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const url = `https://weak-pear-magpie.cyclic.app/selectedFlight/${id}`;
  useEffect(() => {
    if (!id) {
      navigate("/search");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const flightData = response.data;
        setCurrentFlight(flightData[0]);
        console.log(flightData);
        console.log(localStorage.getItem("userId"));

        //   console.log(userid)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleBook = async (id) => {
    try {
      const url = `https://weak-pear-magpie.cyclic.app/updateSeatCount/${id}`;
      const response = await axios.put(url, { seatBooked: seatBooked });
      const updatedFlightData = response.data;
      setCurrentFlight(updatedFlightData);
      alert("Your Seats Booked Successfully");
    } catch (error) {
      console.error(error);
    }
    const url1 = "https://weak-pear-magpie.cyclic.app/mybookings";
    await axios
      .post(url1, {
        flight: currentFlight,
        booked: seatBooked,
        userid: localStorage.getItem("userId"),
      })
      .then((response) => {
        console.log("Flight added to your MyBooking List", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <NavBar />
      <div className="max-w-md mx-auto mt-10 bg-gray-500">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4">
          <p>Flight Name: {currentFlight.flightname}</p>
          <p>From: {currentFlight.from}</p>
          <p>To: {currentFlight.to}</p>
          <p>Departure: {currentFlight.departure}</p>
          <p>Price: {currentFlight.price}</p>
          <p>Seats: {currentFlight.seats}</p>
          <input
            type="number"
            placeholder="No of seats"
            value={seatBooked}
            onChange={(e) => setSeatBooked(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
          <button
            onClick={() => handleBook(currentFlight.id)}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
export default BookNow;
