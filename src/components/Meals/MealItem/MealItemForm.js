import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = ({id, addToCart}) => {

const [isValid, setIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredAmountNum = +enteredAmount;

    if(enteredAmount.trim().length === 0 ||
     enteredAmountNum === 0) {
      setIsValid(false);
      return;
    }

    addToCart(enteredAmountNum);

  }
  const amountRef = useRef();
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
      ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!isValid && <p>Please enter a vaild amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
