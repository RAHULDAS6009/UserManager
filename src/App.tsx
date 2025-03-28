import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import { Toaster } from "react-hot-toast";
import { UserList } from "./pages/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
      <Toaster   position="top-right"
  reverseOrder={false}/>

    </Router>
  );
}

export default App;
