import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

const MyBooking = () => {
    const[myFlights,setMyFlights] = useState([]);
    const url = `https://weak-pear-magpie.cyclic.app/mylist/${localStorage.getItem('userId')}`
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
            <div>
                <div className="mx-w-md flex flex-col space-y-5 items-center justify-center">
                    {myFlights.map((flight,index) =>{
                        return(
                            <div key={index} className="bg-gray-200 rounded m-1 p-2 text-center">
                                <div className="flex flex-wrap">
                                    <p className="ml-1">Flight Name: {flight.flightname} </p>
                                    <p className="ml-1">From: {flight.from} </p>
                                    <p className="ml-1">To: {flight.to} </p>
                                    <p className="ml-1">Departure Date: {flight.departure} </p>
                                    <p className="ml-1">Price: {flight.price} </p>
                                    <p>Booked Seats: {flight.seats} </p>
                                </div>
                            </div>
                        ) 
                    })}
                </div> 
            </div>
        </div>
    )
}
export default MyBooking;