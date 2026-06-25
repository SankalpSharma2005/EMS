import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'
import axios from 'axios'
import { API_URL, SERVER_URL } from "../../config/api";

const userContext = createContext()

const authContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if(token){
                console.log("VERIFY API CALL RUNNING");
                const response = await axios.get(`${API_URL}/auth/login/auth/verify`, {
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                })
                console.log(response)
                if(response.data.success) {
                    setUser(response.data.user)
                }
            }else{
                setUser(null)
                setLoading(false);
            }
        }catch(error) {
            console.log("Token verification failed");

            localStorage.removeItem("token");
            setUser(null);
        }finally{
                setLoading(false)
            }
        }
        verifyUser()
    }, [])

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }
    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    )
}
export const useAuth = () => useContext(userContext);
export default authContext;