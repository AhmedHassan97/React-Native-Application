import React, {Component} from 'react';
import { View, Text } from 'react-native';


class Home extends Component {
    constructor(props){
        super(props);
        }
        static navigationOptions = {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff" 
        };
        render()
        {
            return(
                <View>
                    <Text>
                        Home Component
                    </Text>
                </View>
            )
        }
}
export default Home;