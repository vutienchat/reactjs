import React, { useState } from "react";
import threeDot from "../../image/three-dots-black.svg";
import { Img } from "react-image";
const Image = ({ url, classname }) => {
  return (
    <Img
      className={classname}
      src={url}
      loader={
        <div className="flex items-center justify-center h-full">
          <img className="w-16" src={threeDot} alt="" />
        </div>
      }
    />
  );
};
export default Image;
