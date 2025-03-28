import { useState } from "react";
import { Search, UserCircle } from "lucide-react";
import { Input } from "./generic/Input"; 

export const NavBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold hidden xl:visible">User Manager</div>

      <div className="relative max-w-sm xl:max-w-4xl w-full ">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 outline-none bg-white rounded-full text-black w-64 pr-10"
        />
        <Search className="absolute right-3 top-3 text-gray-600 w-5 h-5" />
      </div>

      <div className="relative hidden xl:visible">
        <UserCircle
          className="text-3xl cursor-pointer"
          onClick={toggleDropdown}
        />
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-gray-200"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
