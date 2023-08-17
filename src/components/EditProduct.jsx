import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function EditProduct({ link }) {
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [productInfo, setProductInfo] = useState({
    nama_barang: "",
    harga_beli: 0,
    harga_jual: 0,
    stok: 0,
  });
  const productId = link.substring(link.lastIndexOf("/") + 1);

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  };

  const handleSave = () => {
    if (saveImage) {
      let formData = new FormData();
      formData.append("photo", saveImage);

      // Use Axios for the image upload
      axios.post("http://localhost:3002/api/upload/", formData)
        .then((response) => {
          const updatedProductInfo = {
            ...productInfo,
            foto_barang: response.data.image,
          };

          // Send the updated product info to the backend using Axios
          axios.patch(`http://localhost:3002/products/${productId}`, updatedProductInfo)
            .then((response) => {
              console.log("Response from backend:", response.data);
            })
            .catch((error) => {
              console.error("Error updating product info:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
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
      <div className="mx-auto">
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
            EDIT Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
