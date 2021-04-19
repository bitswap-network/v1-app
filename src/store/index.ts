import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    isLoggedIn: true
  }
})

export const loggedInState = selector({
  key: 'isLoggedIn',
  get: ({get}) => {
    const user = get(userState);
    return user.isLoggedIn
  }
});