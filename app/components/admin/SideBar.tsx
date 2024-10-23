"use client"; // Ensure to keep this if using client-side state

import { useState } from "react";
import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdArticle,
  MdLibraryAdd,
  MdTripOrigin,
  MdPeople,
  MdLocalHospital,
  MdBadge,
  MdGroup,
  MdViewAgenda,
  MdExpandMore,
  MdExpandLess,
  MdCalendarToday,
  MdInventory,
  MdPerson,
  MdHome,
  MdAlarm,
  MdShoppingCart,
  MdBuild,
  MdLocationOn,
  MdClose,
  MdMenu,
} from "react-icons/md";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: MdDashboard,
    roles: ["SUPERADMIN"],
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: MdShoppingCart,
    roles: ["SUPERADMIN"],
  },
  {
    label: "Drivers",
    icon: MdArticle,
    roles: ["SUPERADMIN"],
    href: "/admin/managedriver",
  },
  { label: "Users", href: "/admin/user", icon: MdPeople, roles: ["SUPERADMIN"] },
];

const Sidebar = ({ role }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const handleSubItemClick = () => {
    setIsOpen(false);
  };

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <>
      <button
        className="text-black p-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      <div
        className={`fixed inset-0 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} bg-black`}
        onClick={handleCloseSidebar}
      >
        <div
          className={`fixed mb-5 top-0 left-0 text-black w-64 h-full transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ marginTop: "120px", overflowY: "auto" }} // Add overflowY for sidebar scrolling
        >
          <div
            className="mt-4  bg-black max-h-[calc(100vh-120px)] overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
          >
            {filteredMenuItems.map((item) => (
              <div className="flex flex-col gap-2" key={item.label}>
                {item.subItems ? (
                  <>
                    <div
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-300"
                    >
                      <item.icon className="mr-2 text-black" />
                      <span className="text-black">{item.label}</span>
                      {openDropdown === item.label ? (
                        <MdExpandLess className="ml-auto text-black" />
                      ) : (
                        <MdExpandMore className="ml-auto text-black" />
                      )}
                    </div>
                    {openDropdown === item.label && (
                      <div className="mx-3 p-1 flex flex-col gap-2">
                        {item.subItems.map((subItem) =>
                          subItem.roles.includes(role) ? (
                            <div key={subItem.label}>
                              <Link
                                href={subItem.href || "#"}
                                className="flex items-center p-2 bg-yellow-300 hover:bg-yellow-400"
                                onClick={handleSubItemClick}
                              >
                                <subItem.icon className="mr-2 text-black" />
                                <span className="text-black">
                                  {subItem.label}
                                </span>
                              </Link>
                              {subItem.subItems && (
                                <div className="ml-4 flex flex-col gap-1">
                                  {subItem.subItems.map((subSubItem) =>
                                    subSubItem.roles.includes(role) ? (
                                      <Link
                                        href={subSubItem.href || "#"}
                                        key={subSubItem.label}
                                        className="flex items-center p-2 bg-yellow-200 hover:bg-yellow-300"
                                        onClick={handleSubItemClick}
                                      >
                                        <subSubItem.icon className="mr-2 text-black" />
                                        <span className="text-black">
                                          {subSubItem.label}
                                        </span>
                                      </Link>
                                    ) : null
                                  )}
                                </div>
                              )}
                            </div>
                          ) : null
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center p-2 hover:bg-gray-300"
                    onClick={handleCloseSidebar}
                  >
                    <item.icon className="mr-2 text-black" />
                    <span className="text-black">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
