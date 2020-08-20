import React, { Component } from 'react';
import { View, FlatList,StyleSheet,Text} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/basedUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History(props){
    return(
                <Card
                    title='Our History'
                >
                    <Text>
                        Started in 2010, Ristorante con Fusion quickly established itself as a culinary 
                        icon par excellence in Hong Kong. With its unique brand of world fusion cuisine 
                        that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  
                        Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your 
                        plate the next time you visit us.
                            {'\n'}
                        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                    </Text>
                </Card>
    )
}
class Aboutus extends Component  {
    
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
        const renderLeadersItem = ({item, index}) => {

            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                        />
            );
        };
        return (
            <ScrollView >
                <History />
                <Card 
                    title='Corporate Leadership'
                >
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeadersItem}
                        keyExtractor={item => item.id.toString()}
                        />
                </Card>        
                
            </ScrollView>
         
    );
    }
}
export default connect(mapStateToProps)(Aboutus);