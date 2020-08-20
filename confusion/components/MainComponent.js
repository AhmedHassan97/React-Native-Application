import React, {Component} from 'react';
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import Dishdetail from './DishdetailComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, SafeAreaView} from 'react-navigation';
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import Home from './HomeComponent';
import Aboutus from './AboutusComponent'

import Contactus from './ContactusComponent'; 
import { Icon } from 'react-native-elements';



class Main extends Component{
    constructor(props) {
        super (props);
        this.state={
            dishes: DISHES
        }
    }
 
    render(){
    const CustomDrawerContentComponent = (props) => (
        <ScrollView>
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
        );
    const MenuNavigator = createStackNavigator({
            Menu: { screen: Menu },
            Dishdetail: { screen: Dishdetail }
        }
    );
    const HomeNavigator = createStackNavigator({
        Home: { screen: Home }
      }, {
        
    });
    const AboutusNavigator = createStackNavigator({
        Aboutus: { screen: Aboutus }
      });
    const ContactusNavigator = createStackNavigator({
        Contact: { screen: Contactus }
      });
    const MainNavigator = createDrawerNavigator({
        Home: 
          { screen: HomeNavigator,
            navigationOptions: {
              title: 'Home',
              drawerLabel: 'Home',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='home'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
            }
          },
          Aboutus: 
          { screen: AboutusNavigator,
            navigationOptions: {
              title: 'About Us',
              drawerLabel: 'About Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
            }
          },
        Menu: 
          { screen: MenuNavigator,
            navigationOptions: {
              title: 'Menu',
              drawerLabel: 'Menu',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='list'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
            }, 
          },
        Contact: 
          { screen: ContactusNavigator,
            navigationOptions: {
              title: 'Contact Us',
              drawerLabel: 'Contact Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='address-card'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
            }
          }
    }, {
      drawerBackgroundColor: '#D1C4E9',
      contentComponent: CustomDrawerContentComponent

    });
    const App = createAppContainer(MainNavigator);

        return(
        <View style={{flex : 1 , paddingTop : Platform.OS === 'ios' ? 0 :0}}>
            <App />
        </View>
        
        );
    }
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
export default Main;