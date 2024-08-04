import React from "react";
import meImage from "./me.jpg";
import "../../index.css";

const About = () => {
  return (
    <div className="about-section w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
        >
          About Me
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] "></span>
      </div>
      <div className=" text-center">
        {/* Any additional content */}
      </div>
      <div>
        <div className="about-content grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={meImage}
              alt="avatar"
              className="image bg-white p-2 sm:p-4 rounded-full h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              My name is Bhupesh, I will graduate in Software Engineering from SAGE around 2024. I work as
              a web developer and freelancer. My hobbies include watching movies, series, playing video games, and occasionally cooking.
            </p>
            <p>
              I have interests not only in technology but also in movies, series, video games, and cooking. I excel in meeting deadlines for
              my work.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          My dedication and perseverance in timely delivery of work are integral to me. I maintain the courage to face any challenges for extended
          periods.
        </p>
      </div>
    </div>
  );
};

export default About;
