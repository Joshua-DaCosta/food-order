import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (val) => val.trim() === "";
const isSixChar = (val) => val.trim().length === 6;

const Checkout = (props) => {
  const [formIsValid, setFormIsValid] = useState({
      name: true,
      street: true,
      city: true,
      postal: true
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const nameVal = nameRef.current.value;
    const streetVal = streetRef.current.value;
    const postalVal = postalRef.current.value;
    const cityVal = cityRef.current.value;

    const nameIsValid = !isEmpty(nameVal);
    const streetIsValid = !isEmpty(streetVal);
    const postalIsValid = isSixChar(postalVal);
    const cityIsValid = !isEmpty(cityVal);

    setFormIsValid({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formIsValid.name ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formIsValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formIsValid.street ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formIsValid.street && <p>Please enter a valid street.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formIsValid.postal ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formIsValid.postal && <p>Please enter a valid postal.</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formIsValid.city ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formIsValid.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={() => props.closeCart()}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm Order
        </button>
      </div>
    </form>
  );
};

export default Checkout;
