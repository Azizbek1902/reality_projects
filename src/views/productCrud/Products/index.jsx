import { MdAddPhotoAlternate } from "react-icons/md";
import { BiMessageAltEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const url = "http://localhost:8080/products";
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteFunk = (item) => {
    axios
      .delete(`${url}/${item.id}`)
      .then()
      .catch((err) => console.log(err));
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const updateFunk = (item) => {
    navigate("/admin", {
      state: item,
    });
  };
  return (
    <div>
      <div className="flex justify-center mt-10">
        <div className="relative xl:w-[90%] md:w-[95%] w-[97%]">
          <button
            onClick={() => {
              navigate("/admin");
            }}
            className="bg-green-500 absolute top-0 right-10 rounded-md px-10 py-2 flex justify-center"
          >
            <MdAddPhotoAlternate color="white" size={25} />
          </button>
          <div className="grid mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
            {data.map((item, index) => {
              return (
                <div key={index + 1}>
                  <div className="productCard rounded-lg">
                    <div className="bg-[#ffffff] rounded-lg">
                      <img
                        src={item.img}
                        onClick={() => {
                          navigate("/getOne", {
                            state: item,
                          });
                        }}
                        alt=""
                        className="rounded-ss-[40px] cursor-pointer rounded-lg  rounded-ee-[40px] w-full h-[250px]"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h1 className="font-serif font-semibold text-2xl">
                          {item.title.length > 10
                            ? item.title.slice(0, 10) + "..."
                            : item.title}
                        </h1>
                        <p className="text-xl font-medium font-sans">
                          {item.price} UZS
                        </p>
                      </div>
                      <h1 className="text-lg font-medium font-sans">
                        {item.desc.length > 16
                          ? item.desc.slice(0, 16) + "..."
                          : item.desc}
                      </h1>
                      <div className="gap-4 items-center rounded-md w-full py-2 flex justify-center">
                        <button
                          onClick={() => deleteFunk(item)}
                          className="bg-red-500 rounded-md w-full py-2 mt-4 flex justify-center"
                        >
                          <AiFillDelete color="white" size={25} />
                        </button>
                        <button
                          onClick={() => updateFunk(item)}
                          className="bg-green-500 rounded-md w-full py-2 mt-4 flex justify-center"
                        >
                          <BiMessageAltEdit color="white" size={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
