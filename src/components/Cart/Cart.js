import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
      
      const cartItems = <ul className={classes['cart-items']}><li>Sushi</li></ul>;
  return (
    <Modal toggleCart={props.toggleCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amoutn</span>
        <span>02.99</span>
      </div>
      <div className={classes.actions}>
        <button onClick={() => props.toggleCart()} className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart