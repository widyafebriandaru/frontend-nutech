import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim() !== '') {
        window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
      }
    }
  };
  return (
    <>
      <div className="nav-link">
        <form className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-black border border-gray-300 rounded px-1 max-w-[9rem]"
            placeholder="Search..."
          />
          <Link
          
            to={`/search?query=${encodeURIComponent(searchQuery)}`}
            className="ml-2 text-sm bg-gray-300 text-gray-700 rounded px-1 py-1 hover:bg-[#232324] hover:text-gray-300 transition ease-in-out duration-[350ms]"
          >
            <MagnifyingGlassIcon/>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Search;
