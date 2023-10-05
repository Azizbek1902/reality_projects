import React from "react";
import { Route, Routes } from "react-router-dom";
// import Home from "../views/shop/Home";
// import Products from "../views/productCrud/Products";
// import GetOne from "../views/shop/GetOne";
// import Cart from "../views/shop/Cart";
// import AddProd from "../views/productCrud/AddProd";
import Students from "../views/ThirdTask/Students";
import Add from "../views/ThirdTask/Students/Add";
import AddClass from "../views/ThirdTask/Classes/Add";
import RoomAdd from "../views/ThirdTask/Rooms/Add";
import Classes from "../views/ThirdTask/Classes";
import Rooms from "../views/ThirdTask/Rooms";
import Teachers from "../views/ThirdTask/Teachers";
import Lessons from "../views/ThirdTask/Lessons";
import TeachersAdd from "../views/ThirdTask/Teachers/Add";
import LessonsAdd from "../views/ThirdTask/Lessons/Add";
import Davomat from "../views/ThirdTask/Davomat";
import Report from "../views/ThirdTask/Report";
import Navbar from "../components/Navbar";

export default () => {
  return (
    <div>
      {/* two project */}
      {/* <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/getOne" element={<GetOne />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AddProd />} />
      </Routes> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/add" element={<Add />} />
        <Route path="/class" element={<Classes />} />
        <Route path="/addClass" element={<AddClass />} />
        <Route path="/roomAdd" element={<RoomAdd />} />
        <Route path="/room" element={<Rooms />} />
        <Route path="/teacher" element={<Teachers />} />
        <Route path="/teacherAdd" element={<TeachersAdd />} />
        <Route path="/lesson" element={<Lessons />} />
        <Route path="/lessonAdd" element={<LessonsAdd />} />
        <Route path="/attendence" element={<Davomat />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </div>
  );
};
