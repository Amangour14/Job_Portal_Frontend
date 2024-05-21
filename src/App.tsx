import Navbar from "./Components/Navbar/Navbar.tsx";
import Jobs from "./Pages/Job/Jobs.tsx";
import Login from "./Pages/Registration/Login.tsx";
import Contact from "./Pages/Contact/Contact.tsx";
import JobDetails from "./Components/JobDetails/JobDetails.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import UDJobForm from "./Pages/Forms/UDJobForm.tsx";
import Signup from "./Pages/Registration/Signup.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NotFound from "./Pages/NotFound/NotFound.tsx";
import PrivateRoute from "./Components/PrivateRoute.tsx";
import { useEffect } from "react";
import { setAxiosBaseUrl } from "./http-service/axios-service.ts";

function App() {
  useEffect(() => {
    setAxiosBaseUrl("http://localhost:8080/");
  }, []);
  return (
    <Router>
      <div>
        <Navbar data-testid="navbar" />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route
            path="/jobForm"
            element={
              <PrivateRoute>
                <UDJobForm />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
