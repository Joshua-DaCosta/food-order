import classes from "./HeaderCartButton.module.css";
import CartIcon from "../UI/CartIcon";
const HeaderCartButton = (props) => {
  return (
    <button onClick={() => props.toggleCart()} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
