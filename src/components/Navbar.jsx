import React, { useEffect, useState } from "react";
import { IoSearch, IoPerson, IoBackspace } from "react-icons/io5";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { GrFormNext } from "react-icons/gr";
import { FaAngleDown } from "react-icons/fa6";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Action"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs only once

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Ensure AM/PM format
  });

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the search query
  };

  return (
    <>
      <div className="h-16 px-10 z-50 w-full top-0 left-0 fixed flex justify-center items-center">
        <div className="bg-gradient-to-r from-[#47484888] to-[#5c3b6352] h-10 rounded-full overflow-hidden w-full flex justify-center items-center">
          <div className="backdrop-blur-2xl gap-4 flex justify-between items-center h-full w-full px-10">
            <div className="h-full flex items-center font-bold text-[#ffffff66]">
              <p>
                <span className="text-white tracking-widest p-1 rounded-lg">
                  CINE
                </span>
                Queue
              </p>
              <hr className="w-[2px] ml-6 h-[24px] bg-white" />
              <p className="flex justify-start items-center gap-2 ml-2 text-white">
                Top{" "}
                <Dropdown>
                  <DropdownTrigger>
                    <button className="flex justify-start gap-2 items-center">
                      {selectedValue}
                      <FaAngleDown/>
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    <DropdownItem key="Action">Action</DropdownItem>
                    <DropdownItem key="Family">Family</DropdownItem>
                    <DropdownItem key="Horror">Horror</DropdownItem>
                    <DropdownItem key="Adventure">Adventure</DropdownItem>
                    <DropdownItem key="Comedy">Comedy</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </p>
            </div>
            <div className="flex justify-center relative items-center py-[8px] flex-grow h-full">
              {search && (
                <>
                  <input
                    placeholder="Search"
                    className="bg-[#ffffff24] px-4 text-sm placeholder:text-[#ffffff9e] text-white focus:outline-none h-full w-full rounded-full text-[#ffffff9e]"
                    value={searchQuery}
                    onChange={handleInputChange}
                  ></input>
                  <div className="cursor-pointer absolute right-0 px-2 gap-3 flex justify-end items-center">
                    <IoBackspace
                      onClick={handleClearSearch}
                      className=" text-[#ffffff9e]"
                    />
                    <GrFormNext
                      onClick={handleClearSearch}
                      className="text-[#ffffff9e] text-xl"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="text-[#ffffff66] flex">
              <ul className="flex justify-end items-center gap-3">
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    setSearch(!search);
                  }}
                >
                  <IoSearch />
                </li>
                <li className="cursor-pointer">
                  <FaHeartCirclePlus />
                </li>
                <li className="cursor-pointer">
                  <IoPerson />
                </li>
                <li className="select-none">{formattedTime}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
