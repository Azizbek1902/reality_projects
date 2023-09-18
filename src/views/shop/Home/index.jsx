import { MdAddShoppingCart } from "react-icons/md";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

export default () => {
  const url = "http://localhost:8080/products";
  const { addItem } = useCart();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleAdd = (data) => {
    addItem(data);
  };
  return (
    <div>
      <div className="flex justify-center mt-24">
        <div className="xl:w-[90%] md:w-[95%] w-[97%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14">
            {data.map((item, index) => {
              return (
                <div key={index + 1}>
                  <div className="productCard rounded-lg">
                    <div className="bg-[#ffffff] rounded-lg">
                      <img
                        src={item.img}
                        alt=""
                        className="rounded-ss-[40px] rounded-lg  rounded-ee-[40px] w-full h-[250px]"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center">
                        <h1 className="font-serif font-semibold text-2xl">
                          {item.title.length > 10
                            ? item.title.slice(0, 10)
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
                      <button
                        onClick={() => handleAdd(item)}
                        className="bg-green-500 rounded-md w-full py-2 mt-4 flex justify-center"
                      >
                        <MdAddShoppingCart size={28} color="white" />
                      </button>
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
