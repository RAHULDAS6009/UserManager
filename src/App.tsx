import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import {Table} from "./pages/Table";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/users" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;
