import {
  UPDATE_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
} from "../actionTypes";

export const getProduct = () => {
  return {
    type: GET_PRODUCT,
  };
};

export const addProduct = (payload) => {
  return {
    type: ADD_PRODUCT,
    payload,
  };
};

export const deleteProduct = (payload) => {
  return {
    type: DELETE_PRODUCT,
    payload,
  };
};

export const updateProduct = (payload) => {
  return {
    type: UPDATE_PRODUCT,
    payload,
  };
};
