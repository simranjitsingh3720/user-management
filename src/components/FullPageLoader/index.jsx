import React from "react";
import TataAigLoader from "./../../assets/lottie/TATA-AIG-logo-animation";
import Lottie from "react-lottie";

const FullPageLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: TataAigLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default FullPageLoader;
