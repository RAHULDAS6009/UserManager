import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import {Table} from "./pages/Table";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/users" element={<Table />} />
      </Routes>
      <Toaster   position="top-right"
  reverseOrder={false}/>

    </Router>
  );
}

export default App;
