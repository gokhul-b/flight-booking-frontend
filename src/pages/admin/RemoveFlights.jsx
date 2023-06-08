import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavBar from "../../components/AdminNavBar";
const RemoveFlights = () => {

    const[flights,setFlights]=useState([])

    const url = 'https://weak-pear-magpie.cyclic.app/getallflights'
    useEffect(() =>{
        const getFlights = async () => {            
            try{
                const response = await axios.get(url);
                const flights = response.data
                setFlights(flights)
                console.log(flights)
            }catch(error){
                console.error(error);
            }
        }
        getFlights();
    },[])

    const handleRemove = async(flightId) => {
        try{
            const url = `https://weak-pear-magpie.cyclic.app/removeflight/${flightId}`
            const response = await axios.put(url);
            const updatedList = response.data
            setFlights(updatedList)
            console.log(updatedList)
        }catch(error){
            console.error(error);
        }
    }
    return(
        
        <div>
            <AdminNavBar/>
            <h2 className="text-center my-8">Flights</h2>
            <div className="mx-w-md flex flex-col space-y-5">
                <div className=" bg-gray-200 rounded m-1 p-2 text-center space-y-5">
                {flights.map((flight,index) => (
                    <div key={index}>
                    Flight Name: {flight.flightname}, From: {flight.from}, To: {flight.to}, Departure Date: {flight.departure}, Price: {flight.price}, Seats Available: {flight.seats}
                    <button onClick={() => handleRemove(flight.id)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mx-4">Remove</button>
                </div>
                ))}
                </div>
            </div>
        </div>
    )
}
export default RemoveFlights;