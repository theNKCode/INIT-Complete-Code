import { Card } from "../../components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/MyApps.css"; // Importing the CSS file

const MyApps = () => {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);
  return (
    <div className="my-apps-container">
      <h1 className="title">MY APPS</h1>
      <div className="apps-grid">
        {apps &&
          apps.map((element) => {
            return (
              <Card className="app-card" key={element._id}>
                <img
                  src={element.svg && element.svg.url}
                  alt="skill"
                  className="app-icon"
                />
                <p className="app-name">{element.name}</p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default MyApps;
