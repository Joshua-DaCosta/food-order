import classes from './Cart.Module.css';

const Cart = () => {
      
      const cartItems = <ul className={classes['cart-items']}><li>Sushi</li></ul>;
  return (
    <div>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amoutn</span>
        <span>02.99</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
}

export default Cart