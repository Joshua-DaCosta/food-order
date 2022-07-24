import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState({
    hasError: false,
    message: "",
  });

  const fetchMeals = async () => {
    setHttpError({
      hasError: false,
      message: "",
    });
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://reactfooders-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) {
        throw new Error("Something went wrong.");
      }
      const mealsObj = await res.json();

      let meals = [];
      for (const key in mealsObj) {
        meals.push({
          id: key,
          name: mealsObj[key].name,
          desc: mealsObj[key].desc,
          price: mealsObj[key].price,
        });
      }
      setMeals(meals);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setHttpError({
        hasError: true,
        message: e.message,
      });
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (httpError.hasError) {
    return (
      <section className={classes["meals-error"]}>
        <p>No Meals Recovered.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      desc={meal.desc}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
