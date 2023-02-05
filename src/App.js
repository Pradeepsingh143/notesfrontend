import "./App.css";
import { Form } from "./components/Form";
import { UserList } from "./components/UserList";
// import axios from "axios";

// axios.defaults.baseURL = 'https://talented-jade-capris.cyclic.app/';

function App() {
  return (
    <div>
      <Form />
      <UserList />
    </div>
  );
}

export default App;
