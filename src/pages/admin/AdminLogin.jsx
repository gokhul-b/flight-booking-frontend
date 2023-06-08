import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const handleAdminLogin = (e) => {
        e.preventDefault();
        const query = {email:email,password:password}
        const url = 'http://localhost:5000/adminlogin';
        const isAuthenticated = async () => {
            try{
                const response = await axios.get(url,{params: query});
                const bool = response.data;
                console.log(bool)
                if(bool){
                    new Promise((resolve, reject) => {
                        try {
                          localStorage.setItem('token', true);
                          resolve();
                        } catch (error) {
                          reject(error);
                        }
                      })
                        .then(() => {
                          navigate('/addflights');
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                }else{
                    setEmail('');
                    setPassword('');
                }
            }catch(error){
                console.error(error);
            }
        }
        isAuthenticated();
    }
    // const navi = async() => {
    //     localStorage.setItem('token',true)
    // }
    return(
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-center">Admin Login</h2>
            <form onSubmit={handleAdminLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    onChange={(e) => setPassword(e.target.value)}
                />
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Login</button>
            </form>
        </div>
    )
}
export default AdminLogin;