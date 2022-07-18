import React, { useReducer } from "react";
import CartContext from "./cart-context";


const initialState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
    const {payload} = action;
  if(action.type === 'ADD_ITEM'){
    const updatedItems = state.items.concat(payload)
    const updatedTotalAmount = state.totalAmount + payload.price * payload.amount
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === 'REMOVE_ITEM') {
      const updatedItems = state.items.filter(item => {
        return !item.id === payload
      });
      const updatedTotalAmount =
        state.totalAmount + payload.price * payload.amount;
  }

  return initialState
}


const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

      const addItemHandler = (item) => {
        dispatchCartAction({type: 'ADD_ITEM', payload: item})
      }
      const removeItemHandler = (id) => {
        dispatchCartAction({ type: "REMOVE_ITEM", payload: id });

      };


const cartContext = {
  items: cartState.items,
  totalAmount: cartState.totalAmount,
  addItem: addItemHandler,
  removeItem: removeItemHandler,
};

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
