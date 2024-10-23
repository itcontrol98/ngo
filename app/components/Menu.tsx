import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
  email: string | null | undefined;
  name: string | null | undefined;
  closeNavbar:any
}
const DropdownMenu: React.FC<NavbarProps> = ({ email, name,closeNavbar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle Logout and close dropdown
  const handleLogout = () => {
    localStorage.clear();
    const callbackUrl = `${window.location.origin}/login`;
    signOut({ redirect: false, callbackUrl }).then(() => {
      router.refresh();
      setIsOpen(false);
      closeNavbar()
    });
  };

  // Close the dropdown after clicking a link
  const closeDropdown = () => {
    setIsOpen(false);
    closeNavbar()
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <div className="flex items-center mt-0 mx-2 space-x-1">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-800 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          {name ?  <div className="m-0">
          <p style={{fontSize:"14px"}} className="text-center m-0">{name}</p>
        </div> : <FaUserCircle className="mr-2" size={24} />}
          <svg
            className="w-5 h-5 ml-2 -mr-1 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a.75.75 0 01-.53-.22L4.47 7.78a.75.75 0 111.06-1.06L10 10.44l4.47-4.72a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-.53.22z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        
      </div>
      

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
          role="menu"
        >
          {email ? (
            <div className="py-1" role="none">
              <Link
                href="/orders"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Check Orders
              </Link>
              <hr className="my-1" />
              <Link
                href="/booking"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Appointments
              </Link>
              <hr className="my-1"/>
              <a
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="py-1" role="none">
              <Link
                href="/login"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Login
              </Link>
              <hr className="my-1" />
              <Link
                href="/signup"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
