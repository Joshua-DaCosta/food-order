import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isInCheckout, setIsInCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsInCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button
        onClick={() => props.toggleCart()}
        className={classes["button--alt"]}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://reactfooders-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModalContent = (
    <>
      {!isInCheckout && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isInCheckout && (
        <Checkout
          submitOrder={submitOrderHandler}
          closeCart={props.toggleCart}
        />
      )}
      {!isInCheckout && modalActions}
    </>
  );

  const isSubmitingContent = (
    <>
      <p>Sending Order Data...</p>
    </>
  );
  const didSubmitContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button
          onClick={() => props.toggleCart()}
          className={classes.button}
        >
          Close
        </button>
      </div>
    </>
  );


  return (
    <Modal toggleCart={props.toggleCart}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmitingContent}
      {!isSubmiting && didSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
