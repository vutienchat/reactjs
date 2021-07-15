import React, { useEffect, useState } from "react";
import Collection from "../../components/website/home/Collection";
import ListProduct from "../../components/website/ListProduct";
import ProductAPI from "../../api/productAPI";
import ProductTabWidget from "../../components/website/home/ProductTabWidget";
import categoryApi from "../../api/categoryAPI";
const HomePage = (props) => {
  const [listProduct, setListProduct] = useState([]);
  const [listCollection, setListCollection] = useState([]);
  useEffect(() => {
    const getListSpecial = async () => {
      const { data } = await ProductAPI.getByKey("classify=1");
      setListProduct(data);
    };
    getListSpecial();
  }, []);

  useEffect(() => {
    const getListCollection = async () => {
      const { data } = await categoryApi.getAll(4);
      setListCollection(data);
    };
    getListCollection();
  }, []);
  const changeListProduct = (data) => {
    setListProduct(data);
  };
  return (
    <>
      <Collection listCollection={listCollection} />
      <ProductTabWidget
        listCategory={listCollection}
        listByCategory={changeListProduct}
        lisstFeatured={changeListProduct}
      />
      <ListProduct {...props} listProduct={listProduct} />
    </>
  );
};

export default HomePage;
