import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';



class Contactus extends Component{
    constructor(props){
    super(props);
     
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
    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>        
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
        </Animatable.View>
    )
}
}
    

export default Contactus;