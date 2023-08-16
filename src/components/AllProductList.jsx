/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const AllProductsList = ({
  nama_barang,
  foto_barang,
  harga_beli,
  harga_jual,
  stok,
}) => {
  // const navigate = useNavigate();
  // const handleNavigate = (e) => {
  //   e.preventDefault();
  //   navigate(foto_barang);

  // };
  return (
    <div
      // onClick={handleNavigate}
      target="_blank"
      rel="noopener noreferrer"
      className="hover-item hover:opacity-80 text-[#232324] rounded-md overflow-hidden font-sans mx-3 max-w-[277px] "
    >
      <div className="hover-price text-sm text-red-900 font-semibold border-2 border-red-900 rounded-3xl relative w-20 left-4 top-4 flex items-center">
        <div className="text-center"> Save {harga_beli}%OFF</div>
      </div>
      <div className="flex justify-center">
        {/* <img
        src={imgUrl}
        alt="image"
        className="md:w-full w-52 h-36 md:h-48 object-cover mt-4"
      /> */}
      </div>
      <div className="w-full sm:px-8 ">
        <h2 className="text-base md:text-l pt-2 md:mb-1 font-normal text-center">
          {nama_barang}
        </h2>
        <h2 className="text-base md:text-l pt-2 md:mb-1 font-normal text-center">
          {foto_barang}
        </h2>
        <h2 className="text-center text-l md:text-xl font-semibold">
          {" "}
          Rp
          <del className="text-red-500">{harga_jual}</del> {stok}
        </h2>
      </div>
    </div>
  );
};

export default AllProductsList;
