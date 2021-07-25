import React from "react";
import { Link } from "react-router-dom";
import { customName } from "../../../Util";
import Image from "../Image";
const Collection = ({ listCollection }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {listCollection.map((collection) => {
        return (
          <div
            key={collection._id}
            className="relative md:w-full h-full overflow-hidden colection fade min-h-[100px]"
          >
            <Link to={`/category/${collection.name}?id=${collection._id}`}>
              <Image
                url={`${process.env.REACT_APP_API_IMG_CATEGORY}/${collection._id}`}
                classname="filter grayscale  w-full h-full object-cover transition ease-in duration-[.4s] transform colection-img "
              />
            </Link>
            <div className="absolute left-0 bottom-0 pl-7 pb-10 md:pl-10 md:pb-10">
              <Link
                to={`/category/${collection.name}?id=${collection._id}`}
                className="tracking-wider text-3xl md:text-4xl lg:text-5xl  text-white hover:main-text transition ease-in duration-400"
              >
                {customName(collection.name)}
              </Link>
              <p className="font-bold text-white text-xl">
                {collection.count} item
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Collection;
