import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css"

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
    <div>
     <div className="portfolio-container">
  <h1 className="portfolio-title hidden-sm">MY Projects</h1>
  <h1 className="portfolio-title show-sm">MY <span className="text-tubeLight-effect font-extrabold">WORK</span></h1>
  <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
  <div className="project-grid">
    {viewAll
      ? projects.map((element) => (
          <Link to={`/project/${element._id}`} key={element._id}>
            <img src={element.projectBanner?.url} alt={element.title} />
          </Link>
        ))
      : projects.slice(0, 9).map((element) => (
          <Link to={`/project/${element._id}`} key={element._id}>
            <img src={element.projectBanner?.url} alt={element.title} />
          </Link>
        ))}
  </div>
  {projects.length > 9 && (
    <div className="show-more-button">
      <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
        {viewAll ? "Show Less" : "Show More"}
      </Button>
    </div>
  )}
</div>
    </div>
  );
};

export default Portfolio;
