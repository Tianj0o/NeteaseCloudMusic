export default function useStorage() {
  const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  };
  const deleteStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  const clearStorage = () => {
    localStorage.clear();
  };
  return {
    setStorage,
    getStorage,
    deleteStorage,
    clearStorage,
  };
}
