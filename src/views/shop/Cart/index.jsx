import React from "react";
import { useCart } from "react-use-cart";

export default () => {
  const {
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[95%] mt-20 md:w-[90%] xl:w-[80%]">
          <section className="py-4 w-full">
            <div className="row justify-center">
              <div className="col-12">
                <h5>
                  Cart ({totalUniqueItems}) total Items: ({totalItems})
                </h5>
                <br />
                <table className="table-auto m-0">
                  <tbody>
                    <tr>
                      <td style={{ padding: "0px 100px 0px 10px" }}>
                        <b>Product</b>
                      </td>
                      <td style={{ padding: "0px 100px 0px 10px" }}>
                        <b>Name</b>
                      </td>
                      <td style={{ padding: "0px 50px 0px 0px" }}>
                        <b>Price</b>
                      </td>
                      <td style={{ padding: "0px 50px 0px 0px" }}>
                        <b>Quantuty</b>
                      </td>
                    </tr>
                    {items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.img}
                              style={{ height: "6rem" }}
                              alt=""
                            />
                          </td>
                          <td>{item.title}</td>
                          <td>{item.price}</td>
                          <td> {item.quantity}</td>
                          <td>
                            <button
                              style={{ border: "2px solid red" }}
                              className="px-4 rounded-md py-2 ms-2"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            >
                              –
                            </button>
                            <button
                              style={{ border: "2px solid #fcba03" }}
                              className="px-4 rounded-md py-2 ms-2"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                            <button
                              className="px-6 py-2 rounded-md bg-red-400 text-white font-medium ms-2"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove Item
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <hr />
              <br />
              <div className="col-auto ms-auto">
                <h3>Total Price: Rs. {cartTotal}</h3>
              </div>
              <div className="col-auto ms-auto">
                <button
                  className="px-6 py-2 rounded-md bg-red-400 text-white font-medium m-2"
                  onClick={() => emptyCart()}
                >
                  Clear Cart
                </button>
                <button className="px-6 py-2 rounded-md bg-green-400 text-white font-medium m-2">
                  Pay Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
