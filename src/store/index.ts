import { getData, removeData } from 'helpers/local';
import { atom, selector } from 'recoil';
import { validateToken } from 'services/requests';

export const userState = atom({
  key: 'userState',
  default: JSON.parse(getData("user"))
})

export const loggedInState = selector({
  key: 'isLoggedIn',
  get: async ({get}) => {
    const user = get(userState);
    if (user && await validateToken(user.token)) {
      return true;
    } else {
      removeData("user");
      return false;
    }
  }
});