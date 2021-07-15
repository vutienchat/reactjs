import React from "react";
import { Link } from "react-router-dom";
import { customName } from "../../../Util";
const Collection = ({ listCollection }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {listCollection.map((collection) => {
        return (
          <div
            key={collection._id}
            className="relative md:w-full overflow-hidden colection fade"
          >
            <Link to={`/category/${collection.name}?id=${collection._id}`}>
              <img
                src={`${process.env.REACT_APP_API_IMG_CATEGORY}/${collection._id}`}
                className="filter grayscale imagee w-full object-cover transition ease-in duration-[.4s] transform colection-img"
                alt=""
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
                {collection.total} item
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Collection;
