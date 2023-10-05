import { BiChevronDown } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";

export default ({
  handleItem,
  value,
  disabled,
  placeholder,
  options,
  arrow,
  className,
  border,
}) => {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeRef, open]);

  const dropdownClick = () => {
    if (!disabled) {
      setOpen(!open);
    }
  };

  return (
    <div className="relative" ref={closeRef}>
      <div
        onClick={() => dropdownClick()}
        className={`flex justify-between  border-2 px-4 ${className} py-3 border-[${border}] ${
          options?.length ? "cursor-pointer" : "cursor-not-allowed"
        } ${open ? "rounded-t-md" : "rounded-md"}`}
      >
        <h1>{value?.name || placeholder}</h1>

        {arrow ? <BiChevronDown size={33} color="#43569A" /> : <></>}
      </div>
      <ul
        className={`  ${
          open
            ? "block border-b-2 absolute max-h-36 overflow-y-auto overflow-hidden z-50 w-full bg-white border-r-2 rounded-b-md border-l-2 border-[#dde2f3]"
            : "hidden"
        } `}
      >
        {options ? (
          options.map((item, index) => (
            <li
              key={index + 1}
              className="list-none px-4 py-3 hover:text-[#525762]  cursor-pointer  hover:bg-[#C2D0F5]"
              onClick={() => {
                handleItem(item);
                setOpen(false);
              }}
            >
              {item.name}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};
