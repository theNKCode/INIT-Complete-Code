import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Portfolio.css"; // Importing the CSS file

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div className="portfolio-container">
      <h1 className="portfolio-title hidden-sm">MY Projects</h1>
      <h1 className="portfolio-title show-sm">
        MY <span className="text-highlight">WORK</span>
      </h1>
      <span className="divider"></span>
      <div className="project-grid">
        {viewAll
          ? projects.map((element) => (
              <Link to={`/project/${element._id}`} key={element._id}>
                <img
                  src={element.projectBanner?.url}
                  alt={element.title}
                  className="project-banner"
                />
              </Link>
            ))
          : projects.slice(0, 9).map((element) => (
              <Link to={`/project/${element._id}`} key={element._id}>
                <img
                  src={element.projectBanner?.url}
                  alt={element.title}
                  className="project-banner"
                />
              </Link>
            ))}
      </div>
      {projects.length > 9 && (
        <div className="show-more-button">
          <Button className="button" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
