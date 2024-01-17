import axios from 'axios';

export const getFruitsList = async () => {
  try {
    const response = await axios.get('https://mocki.io/v1/6f410033-0722-45a6-9625-99a20dfe2b2c');
    return response.data;
  } catch (error) {
    console.error('Erreur fruit list api', error);
    throw error;
  }
};

export const getFruitDetails = async (fruitId) => {
	try {
	  const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${fruitId}.json`);
	  return response.data; 
	} catch (error) {
	  console.error(`Erreur api detail ${fruitId}`, error);
	  throw error;
	}
  };
  