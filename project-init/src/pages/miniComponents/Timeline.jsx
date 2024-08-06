import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Timeline.css"; // Importing the CSS file

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimeline(data.timelines);
    };
    getMyTimeline();
  }, []);
  return (
    <div className="timeline-container">
      <h1 className="timeline-title">Timeline</h1>
      <ol className="timeline-list">
        {timeline &&
          timeline.map((element) => {
            return (
              <li className="timeline-item" key={element._id}>
                <span className="timeline-dot">
                  <svg
                    className="timeline-icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h3 className="timeline-title">{element.title}</h3>
                <time className="timeline-date">
                  {element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}
                </time>
                <p className="timeline-description">
                  {element.description}
                </p>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Timeline;
