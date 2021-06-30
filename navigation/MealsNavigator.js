import React from 'react';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import {Ionicons} from'@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FiltersScreen from '../screens/FiltersScreen';


const defaultStackNavOptions={
    headerStyle:{
     backgroundColor:Platform.OS==='android' ? Colors.primaryColor:''
    },
    headerTintColor:Platform.OS==='android'?'black':Colors.primaryColor,
    };

const MealsNavigator=createStackNavigator({
    Categories:{
        screen:CategoriesScreen,
       navigationOptions:{
        headerTitle:'Meal Categories',
       }
    },
    CategoryMeals:{
        screen:CategoryMealsScreen,
        }, 
    MealDetail:MealDetailScreen

},{
    
    defaultNavigationOptions:defaultStackNavOptions,
});

const FavNavigator=createStackNavigator({
    Favorites:FavoritesScreen,
    MealDetail:MealDetailScreen
},{
    defaultNavigationOptions:defaultStackNavOptions,
});


const tabScreenConfig={
    Meals:{
        screen:MealsNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (
                <Ionicons 
                name="ios-restaurant"
                size={25}
                color={tabInfo.tintColor}
                />
                );
            },
            tabBarColor:Colors.primaryColor
        }
    },
    Favorites:{
        screen:FavNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return <Ionicons 
                name="ios-star"
                size={25}
                color={tabInfo.tintColor}
                />
            }, 
            tabBarColor:Colors.accentColor
        }
      
    },
  
}
const MealsFavTabNavigator=Platform.OS==="android"
? createMaterialBottomTabNavigator(tabScreenConfig,{
    activeTintColor:'white',
    shifting:true,
    // barStyle:{
    //     backgroundColor:Colors.accentColor //for shifting:false
    // }
})
: createBottomTabNavigator(tabScreenConfig,{
    tabBarOptions:{
        activeTintColor:Colors.accentColor
    }
});

const FiltersNavigator=createStackNavigator({
    Filter:FiltersScreen
});


;


export default createAppContainer(MealsFavTabNavigator);