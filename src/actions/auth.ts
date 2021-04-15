import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  GETLISTINGS_FAIL,
  GETLISTINGS,
  GETPRICE,
  GETPRICEFAIL,
} from "./types";

import MainService from "../services/main.service";

export const register = (
  username: string,
  email: string,
  password: string,
  bitcloutid: string,
  ethAddress: string
) => (dispatch: any) => {
  return MainService.register(
    username,
    email,
    password,
    bitcloutid,
    ethAddress
  ).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username: string, password: string) => (
  dispatch: any
) => {
  return MainService.login(username, password)
    .then((data) => {
      console.log(data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    });
};

export const logout = () => (dispatch: any) => {
  MainService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const getListings = () => (dispatch: any) => {
  return MainService.getListings().then(
    (data) => {
      dispatch({
        type: GETLISTINGS,
        payload: { listings: data },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GETPRICEFAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: "price get failed",
      });

      return Promise.reject();
    }
  );
};

export const getPrice = () => (dispatch: any) => {
  return MainService.priceFeed().then(
    (data: any) => {
      dispatch({
        type: GETPRICE,
        payload: { priceFeed: data },
      });
      return Promise.resolve();
    },
    (error: any) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GETLISTINGS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
