import { createContext, useState, useEffect } from "react";
import axios from "axios";
const UserContext = createContext({});

export const UserProvider = ({children})=>{
    const [userData, setUserData] = useState();

    const fetchUserData = async () => {
        try {
          const resp = await axios.get("/getUsers");
          // if No users are there please dont set the values
          if (resp.data.users.length > 0) {
            setUserData(resp.data.users);
          }
        } catch (error) {
          console.log("Error:", error);
        }
      };
    
      useEffect(() => {
        fetchUserData();
      }, []);
    
    return(
    <UserContext.Provider value={{userData, setUserData, fetchUserData}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContext

