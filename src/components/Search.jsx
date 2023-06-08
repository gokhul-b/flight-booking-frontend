import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [fromCity, setFromCity] = useState('')
    const [toCity, setToCity] = useState('')
    const [departue, setDeparture] = useState('')
    const [seatCount, setSeatCount] = useState('')
    const [flights, setFlights] = useState([])
    const navigate = useNavigate();

        
    const fromOptions = ['Chennai', 'Bengaluru', 'Kochi','Goa','Hyderabad','Pune','Mumbai'];

    const getToOptions = (from) => {
        if(from === 'Chennai'){
            return ['Bengaluru', 'Kochi','Goa','Hyderabad','Pune','Mumbai','Vizhakapatnam','Surat','New Delhi']
        }else if(from === "Bengaluru"){
            return ['Chennai', 'Madurai','Coimbatore','Mangalore','Kozhikode','Mumbai','Ahmedabad','Kolkata','New Delhi']
        }else if(from === "Kochi"){
            return ['Chennai', 'Bengaluru','Goa','Hyderabad','Pune','Mumbai','Vizhakapatnam','Surat','New Delhi']
        }else if(from === "Goa"){
            return ['Chennai', 'Bengaluru', 'Kochi','Hyderabad','Pune','Mumbai','Vizhakapatnam','Surat','New Delhi']
        }else if(from === "Hyderabad"){
            return ['Chennai', 'Bengaluru', 'Kochi','Goa','Pune','Mumbai','Vizhakapatnam','Surat','New Delhi']
        }else if(from === "Pune"){
            return ['Chennai', 'Bengaluru', 'Kochi','Goa','Hyderabad','Mumbai','Vizhakapatnam','Surat','New Delhi']
        }else if(from === "Mumbai"){
            return ['Chennai', 'Bengaluru', 'Kochi','Goa','Hyderabad','Pune','Vizhakapatnam','Surat','New Delhi']
        }else{
            return[]
        }
    }

    const toOptions = getToOptions(fromCity);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = {fromCity:fromCity,toCity:toCity,departue:departue,seatCount:seatCount}
        const url = 'https://weak-pear-magpie.cyclic.app/onSearch'
        axios.get(url,{params: query})
             .then((response) => {
                const flightsAvailable = response.data
                setFlights(flightsAvailable)
                console.log(flightsAvailable)
             })
             .catch((error) => {
                console.error(error)
             })
    }

    const handleBook = (flightId) => {
        navigate(`/bookingtickets/${flightId}`)
    }

    return(
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4">
                <div className="mb-4 flex flex-col space-y-2" >
                    <label htmlFor="from">From: </label>
                        <select name="from" value={fromCity} onChange={(e) => setFromCity(e.target.value)} className="border rounded w-full py-2 px-3 text-gray-700">
                        <option value="">start</option>
                        {fromOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 flex flex-col space-y-2" >
                    <label htmlFor="to">To: </label>
                    {fromCity && (
                        <select name="to" value={toCity} onChange={(e) => setToCity(e.target.value)} className="border rounded w-full py-2 px-3 text-gray-700">
                        <option value="">end</option>
                    {toOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>)}
                </div>
                <div className="mb-4 flex flex-col space-y-2" >
                    <label htmlFor="date">Departure: </label>
                    <input type="date" value={departue} onChange={(e) => setDeparture(e.target.value)} className="border rounded w-full py-2 px-3 text-gray-700"/>
                </div>
                <div className="mb-4 flex flex-col space-y-2" >
                    <label htmlFor="seats">Seats: </label>
                    <input type="number" value={seatCount} onChange={(e) => setSeatCount(e.target.value)} className="border rounded w-full py-2 px-3 text-gray-700"/>
                </div>
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Search</button>
            </form>
            <div className="flex flex-col space-y-5">
                <div className="bg-gray-200 rounded m-1 p-2 text-center">
                    {flights.map((flight,index) => (
                            <div key={index}>
                                Flight Name: {flight.flightname}, From: {flight.from}, To: {flight.to}, Departure Date: {flight.departure}, Price: {flight.price}, Seats Available: {flight.seats}
                                <button onClick={() => handleBook(flight.id)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Book now</button>
                            </div>
                    ))}
                </div> 
            </div>
         </div>
    )
}

export default Search;