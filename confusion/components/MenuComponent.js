import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { Icon } from 'react-native-elements';
import { Tile } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/basedUrl';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
    }
  }
class Menu extends Component  {
   

    static navigationOptions = ({navigation})=>({
        headerStyle: {  
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: () =>  <Icon 
        name="menu"
        color='white'
        onPress={()=> navigation.toggleDrawer()}/>
    
    });
    render(){
        const renderMenuItem = ({item, index}) => {
        const { navigate } = this.props.navigation;
        

            return (
                <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{ uri: baseUrl + item.image}}
                />
            );
        };
        return (
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
    }
}


export default connect(mapStateToProps)(Menu);