import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/adminlogin');
    }
    return(
        <nav className="bg-orange-500">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-12">
                    <Link to='/addflights'>Add Flights</Link>
                    <Link to='/removeflights'>Remove Flights</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavBar;