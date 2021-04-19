export const saveData = (key: string, data: string) => {
  localStorage.setItem(key, data);
}

export const getData = (key: string) => {
  return localStorage.getItem(key);
}

export const removeData = (key: string) => {
  localStorage.removeItem(key);
}