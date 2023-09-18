import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "../actionTypes";

const initialState = {
  products: [],
  isLoading: false,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };
    case UPDATE_PRODUCT: {
      let index = state.products.findIndex((item) => item.id == payload.id);
      const newValues = state.products;
      newValues[index] = payload;
      return {
        ...state,
        PRODUCTs: newValues,
      };
    }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload),
      };
    default:
      return state;
  }
};
export default productReducer;
