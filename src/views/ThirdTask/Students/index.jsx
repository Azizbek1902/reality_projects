import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default () => {
  const url = "http://localhost:8080/students";
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/class")
      .then((res) => {
        setClasses(res.data);
        setFilter(res.data[0]);
      })
      .catch((err) => console.log(err));
    setDeleted(true);
  }, [deleted]);
  const handleDelete = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        setDeleted(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="grid grid-cols-12">
      <div className="bg-white shadowCard border-r-2 flex justify-center items-center col-span-2 w-full min-h-[91vh] max-h-full">
        <div className="max-h-[500px] overflow-y-auto">
          <h1 className="text-4xl block pb-7 text-[#1F2937] font-semibold font-serif">
            Classes
          </h1>
          {classes.map((item, ind) => {
            return (
              <div
                onClick={() => {
                  setFilter(item);
                }}
                key={ind + 1}
                className="active:bg-[#1F2937] tranasition active:sidebar text-[#1F2937] hover:text-white active:text-white border-2 hover:bg-[#1F2937] cursor-pointer border-[#1F2937] w-full mb-4 py-3 pl-4 rounded-md"
              >
                <p className="block  font-medium font-sans text-xl">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center col-span-10 relative">
        <button
          className="absolute top-10 right-10 bg-green-400 py-2 px-5 rounded-md"
          onClick={() => {
            navigate("/add");
          }}
        >
          <BiAddToQueue size={30} color="white" />
        </button>
        <div className="w-[98%] md:w-[95%] lg:w-[90%] xl:w-[85%]">
          <h1 className="my-10 text-center text-4xl font-serif font-semibold">
            Students Table
          </h1>
          <div className="flex justify-center w-full items-start">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Sinf
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  if (item?.classId === filter?.name) {
                    return (
                      <tr
                        key={item.id}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.firstName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.lastName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.address}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.phone}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item?.classId}
                        </td>
                        <td className="whitespace-nowrap flex gap-4 items-center px-6 py-4">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 py-2 px-5 rounded-md"
                          >
                            <MdOutlineDeleteOutline size={27} color="white" />
                          </button>
                          <button
                            onClick={() => {
                              navigate("/add", { state: item });
                            }}
                            className="bg-blue-500 py-2 px-5 rounded-md"
                          >
                            <CiEdit size={27} color="white" />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
