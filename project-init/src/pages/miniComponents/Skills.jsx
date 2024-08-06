import { Card } from "../../components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Skills.css"; // Importing the CSS file

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);
  return (
    <div className="skills-container">
      <h1 className="skills-title">SKILLS</h1>
      <div className="skills-grid">
        {skills &&
          skills.map((element) => {
            return (
              <Card className="skill-card" key={element._id}>
                <img
                  src={element.svg && element.svg.url}
                  alt="skill"
                  className="skill-image"
                />
                <p className="skill-title">{element.title}</p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
