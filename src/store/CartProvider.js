import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  const { payload } = action;
  console.log(payload);
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + payload.price * payload.amount;

    const existingItemsIndex = state.items.findIndex((item) => {
      return item.id === payload.id;
    });

    const existingItem = state.items[existingItemsIndex];
    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + payload.amount,
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
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex((item) => {
      return item.id === payload;
    });

    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if(existingItem.amount === 1) {
      updatedItems = state.items.filter(item => {
        return item.id !== payload;
      });
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
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
