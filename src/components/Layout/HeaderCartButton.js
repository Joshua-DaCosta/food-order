import classes from "./HeaderCartButton.module.css";
import CartIcon from "../UI/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const cartAmount = cartCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0)
  return (
    <button onClick={() => props.toggleCart()} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
