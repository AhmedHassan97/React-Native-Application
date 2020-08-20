import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { Icon } from 'react-native-elements';

class Menu extends Component  {
    constructor(props){
        super(props);
        this.state={
            dishes:DISHES
        }
    }

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
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        // onPress={()=>props.onPress(item.id)}
                        onPress={()=> navigate('Dishdetail',{dishId: item.id})}
                        leftAvatar={{ source: require('./images/uthappizza.png'), containerStyle: {marginBottom: 0}}}
                      />
            );
        };
        return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
    }
}


export default Menu;