import axios from "axios";
import { useState } from "react";

const AddFlightForm = () => {
  const [flightname, setFlightname] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");

  const getFromOptions = (flightname) => {
    if (flightname === "AirAsia India") {
      return [
        "Chennai",
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
    } else if (flightname === "Air India") {
      return [
        "Chennai",
        "Bengaluru",
        "Madurai",
        "Coimbatore",
        "Mangalore",
        "Kozhikode",
        "Mumbai",
        "Ahmedabad",
        "Kolkata",
        "New Delhi",
      ];
    } else if (flightname === "Air India Express") {
      return [
        "Chennai",
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
    } else if (flightname === "Go First") {
      return [
        "Chennai",
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
    } else if (flightname === "IndiGo") {
      return [
        "Chennai",
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
    } else if (flightname === "SpiceJet") {
      return [
        "Chennai",
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
    } else if (flightname === "Vistara") {
      return [
        "Chennai",
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
    } else {
      return [];
    }
  };

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
  const fromOptions = getFromOptions(flightname);
  const toOptions = getToOptions(from);
  console.log(toOptions);

  const handleSubmit = (e) => {
    e.preventDefault();
    const flight = {
      flightname: flightname,
      from: from,
      to: to,
      departureDate: departureDate,
      price: price,
      seats: seats,
    };
    console.log(flight);
    const url = "https://weak-pear-magpie.cyclic.app/addflights";
    axios
      .post(url, flight)
      .then((response) => {
        console.log("Flight added Successfully!", response.data);
      })
      .catch((error) => {
        console.error("Error adding flight", error);
      });

    setFlightname("");
    setFrom("");
    setTo("");
    setDepartureDate("");
    setPrice("");
    setSeats("");
  };
  return (
    <div className="max-w-md mx-auto mt-24">
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col items-center"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="FlightName">
              Flight name:
              <select
                name="FlightName"
                value={flightname}
                onChange={(e) => setFlightname(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
              >
                <option value="">select airline</option>
                <option value="AirAsia India">AirAsia India</option>
                <option value="Air India">Air India</option>
                <option value="Air India Express">Air India Express</option>
                <option value="Go First">Go First</option>
                <option value="IndiGo">IndiGo</option>
                <option value="SpiceJet">SpiceJet</option>
                <option value="Vistara">Vistara</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="from">
              From:
              {flightname && (
                <select
                  name="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
                >
                  <option value="">start</option>
                  {fromOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="to">
              To:
              {from && (
                <select
                  name="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
                >
                  <option value="">end</option>
                  {toOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="date">
              Departure:
              <input
                type="datetime-local"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
              />
            </label>
          </div>
          <div>
            <label htmlFor="price">
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
              />
            </label>
          </div>
          <div>
            <label htmlFor="seats">
              Seats:
              <input
                type="number"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700 mt-2"
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-6"
        >
          Add Flight
        </button>
      </form>
    </div>
  );
};

export default AddFlightForm;
