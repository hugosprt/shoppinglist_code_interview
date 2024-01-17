import React, { useState, useEffect } from 'react';
import { getFruitsList, getFruitDetails } from './api';
import './App.css'; 

function ShoppingList() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    async function loadFruits() {
      try {
        const listData = await getFruitsList();
        const fruitsWithDetails = await Promise.all(listData.fruits.map(async (fruit) => {
          const details = await getFruitDetails(fruit.id);
          return { ...fruit, details }; 
        }));

        setFruits(fruitsWithDetails);
      } catch (error) {
        console.error("Error loading", error);
      } finally {
        setLoading(false);
      }
    }

    loadFruits();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const addToCart = (item) => {
	setCart(currentCart => {
	  const isItemInCart = currentCart.find(cartItem => cartItem.id === item.id);
	  if (!isItemInCart) {
		return [...currentCart, item];
	  }
	  return [...currentCart, item];
	});
}

const removeFromCart = (itemId) => {
	setCart(currentCart => {
	  const cartCopy = [...currentCart];
	  const foundIndex = cartCopy.findIndex(item => item.id === itemId);
	  if (cartCopy[foundIndex].quantity > 1) {
		cartCopy[foundIndex].quantity--;
	  } else {
		cartCopy.splice(foundIndex, 1);
	  }
	  return cartCopy;
	});
  };
  const groupedItems = cart.reduce((acc, item) => {
	const found = acc.find(i => i.id === item.id);
	if (found) {
	  found.quantity++;
	} else {
	  acc.push({ ...item, quantity: 1 });
	}
	return acc;
  }, 
  []);
  
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);


  return (
    <div>
      <h1>Liste de Courses</h1>
      <div style={{flexDirection:'column', display:'flex'}}>
        {fruits.map((fruit) => (
          <div style={{flexDirection: 'row', display:'flex'}}>
            {fruit.fruit} - {fruit.price} €
            <img src={fruit.details.product.image_url} alt={fruit.fruit} className="image-size" />
            <button onClick={() => addToCart(fruit)}>Ajouter au Panier</button>
          </div>
        ))}
      </div>
	  <div>
	  <h2>Panier - Total : {totalPrice.toFixed(2)} €</h2>  <ul>
   		 {groupedItems.map((item) => (
     		 <li key={item.id}>
       			 {item.quantity} x {item.fruit} - {item.price} €
 			       <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
   			   </li>
  			  ))}
 			 </ul>
		</div>
    </div>
  );
}

export default ShoppingList;
