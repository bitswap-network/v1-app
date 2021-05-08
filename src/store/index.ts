import { getData, removeData } from "helpers/local";
import { atom, selector } from "recoil";
import { validateToken } from "services/auth";

export const userState = atom({
  key: "userState",
  default: JSON.parse(getData("user")),
});

export const loggedInState = selector({
  key: "isLoggedIn",
  get: async ({ get }) => {
    const user = get(userState);
    console.log(user);

    if (user) {
      if (await validateToken(user.token)) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("remove");
      removeData("user");
      return false;
    }
  },
});
