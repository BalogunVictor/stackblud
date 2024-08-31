export const setItem = (key: string, value: string) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.log('Error Storing Value >>', error);
  }
};

export const getItem = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch (error) {
    console.log('Error Getting Item >>', error);
  }
  return null;
};

export const removeItem = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.log('Error Removing Item >>', error);
  }
};
