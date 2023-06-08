// import { useState } from "react";
import AddFlightForm from "../../components/AddFlightForm";
import AdminNavBar from "../../components/AdminNavBar";

const AddFlights = () => {
    
    return(
        <div className="bg-gray-200 h-screen">
            <AdminNavBar/>
            <AddFlightForm/>
        </div>
    )
}

export default AddFlights;