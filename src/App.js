import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

const [isCartVisable, setIsCartVisable] = useState(false);

const toggleCart = () => {
  setIsCartVisable(!isCartVisable ? true : false);
}

  return (
    <CartProvider>
      {isCartVisable && <Cart toggleCart={toggleCart} />}
      <Header toggleCart={toggleCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
