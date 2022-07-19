import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const { payload } = action;
  console.log(state);
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + payload.price * payload.amount;

    const existingItemsIndex = state.items.findIndex(item => {
      return item.id === payload.id;
    });

    const existingItem = state.items[existingItemsIndex];
    let updatedItems;
    if(existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + payload.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingItemsIndex] = updatedItem;

    } else {
      updatedItems = state.items.concat(payload);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
  
  }

  return initialState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
