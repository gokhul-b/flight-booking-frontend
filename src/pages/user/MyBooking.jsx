import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

const MyBooking = () => {
    const[myFlights,setMyFlights] = useState([]);
    const url = `http://localhost:5000/mylist/${localStorage.getItem('userId')}`
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(url);
                const myBookings = response.data;
                console.log(myBookings);
                setMyFlights(myBookings)
            }catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[])
    return(
        <div>
            <NavBar/>
            <h2 className="text-center my-8">My Bookings</h2>
            <div className="mx-w-md flex flex-col space-y-5">
                <div className=" bg-gray-200 rounded m-1 p-2 text-center">
                    {myFlights.map((flight,index) => (
                            <div key={index}>
                                Flight Name: {flight.flightname}, From: {flight.from}, To: {flight.to}, Departure Date: {flight.departure}, Price: {flight.price}, Booked Seats: {flight.seats}
                            </div>
                    ))}
                </div> 
            </div>
        </div>
    )
}
export default MyBooking;