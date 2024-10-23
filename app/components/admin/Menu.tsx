"use client";
import { useState } from "react";
import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdArticle,
  MdLibraryAdd,
  MdCalendarToday,
  MdPeople,
  MdLocalHospital,
  MdBadge,
  MdTripOrigin,
  MdGroup,
  MdViewAgenda,
  MdExpandMore,
  MdExpandLess,
  MdInventory,
  MdPerson,
  MdHome,
  MdEvent,
  MdAlarm,
  MdShoppingCart,
  MdBuild,
  MdLocationOn,
} from "react-icons/md";
import React from "react";

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

const Menu = ({ role }:any) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  // Toggle dropdown for specific menu items
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Toggle subdropdown for sub-items inside "Banner" section
  const toggleSubDropdown = (label: string) => {
    setOpenSubDropdown(openSubDropdown === label ? null : label);
  };

  return (
    <div className="mt-4 text-sm text-black h-full">
      <div className="h-75 overflow-y-scroll">
        {/* Loop through menu items and check roles */}
        {menuItems.map((item) => {
          if (!item.roles.includes(role)) return null; // Hide items not permitted by the user's role
          return (
            <div className="flex flex-col gap-2" key={item.label}>
              {item.subItems ? (
                <>
                  <div
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-center lg:justify-start text-black p-2 md:px-2 rounded-md hover:bg-lamaSkyLight cursor-pointer"
                  >
                    {React.createElement(item.icon, { className: "mr-4 text-xl text-black" })}
                    <span className="hidden lg:block lg:text-lg text-black">
                      {item.label}
                    </span>
                    {openDropdown === item.label ? (
                      <MdExpandLess className="ml-auto lg:ml-4 text-yellow-300" />
                    ) : (
                      <MdExpandMore className="ml-auto lg:ml-4 text-black" />
                    )}
                  </div>

                  {openDropdown === item.label && (
                    <div className="ml-4 flex flex-col gap-2">
                      {item.subItems.map((subItem) => {
                        if (!subItem.roles.includes(role)) return null;
                        return (
                          <div key={subItem.label}>
                            {subItem.subItems ? (
                              <>
                                <div
                                  onClick={() => toggleSubDropdown(subItem.label)}
                                  className="flex items-center justify-start p-2 md:px-2 text-yellow-300  rounded-md  cursor-pointer"
                                >
                                  {React.createElement(subItem.icon, { className: "mr-4 text-xl text-yellow-300" })}
                                  <span className="hidden lg:block lg:text-lg text-yellow-300">
                                    {subItem.label}
                                  </span>
                                  {openSubDropdown === subItem.label ? (
                                    <MdExpandLess className="ml-auto lg:ml-4 text-yellow-300" />
                                  ) : (
                                    <MdExpandMore className="ml-auto lg:ml-4 text-black" />
                                  )}
                                </div>

                                {openSubDropdown === subItem.label && (
                                  <div className="ml-4 flex flex-col gap-2">
                                    {subItem.subItems.map((subSubItem) => (
                                      <Link
                                        href={subSubItem.href || "/"}
                                        key={subSubItem.label}
                                        className="flex items-center justify-start py-1 md:px-1 rounded-md hover:bg-lamaSkyLight"
                                      >
                                        {React.createElement(subSubItem.icon, { className: "mr-4 text-xl text-yellow-200" })}
                                        <span className="hidden lg:block text-sm lg:text-base text-yellow-200">
                                          {subSubItem.label}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={subItem.href || "/"}
                                className="flex items-center justify-start py-1 md:px-1 rounded-md text-yellow-200 hover:bg-lamaSkyLight"
                              >
                                {React.createElement(subItem.icon, { className: "mr-4 text-xl text-black" })}
                                <span className="hidden lg:block text-sm lg:text-base text-black">
                                  {subItem.label}
                                </span>
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || "/"}
                  className="flex items-center justify-center lg:justify-start text-black py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  {React.createElement(item.icon, { className: "mr-4 text-xl text-black" })}
                  <span className="hidden lg:block text-base lg:text-lg text-black">
                    {item.label}
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
