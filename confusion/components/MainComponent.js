import React, {Component} from 'react';
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Home from './HomeComponent';
import { Icon } from 'react-native-elements';



class Main extends Component{
    constructor(props) {
        super (props);
        this.state={
            dishes: DISHES
        }
    }
 
    render(){
    const MenuNavigator = createStackNavigator({
            Menu: { screen: Menu },
            Dishdetail: { screen: Dishdetail }
        }
    );
    const HomeNavigator = createStackNavigator({
        Home: { screen: Home }
      }, {
        
    });
    const MainNavigator = createDrawerNavigator({
        Home: 
          { screen: HomeNavigator,
            navigationOptions: {
              title: 'Home',
              drawerLabel: 'Home'
            }
          },
        Menu: 
          { screen: MenuNavigator,
            navigationOptions: {
              title: 'Menu',
              drawerLabel: 'Menu'
            }, 
          }
    }, {
      drawerBackgroundColor: '#D1C4E9'
    });
    const App = createAppContainer(MainNavigator);

        return(
        <View style={{flex : 1 , paddingTop : Platform.OS === 'ios' ? 0 :0}}>
            <App />
        </View>
        
        );
    }
}
export default Main;