// SearchResults.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AllProductsList from './AllProductList';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
    const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/products');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredProducts = data.filter((product) =>
      product.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredProducts);
  }, [data, searchQuery]);

  return (
    <>
      <div className="bg-slate-600 h-[57px]">
        <button className='p-2' onClick={() => navigate("/Products")}>BACK</button>
      </div>
    <Search/>
      <div className="py-10">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((item) => (
              <AllProductsList
              key={item.id}
              id={item.id}
              harga_beli={item.harga_beli}
              nama_barang={item.nama_barang}
              foto_barang={item.foto_barang}
              harga_jual={item.harga_jual}
              link={`/products/${item.id}`} // Updated link value
            ></AllProductsList>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
