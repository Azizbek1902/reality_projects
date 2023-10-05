import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default () => {
  const url = "http://localhost:8080/students";
  const urlAttendance = "http://localhost:8080/attendance";
  const [data, setData] = useState([]);
  const [sendData, setSendData] = useState([]);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setSendData(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/class")
      .then((res) => {
        setClasses(res.data);
        setFilter(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e, elem) {
    sendData.map((item) => {
      if (item.id === elem.id) {
        item.status = e.target.checked;
      }
    });
  }

  const handleSend = () => {
    let newData = sendData.filter((item) => item.classId === filter.name);
    const newStudent = [];
    newData.map((item) => {
      const data = {
        studentId: item.id,
        status: item.status,
      };
      newStudent.push(data);
    });
    const payload = {
      date: moment(new Date()).format("YYYY-MM-DD"),
      students: newStudent,
      studentClass: newData[0].classId,
    };
    axios
      .post(urlAttendance, payload)
      .then()
      .catch((err) => console.log(err));
    window.location.reload(false);
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
        <div className="w-[98%] md:w-[95%] lg:w-[90%] xl:w-[85%]">
          <h1 className="my-10 text-center text-4xl font-serif font-semibold">
            Attendance Table
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
                        <td className="whitespace-nowrap px-6 py-4">
                          <input
                            type="checkbox"
                            onChange={(e) => handleChange(e, item)}
                          />
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-10">
            <button
              onClick={() => handleSend()}
              className="py-2 px-10 rounded-md outline-none bg-sky-400 text-white font-semibold text-xl"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
