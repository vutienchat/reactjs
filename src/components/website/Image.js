import React, { useState } from "react";
import threeDot from "../../image/three-dots-black.svg";
import { Img } from "react-image";
const Image = ({ url, classname }) => {
  return (
    <Img
      className={`${classname} fade`}
      src={url}
      loader={
        <div className="flex items-center justify-center h-full bg-white min-h-[100px]">
          <img className="w-12" src={threeDot} alt="" />
        </div>
      }
    />
  );
};
export default Image;
