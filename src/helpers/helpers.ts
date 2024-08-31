import { productListings } from 'src/data';
import { getItem, setItem } from 'src/utils/AsyncStorage';

// Helper function to initialize localStorage
export const initializeLocalStorage = (key: string) => {
  const existingListingsJSON = getItem(key);
  if (existingListingsJSON) {
    try {
      const existingListings = JSON.parse(existingListingsJSON);
      if (!Array.isArray(existingListings)) {
        setItem(key, JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error parsing existing listings JSON:', error);
      setItem(key, JSON.stringify([]));
    }
  } else {
    setItem(key, JSON.stringify(productListings));
  }
};
