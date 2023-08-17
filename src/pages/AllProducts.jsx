import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllProductsList from "../components/AllProductList";
import UploadProduct from "../components/UploadProduct";
import { useDispatch, useSelector } from "react-redux";
import { logOut, reset, getMe } from "../features/authSlice";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

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
  }, []);
  return (
    <>
      <button className="bg-red-500 p-2" onClick={logout}>
        Logout
      </button>
      <h1>INI LIST BARANG</h1>
      <h2> Welcome Back <strong>{user && user.name} sebagai {user && user.accountType}</strong></h2>
      <div className="py-10 px-5">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((item) => (
              <AllProductsList
                key={item.id}
                id={item.id}
                harga_beli={item.harga_beli}
                nama_barang={item.nama_barang}
                foto_barang={item.foto_barang}
                harga_jual={item.harga_jual}
                link={`/products/${item.id}`} // Updated link value
              ></AllProductsList>
            ))}
          </div>
        </div>
      </div>
      <UploadProduct />
    </>
  );
};

export default AllProducts;
