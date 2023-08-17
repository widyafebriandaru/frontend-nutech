/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import UploadProduct from "./UploadProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const AllProductsList = ({
  nama_barang,
  foto_barang,
  harga_beli,
  harga_jual,
  stok,
  link,
}) => {
  // const navigate = useNavigate();
  // const handleNavigate = (e) => {
  //   e.preventDefault();
  //   navigate(foto_barang);

  // };

  return (
    <>
      <div
        // onClick={handleNavigate}
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
              <DeleteProduct link={link} onClose={close} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
};

export default AllProductsList;
