import { createContext, useState, useEffect } from "react";
import axios from "axios";
const UserContext = createContext({});

export const UserProvider = ({children})=>{
    const [userData, setUserData] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
      setLoading(true)
        try {
          const resp = await axios.get("/getUsers");
          // if No users are there please dont set the values
            setUserData(resp.data.users);
            setLoading(false)
        } catch (error) {
          console.log("Error:", error);
        } finally{
          setLoading(false)
        }
      };
    
      useEffect(() => {
        fetchUserData();
      }, []);
    
    return(
    <UserContext.Provider value={{userData, loading, setUserData, fetchUserData}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContext

