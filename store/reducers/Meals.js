import {MEALS} from '../../data/dummy-data';
import { TOGGLE_Favorite,SET_FILTERS } from '../actions/Meals';

const initialState={
    meals:MEALS,
    filteredMeals:MEALS,
    favoriteMeals:[]
}

const MealsReducer=(state=initialState,action)=>{
    switch(action.type){
        case TOGGLE_Favorite:
            const existingIndex=state.favoriteMeals.findIndex(meal=>meal.id===action.mealId);
            if(existingIndex>=0){
                const updatedFavMeals=[...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex,1);
                return {
                    ...state,
                    favoriteMeals:updatedFavMeals
                };
            }else{
                const meal=state.meals.find(meal=>meal.id===action.mealId);
                return {
                    ...state,
                    favoriteMeals:state.favoriteMeals.concat(meal)
                };
            }
        case SET_FILTERS:
            const appliedFilters=action.filters;
            const updatedfilteredMeals=state.meals.filter(meal=>{
                if(appliedFilters.glutenFree && !meal.isGlutenFree){
                    return false;
                }
                if(appliedFilters.lactoseFree && !meal.isLactoseFree){
                    return false;
                }
                if(appliedFilters.Vegetarian && !meal.isVegetarian){
                    return false;
                }
                if(appliedFilters.vegan && !meal.isVegan){
                    return false;
                }
                return true;
            });
            return {...state,filteredMeals:updatedfilteredMeals}
        default:
            return state;
    }
    
}


export default MealsReducer;