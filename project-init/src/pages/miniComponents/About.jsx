// About.jsx
import React from "react";
import { useSelector } from "react-redux";
import meImage from "./me.jpg";
import "./styles/About.css"; // Importing the CSS file

const About = () => {
  // Accessing the user data from Redux store
  const user = useSelector((state) => state.user);

  // Destructuring user data
  const { firstName, lastName } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="about-section">
      <div className="header-container">
       
        {/* <span className="header-underline"></span> */}
      </div>
      <div className="additional-content">
        {/* Any additional content */}
      </div>
      <div className="about-content">
        <div className="image-container">
          <img src={meImage} alt="avatar" className="image" />
        </div>
        
        <div className="about-text">
          
          <p>
            My name is {fullName}, and I am pursuing a degree in Software Engineering from SAGE, graduating around 2024. I work as a web developer and freelancer. My hobbies include watching movies, series, playing video games, and occasionally cooking.
          </p>
          <p>
            I have interests not only in technology but also in movies, series, video games, and cooking. I excel in meeting deadlines for my work.
          </p>
        </div>
      </div>
      <p className="final-note">
        My dedication and perseverance in timely delivery of work are integral to me. I maintain the courage to face any challenges for extended periods.
      </p>
    </div>
  );
};

export default About;
