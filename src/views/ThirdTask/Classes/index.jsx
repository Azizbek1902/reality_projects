import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default () => {
  const url = "http://localhost:8080/class";
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
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
    <div>
      <div className="flex w-full justify-center relative">
        <button
          className="absolute top-10 right-10 bg-green-400 py-2 px-5 rounded-md"
          onClick={() => {
            navigate("/addClass");
          }}
        >
          <BiAddToQueue size={30} color="white" />
        </button>
        <div className="w-[98%] md:w-[95%] lg:w-[90%] xl:w-[85%]">
          <h1 className="my-10 text-center text-4xl font-serif font-semibold">
            Classes Table
          </h1>
          <div className="flex justify-center w-full items-start">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.roomId}
                      </td>{" "}
                      <td className="whitespace-nowrap flex gap-4 items-center px-6 py-4">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 py-2 px-5 rounded-md"
                        >
                          <MdOutlineDeleteOutline size={27} color="white" />
                        </button>
                        <button
                          onClick={() => {
                            navigate("/addClass", { state: item });
                          }}
                          className="bg-blue-500 py-2 px-5 rounded-md"
                        >
                          <CiEdit size={27} color="white" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
