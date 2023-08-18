/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import axios from "axios";
import { Cross1Icon } from "@radix-ui/react-icons";

const AllProductsList = ({
  nama_barang,
  foto_barang,
  harga_beli,
  harga_jual,
  stok,
  link,
  refreshProduct, //buat dikirim ke parent
}) => {
  const productId = link.substring(link.lastIndexOf("/") + 1);
  const { user, isError, message } = useSelector((state) => state.auth);

  //DELETE START
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
  //DELETE END

  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [productInfo, setProductInfo] = useState({
    nama_barang: "",
    harga_beli: 0,
    harga_jual: 0,
    stok: 0,
  });

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
      axios
        .post("http://localhost:3002/api/upload/", formData)
        .then((response) => {
          const updatedProductInfo = {
            ...productInfo,
            foto_barang: response.data.image,
          };

          // Send the updated product info to the backend using Axios
          axios
            .patch(
              `http://localhost:3002/products/${productId}`,
              updatedProductInfo
            )
            .then((response) => {
              console.log("Response from backend:", response.data);
              refreshProduct();
            })
            .catch((error) => {
              console.error("Error updating product info:", error);
              setErrorMessage(error.response.data.error);
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
    <>
      <div
        target="_blank"
        rel="noopener noreferrer"
        className="hover-item  text-[#232324] rounded-md overflow-hidden font-sans mx-3 max-w-[277px] border border-black shadow-md"
      >
        <h2 className="text-2xl md:text-l md:mb-1 font-semibold text-center">
          {nama_barang}
        </h2>
        <div className="flex justify-center">
          <img
            src={foto_barang}
            alt="image"
            className="md:w-56 w-40 h-26 md:h-38 object-contain mt-4"
          />
        </div>
        <div className="text-sm font-semibold w-full">
          <div className="text-center">Harga Beli = {harga_beli}</div>
          <div className="text-center">Harga Jual = {harga_jual}</div>
        </div>
        <div className="w-full flex justify-around mb-2">
          <Dialog.Root>
            <Dialog.Trigger>
              <button className="p-2 font-semibold text-slate-800 bg-blue-400 hover:opacity-80 rounded-md">
                UPDATE
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black" />
              <Dialog.Content className="fixed top-1/2 left-1/2 rounded-md shadow bg-white -translate-x-1/2 -translate-y-1/2">
                <div>
                  <div className="flex justify-center items-center">
                    <div className="mx-auto">
                      <div className="w-full flex justify-end ">
                        <Dialog.Close>
                          <Cross1Icon className="h-5 w-5 mt-2 mr-2 hover:opacity-80" />
                        </Dialog.Close>
                      </div>
                      <div className="m-2">
                        <img src={image} className="rounded-md" alt="..." />
                      </div>
                      <div className="my-3">
                        <label
                          htmlFor="formFile"
                          className="block px-2 text-sm font-medium text-gray-700"
                        >
                          Upload image here
                        </label>
                        <input
                          onChange={handleUploadChange}
                          className="mt-1 px-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                          type="file"
                          id="formFile"
                        />
                        <input
                          type="text"
                          name="nama_barang"
                          placeholder="Nama Barang"
                          value={productInfo.nama_barang}
                          onChange={handleInputChange}
                          className="mt-1 px-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                        />
                        <input
                          type="text"
                          name="harga_beli"
                          placeholder="Nama Barang"
                          value={productInfo.harga_beli}
                          onChange={handleInputChange}
                          className="mt-1 px-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                        />
                        <input
                          type="text"
                          name="harga_jual"
                          placeholder="Nama Barang"
                          value={productInfo.harga_jual}
                          onChange={handleInputChange}
                          className="mt-1 px-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                        />
                        <input
                          type="text"
                          name="stok"
                          placeholder="Nama Barang"
                          value={productInfo.stok}
                          onChange={handleInputChange}
                          className="mt-1 px-2 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                        />
                        <Dialog.Close className="w-full">
                          <button
                            onClick={handleSave}
                            className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                          >
                            EDIT Product
                          </button>
                        </Dialog.Close>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger>
              <button className="p-2 font-semibold text-slate-800 bg-red-400 hover:opacity-80 rounded-md">
                DELETE
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black" />
              <Dialog.Content className="fixed top-1/2 left-1/2 rounded-md shadow bg-white -translate-x-1/2 -translate-y-1/2">
                <div className="p-4">
                  <h1 className="font-semibold text-lg">Yakin ingin menghapus?</h1>
                  <div className="flex justify-around">
                  <Dialog.Close>
                    <button onClick={deleteProduct} className="bg-red-400 font-semibold px-3 rounded-md hover:opacity-75">
                      Ya
                    </button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <button className="bg-slate-200 font-semibold px-3 rounded-md hover:opacity-75">
                      Tidak
                    </button>
                  </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </>
  );
};

export default AllProductsList;
