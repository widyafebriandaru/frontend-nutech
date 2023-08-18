import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllProductsList from "../components/AllProductList";
import UploadProduct from "../components/UploadProduct";
import { useDispatch, useSelector } from "react-redux";
import { logOut, reset, getMe } from "../features/authSlice";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import Search from "../components/Search";

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
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  if (user && user.accountType === "") {
    navigate("/");
  }

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3002/products");
    const jsonData = await response.data; // Extract the "data" property from the response
    setData(jsonData);
  };

  const handleRefreshProduct = () => {
    getProducts();
  };
  
  return (
    <>
    
      <button className="bg-red-500 p-2" onClick={logout}>
        Logout
      </button>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="bg-blue-500 p-2 ml-5">Tambah Product</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <div className="fixed top-1/2 left-1/2 rounded-md shadow bg-white -translate-x-1/2 -translate-y-1/2">
            <UploadProduct refreshProduct={handleRefreshProduct}/>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Search/>
      <h1>INI LIST BARANG</h1>
      <h2>
        {" "}
        Welcome Back{" "}
        <strong>
          {user && user.name} sebagai {user && user.accountType}
        </strong>
      </h2>
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
                refreshProduct={handleRefreshProduct}
              ></AllProductsList>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
