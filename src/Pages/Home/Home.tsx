import bannerImage from "../../../src/assets/Images/R.png"
import './Home.css'; // Import the plain CSS file
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate=useNavigate();
  
  return (
    <div>
      <div className='container'>
        <div className="header-details">
          <h1 className='title'> Connecting dreams to opportunities. <span className='custom-text'> Explore, apply, succeed.</span> </h1>
          <p className='description'>Explore thousands of job opportunities with all the information you need. Its your future. Come find it. Manage all your job application from start to finish.</p>
          <button className='custom-btn' onClick={()=>navigate("/jobs")}>Explore </button>
        </div>
        <div className="image-section">
          <img  src={bannerImage } alt="img"  />
        </div>
      </div>
    </div>
  );
};
 
export default Header;