import Navbar from "./Components/Navbar/Navbar.tsx";
import Jobs from "./Pages/Job/Jobs.tsx";
import Login from "./Pages/Registration/Login.tsx";
import Contact from "./Pages/Contact/Contact.tsx";
import JobDetails from "./Components/JobDetails.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Pages/Header.tsx";
import UDJobForm from "./Pages/Forms/UDJobForm.tsx";
import Signup from "./Pages/Registration/Signup.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div>
        <Navbar data-testid="navbar" />
          <ToastContainer />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobForm" element={<UDJobForm />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
