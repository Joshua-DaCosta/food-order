import classes from "./HeaderCartButton.module.css";
import CartIcon from "../UI/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const cartAmount = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  const [amountChanged, setAmountChanged] = useState(false);

  const btnClasses = `${classes.button} ${amountChanged ? classes.bump : ""}`;


  useEffect(() => {
    if (items.length === 0) return;
    setAmountChanged(true);

    const id = setTimeout(() => {
    setAmountChanged(false);
    }, 300);

    return () => {
      clearTimeout(id);
    }

  }, [items]);

  return (
    <button onClick={() => props.toggleCart()} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
