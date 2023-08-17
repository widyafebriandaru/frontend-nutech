/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import UploadProduct from "./UploadProduct";
import EditProduct from "./EditProduct";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AllProductsList = ({
  nama_barang,
  foto_barang,
  harga_beli,
  harga_jual,
  stok,
  link,
  refreshProduct //buat dikirim ke parent
}) => {
  const productId = link.substring(link.lastIndexOf("/") + 1);
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const deleteProduct = async () => {
    try {
      if (user.accountType !== "Admin") {
        alert("Hanya Admin yang dapat menghapus product");
      }
      await axios.delete(`http://localhost:3002/products/${productId}`);
      refreshProduct();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div
        target="_blank"
        rel="noopener noreferrer"
        className="hover-item hover:opacity-80 text-[#232324] rounded-md overflow-hidden font-sans mx-3 max-w-[277px] border border-black"
      >
        <h2 className="text-base md:text-l pt-2 md:mb-1 font-normal text-center">
          {nama_barang}
        </h2>
        <div className="flex justify-center">
          <img
            src={foto_barang}
            alt="image"
            className="md:w-full w-52 h-36 md:h-48 object-cover mt-4"
          />
        </div>
        <div className="text-sm font-semibold w-full flex">
          <div className="text-center">Harga Beli = {harga_beli}</div>
        </div>
        <div className="w-full sm:px-8 ">
          <h2 className="text-center text-l md:text-xl font-semibold">
            {" "}
            <p className="text-red-500">Harga Jual = {harga_jual}</p> {stok}
          </h2>
        </div>
        <Dialog.Root>
          <Dialog.Trigger>
            <button className="p-2 bg-blue-400">UPDATE</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black" />
            <Dialog.Content className="fixed top-1/2 left-1/2 rounded-md shadow bg-white -translate-x-1/2 -translate-y-1/2">
              <EditProduct link={link} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger>
            <button className="p-2 bg-red-400">DELETE</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black" />
            <Dialog.Content className="fixed top-1/2 left-1/2 rounded-md shadow bg-white -translate-x-1/2 -translate-y-1/2">
              <div>
                <h1>ARE YOU SURE WANT TO DELETE?</h1>
                <p>{user && user.name}</p>
                {isError && <h1 className=" text-red-500">{message}</h1>}
                <p>{user && user.accountType}</p>
                <Dialog.Close>
                <button onClick={deleteProduct} className="bg-red-200">
                  YEAH DUDE
                </button>
                </Dialog.Close>
                <h1>{productId}</h1>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
};

export default AllProductsList;
