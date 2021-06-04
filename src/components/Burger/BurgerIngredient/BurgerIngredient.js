import classes from './BurgerIngredient.module.css'
import PropTypes from 'prop-types';

export const INGREDIENTS = Object.freeze({
  BreadTop: 'bread-top',
  BreadBottom: 'bread-bottom',
  Meat: 'meat',
  Cheese: 'cheese',
  Bacon: 'bacon',
  Salad: 'salad'
});

const BurgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case INGREDIENTS.BreadTop:
      ingredient = <div className={classes.BreadTop}>
        <div className={classes.Seeds1}></div>
        <div className={classes.Seeds2}></div>
      </div>;
      break;
    case INGREDIENTS.BreadBottom:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case INGREDIENTS.Meat:
      ingredient = <div className={classes.Meat}></div>;
      break;
    case INGREDIENTS.Cheese:
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case INGREDIENTS.Bacon:
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case INGREDIENTS.Salad:
      ingredient = <div className={classes.Salad}></div>;
      break;
    default:
      ingredient = null;
      break;
  }
  return ingredient;
};
// BurgerIngredient.INGREDIENTS = INGREDIENTS;
BurgerIngredient.propTypes = {
  type: PropTypes.oneOf(Object.values(INGREDIENTS)).isRequired
};

export default BurgerIngredient;