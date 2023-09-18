import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const url = "http://localhost:8080/products";
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState({ type: false, id: null });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      img: "",
      price: 0,
      quantity: 0,
    },
    onSubmit: (values) => {
      if (isEdit.type) {
        const payload = {
          title: values.title,
          desc: values.desc,
          img:
            values.img == ""
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJmqgtM5Nt7XB3s4NgyJXA07s_poFxrss-A&usqp=CAU"
              : values.img,
          price: values.price,
          quantity: values.quantity,
        };
        axios
          .put(`${url}/${isEdit.id}`, payload)
          .then()
          .catch((err) => console.log(err));
      } else {
        const payload = {
          id: new Date(),
          title: values.title,
          desc: values.desc,
          img:
            values.img == ""
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfJmqgtM5Nt7XB3s4NgyJXA07s_poFxrss-A&usqp=CAU"
              : values.img,
          price: values.price,
        };
        axios
          .post(url, payload)
          .then()
          .catch((err) => console.log(err));
      }
      navigate("/products");
      formik.resetForm();
    },
  });
  useEffect(() => {
    if (state) {
      setIsEdit({ type: true, id: state.id });
      formik.setValues({
        title: state.title,
        desc: state.desc,
        img: state.img,
        price: state.price,
      });
    }
  }, []);
  return (
    <div>
      <div className="flex justify-center items-center w-full h-[90vh]">
        <div className="addProd max-w-[800px] min-w-[350px] rounded-lg p-10">
          <h1 className="text-center text-2xl font-semibold font-serif mb-6">
            Mahsulot qo'shish
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="title"
              className="block rounded-md mb-5 pl-4 outline-none mt-1 border-2 h-10 border-gray-400 w-full"
              name="title"
              placeholder="Nomi"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <input
              id="img"
              className="block rounded-md mb-5 pl-4 outline-none mt-1 border-2 h-10 border-gray-400 w-full"
              name="img"
              placeholder="Image url"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.img}
            />
            <textarea
              id="desc"
              className="block rounded-md pt-1 mb-5 pl-4 outline-none mt-1 border-2 h-10 border-gray-400 w-full"
              name="desc"
              placeholder="Haqida"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.desc}
            ></textarea>
            <input
              id="price"
              className="block rounded-md mb-5 pl-4 outline-none mt-1 border-2 h-10 border-gray-400 w-full"
              name="price"
              placeholder="Narxi"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <button
              className="w-full mt-5 text-center bg-green-500 py-2 text-white font-semibold text-xl rounded-md hover:bg-green-600"
              type="submit"
            >
              {isEdit.type ? "O'zgartirish" : "Qo'shish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
