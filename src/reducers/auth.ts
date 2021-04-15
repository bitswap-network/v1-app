import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GETLISTINGS_FAIL,
  GETLISTINGS,
  GETPRICEFAIL,
  GETPRICE,
} from "../actions/types";

const user: any = JSON.parse(localStorage.getItem("user") || null);

const feed: any = JSON.parse(localStorage.getItem("listings") || null);
const priceFeed: any = parseInt(localStorage.getItem("priceFeed") || "1");
const initialState = user
  ? { isLoggedIn: true, user, feed, priceFeed }
  : { isLoggedIn: false, user: null, feed: {}, priceFeed: 1 };

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GETPRICEFAIL:
      return {
        ...state,
        priceFeed: 1,
      };
    case GETPRICE:
      return {
        ...state,
        priceFeed: payload.priceFeed,
      };
    case GETLISTINGS:
      return {
        ...state,
        listings: payload.listings,
      };
    case GETLISTINGS_FAIL:
      return {
        ...state,
        listings: {},
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
