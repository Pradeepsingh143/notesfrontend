import {useContext} from "react";
import UserContext from "../context/userContext";

const UserData = ()=>{
    return useContext(UserContext)
}
export default UserData