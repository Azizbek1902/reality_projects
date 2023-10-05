import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Dropdown from "../../../../components/Dropdown";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddClasses() {
  const url = "http://localhost:8080/class";
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState({ type: false, id: null });
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      roomId: {},
    },
    onSubmit: (values) => {
      if (isEdit.type) {
        const payload = {
          name: values.name,
          roomId: values.roomId.name,
        };
        axios
          .put(`${url}/${isEdit.id}`, payload)
          .then()
          .catch((err) => console.log(err));
      } else {
        const payload = {
          id: new Date(),
          name: values.name,
          roomId: values.roomId.name,
        };
        axios
          .post(url, payload)
          .then()
          .catch((err) => console.log(err));
      }
      setIsEdit({ type: false, id: null });
      formik.resetForm();
      navigate("/class");
    },
  });
  useEffect(() => {
    if (state) {
      formik.setValues({
        name: state.name,
        roomId: state.roomId,
      });
      setIsEdit({ type: true, id: state.id });
    }
    axios
      .get("http://localhost:8080/room")
      .then((res) => setRooms(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="w-[95%] md:w-[90%] xl:w-[80%]">
          <div className="flex justify-center w-full items-center h-[80vh]">
            <div className="shadowCard min-w-[350px] max-w-[600px] rounded-md p-10">
              <h1 className="mb-5 text-3xl font-semibold text-center">
                Create Room
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name" className="text-base pl-4 pb-3">
                  Class Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Class Name"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <label htmlFor="roomId" className="text-base pl-4 pb-3">
                  Room Name
                </label>
                <Dropdown
                  id="roomId"
                  className="block border-2 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  name="roomId"
                  value={formik.values.roomId}
                  options={rooms}
                  padding="13px 20px"
                  width="100%"
                  placeholder="Room"
                  handleItem={(item) => formik.setFieldValue("roomId", item)}
                  arrow
                />
                <button
                  className="mt-5 text-white font-semibold text-lg bg-blue-500 rounded-md py-2 w-full"
                  type="submit"
                >
                  {isEdit.type ? "Edit" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
