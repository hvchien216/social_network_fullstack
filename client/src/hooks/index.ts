import { useState } from 'react';
function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item: any = window.localStorage.getItem(key);
      return JSON.parse(item);
    } catch (e) {
      console.log(e);
    }
  });
  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.log(e);
    }
  };
  return [storedValue, setValue];
}
export { useLocalStorage };
