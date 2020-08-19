import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';



class Contactus extends Component{
    constructor(props){
    super(props);
     
}
static navigationOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#512DA8',
    headerTitleStyle: {
        color: "#512DA8"            
    }
};
render(){
    return(
        <Card
        title='Contact Information'
        >
            <Text>
                121, Clear Water Bay Road
            </Text>
            <Text>{'\n'}</Text>
            <Text>
                Clear Water Bay, Kowloon
            </Text>
            <Text>{'\n'}</Text>
            <Text>
                HONG KONG
            </Text>
            <Text>{'\n'}</Text>
            <Text>
                Tel: +852 1234 5678
            </Text>
            <Text>{'\n'}</Text>
            <Text>
                Fax: +852 8765 4321
            </Text>
            <Text>{'\n'}</Text>
            <Text>
                Email:confusion@food.net
            </Text>
        </Card>
    )
}
}
    

export default Contactus;