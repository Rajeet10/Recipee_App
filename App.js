import React,{useState} from 'react';
import {Text, View } from 'react-native';
import * as Font from 'expo-font';
import  AppLoading from 'expo-app-loading';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens} from 'react-native-screens';
import {createStore,combineReducers} from 'redux';
import MealsReducer from './store/reducers/Meals';
import {Provider} from 'react-redux';

enableScreens();
const rootReducer=combineReducers({
meals:MealsReducer
});

const store=createStore(rootReducer);


const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
const [fontloaded, setFontloaded] = useState(false);

if(!fontloaded){
  return (<AppLoading 
  startAsync={fetchFonts}
  onError={(err)=>console.log(err)} 
  onFinish={()=>setFontloaded(true)}/>
  );
}

  return (
  <Provider store={store}
  ><MealsNavigator/>
  </Provider>
  );
}



