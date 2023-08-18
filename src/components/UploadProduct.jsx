import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut, reset, getMe } from "../features/authSlice";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from '@radix-ui/react-icons'

function UploadProduct({ refreshProduct }) {
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);
  const [productInfo, setProductInfo] = useState({
    nama_barang: "",
    harga_beli: 0,
    harga_jual: 0,
    stok: 0,
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [successMessage, setSuccessMessage] = useState(""); // State to hold success message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  };

  const fileInputRef = useRef(null);
  const handleSave = () => {
    if (saveImage) {
      let formData = new FormData();
      formData.append("photo", saveImage);

      axios
        .post("http://localhost:3002/api/upload", formData)
        .then((response) => {
          const newProductInfo = {
            ...productInfo,
            foto_barang: response.data.image,
          };

          // Send the product info to the backend
          axios
            .post("http://localhost:3002/products", newProductInfo)
            .then((response) => {
              console.log(response.data);
              refreshProduct();
              setProductInfo({
                nama_barang: "",
                harga_beli: 0,
                harga_jual: 0,
                stok: 0,
                
              });
              fileInputRef.current.value = null;
              setImage("https://fakeimg.pl/350x200/");
              setSuccessMessage("Success add product");
              setErrorMessage("");
            })
            
            .catch((error) => {
              console.error("Error uploading product info:", error);
              setErrorMessage(error.response.data.error);
              setSuccessMessage("");
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          setErrorMessage("Error uploading image: " + error.message); // Set error message for the popup
        });
        
    } else {
      alert("Upload gambar dulu");
    }
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto ">
        <div className="w-full flex justify-end border">
        <Dialog.Close>
        <Cross1Icon className="h-5 w-5"/>
        </Dialog.Close>
        </div>
        <div>
          <img src={image} className="rounded-md" alt="..." />
        </div>
        <div className="my-3">
          <label
            htmlFor="formFile"
            className="block text-sm font-medium text-gray-700"
          >
            Upload image here
          </label>
          <input
          ref={fileInputRef} // Attach the ref to the file input
            onChange={handleUploadChange}
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            type="file"
            id="formFile"
          />
          <input
            type="text"
            name="nama_barang"
            placeholder="Nama Barang"
            value={productInfo.nama_barang}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
          />
          <input
            type="text"
            name="harga_beli"
            placeholder="Nama Barang"
            value={productInfo.harga_beli}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
          />
          <input
            type="text"
            name="harga_jual"
            placeholder="Nama Barang"
            value={productInfo.harga_jual}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
          />
          <input
            type="text"
            name="stok"
            placeholder="Nama Barang"
            value={productInfo.stok}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
          />
            <button
              onClick={handleSave}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Upload Product
            </button>
            {errorMessage && (
          <p className="text-red-600">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-600">{successMessage}</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default UploadProduct;
