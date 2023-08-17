import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DeleteProduct = ({ link }) => {
  const productId = link.substring(link.lastIndexOf("/") + 1);
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const deleteProduct = async () => {
    try {
      if(user.accountType !== "Admin"){
        alert("Hanya Admin yang dapat menghapus product")
      }
      await axios.delete(`http://localhost:3002/products/${productId}`);
      
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <h1>ARE YOU SURE WANT TO DELETE?</h1>
      <p>{user && user.name}</p>
      {isError && <h1 className=" text-red-500">{message}</h1>}
      <p>{user && user.accountType}</p>
      <button onClick={deleteProduct} className='bg-red-200'>YEAH DUDE</button>
      <h1>{productId}</h1>
    </>
  );
};

export default DeleteProduct;
