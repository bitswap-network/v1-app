import { getData, removeData, saveData } from "../helpers/local";
import { atom, selector } from "recoil";

export const setIdentityServiceUsers = (
  users: any,
  publicKeyAdded?: string
) => {
  saveData("identityUsers", JSON.stringify(users));
  saveData("publicKey", publicKeyAdded);
};

export const identityUsers = atom({
  key: "identityUsers",
  default: JSON.parse(getData("identityUsers")),
});
export const currentPublicKey = atom({
  key: "publicKey",
  default: getData("publicKey"),
});
