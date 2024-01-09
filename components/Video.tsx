import React from "react";

const VideoComponent = () => {
  return (
    <div className="video-container">
      <img
        src="/images/cb.svg" // Replace with the path to your logo image
        alt="Logo"
        className="absolute top-4 left-4 h-4 md:h-6 lg:h-7 xl:h-8 w-auto" //md:h-4 lg:h-6 xl:h-8
      />
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button className="text-black">Login</button>
        <button className="bg-white rounded-full px-4 py-2">Register</button>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/test.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoComponent;
