import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllProductsList from "../components/AllProductList";

const AllProducts = ({ endpoint }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/products");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("error fetching data: ", error);
      }
    };
    fetchData();
  }, [endpoint]);
  return (
    <>
    <h1>INI LIST BARANG</h1>
      <div className="py-10 px-5">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((item) => (
              <AllProductsList
                key={item.id}
                harga_beli={item.harga_beli}
                // imgUrl={item.thumbnailPreview}
                nama_barang={item.nama_barang}
                foto_barang={item.foto_barang}
                harga_jual={item.harga_jual}
                link={`/products/${item.id}`} // Updated link value
              ></AllProductsList>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
