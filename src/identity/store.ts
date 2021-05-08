import { getData, removeData, saveData } from "../helpers/local";
import { atom, selector } from "recoil";

export const setIdentityServiceUsers = (
  users: any,
  publicKeyAdded?: string
) => {
  saveData("identityUsers", JSON.stringify(users));
};

export const identityUsers = atom({
  key: "identityUsers",
  default: JSON.parse(getData("identityUsers")),
});
