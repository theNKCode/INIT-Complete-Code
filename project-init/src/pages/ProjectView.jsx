import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ".ProjectView.css"; // Import the CSS file

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        });
        setTitle(res.data.project.title);
        setDescription(res.data.project.description);
        setStack(res.data.project.stack);
        setDeployed(res.data.project.deployed);
        setTechnologies(res.data.project.technologies);
        setGitRepoLink(res.data.project.gitRepoLink);
        setProjectLink(res.data.project.projectLink);
        setProjectBanner(res.data.project.projectBanner?.url || "/avatarHolder.jpg");
        setProjectBannerPreview(res.data.project.projectBanner?.url || "/avatarHolder.jpg");
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="section">
          <div className="flex-end">
            <button className="button" onClick={handleReturnToPortfolio}>
              Return to Portfolio
            </button>
          </div>
          <div className="section mt-10">
            <h1 className="title">{title}</h1>
            <img
              src={projectBannerPreview}
              alt="projectBanner"
              className="banner-image"
            />
          </div>
          <div className="section">
            <p className="section-title">Description:</p>
            <ul className="list">
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <p className="section-title">Technologies:</p>
            <ul className="list">
              {technologiesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <p className="section-title">Stack:</p>
            <p>{stack}</p>
          </div>
          <div className="section">
            <p className="section-title">Deployed:</p>
            <p>{deployed}</p>
          </div>
          <div className="section">
            <p className="section-title">Github Repository Link:</p>
            <a className="link" target="_blank" rel="noopener noreferrer" href={gitRepoLink}>
              {gitRepoLink}
            </a>
          </div>
          <div className="section">
            <p className="section-title">Project Link:</p>
            <a className="link" target="_blank" rel="noopener noreferrer" href={projectLink}>
              {projectLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
