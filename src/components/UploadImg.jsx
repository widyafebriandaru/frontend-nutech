import { useState } from "react";

function UploadImg() {
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);

  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  function handleSave() {
    if (saveImage) {
      // save image to backend
      let formData = new FormData();
      formData.append("photo", saveImage);

      fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.href = data.image;
        });
    } else {
      alert("Upload gambar dulu");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4 mt-5 mx-auto">
        <div>
          <img src={image} className="rounded-md" alt="..." />
        </div>
        <div className="my-3">
          <label htmlFor="formFile" className="block text-sm font-medium text-gray-700">
            Upload image here
          </label>
          <input
            onChange={handleUploadChange}
            className="mt-1 block w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
            type="file"
            id="formFile"
          />
          <button onClick={handleSave} className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">
            Save my photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadImg;
