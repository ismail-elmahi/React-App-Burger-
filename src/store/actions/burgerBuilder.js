import * as actionType from './actionType';
import axios from '../../axios-order';

export const addIngredient = (name) => {
return {
    type:actionType.ADD_INGREDIENT,
    ingredientName: name
   }; 
};


export const removeIngredient = (name) => {
    return {
        type:actionType.REMOVE_INGREDIENT,
        ingredientName: name
       }; 
    };


    export const setIngredients = (ingredients) =>  {
       return {
           type: actionType.SET_INGREDIENTS,
           ingredients: ingredients
       };
    };

export const fetechIngredientsFailed = () => {
    return {
        type: actionType.FETECH_INGREDIENTS_FAILED
    }
}

    export const initIngredients = () =>  {
        return dispatch => {
     axios.get('https://burger-app-cbb2d.firebaseio.com/ingredients.json')
    .then(response => {
        dispatch(setIngredients(response.data));
    })
    .catch( erroe => {
        dispatch(fetechIngredientsFailed());
    } ); 
        }
    }