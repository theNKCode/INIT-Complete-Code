import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux";
import "./styles/Hero.css"; // Importing the CSS file

const Hero = () => {
  const user = useSelector((state) => state.user);
  const { firstName, lastName } = user;
  const fullName = `${firstName} ${lastName}`;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/portfolio/me",
        { withCredentials: true }
      );
      setUserData(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <div className="hero">
      <div className="status">
        <span className="status-indicator"></span>
        <p>Online</p>
      </div>
      <h1 className="hero-title">
        Hey, I'm {fullName ? fullName : "User"}
      </h1>
      <h1 className="hero-subtitle">
        <Typewriter
          words={["FULLSTACK DEVELOPER", "YOUTUBER", "FREELANCER"]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
      <div className="social-links">
        <Link to={"https://www.youtube.com/"} target="_blank">
          <Youtube className="social-icon youtube" />
        </Link>
        <Link to={userData.instagramURL} target="_blank">
          <Instagram className="social-icon instagram" />
        </Link>
        <Link to={userData.facebookURL} target="_blank">
          <Facebook className="social-icon facebook" />
        </Link>
        <Link to={userData.linkedInURL} target="_blank">
          <Linkedin className="social-icon linkedin" />
        </Link>
        <Link to={userData.twitterURL} target="_blank">
          <Twitter className="social-icon twitter" />
        </Link>
      </div>
      <div className="action-buttons">
        <Link to={userData.githubURL} target="_blank">
          <Button className="action-button">
            <Github />
            <span>Github</span>
          </Button>
        </Link>
        <Link to={userData.resume && userData.resume.url} target="_blank">
          <Button className="action-button">
            <ExternalLink />
            <span>Resume</span>
          </Button>
        </Link>
      </div>
      <p className="about-me">{userData.aboutMe}</p>
      <hr className="divider" />
    </div>
  );
};

export default Hero;
