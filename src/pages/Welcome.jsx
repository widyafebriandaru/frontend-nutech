import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/Login");
  };

  return (
    <>
    <h1>SELAMAT DATANG</h1>
    <h2>SILAHKAN LOGIN TERLEBIH DAHULU</h2>
    <button className='p-2 bg-slate-700' onClick={login}>LOGIN</button>
    </>
  )
}

export default Welcome