import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList ,StyleSheet,Modal,Button,TextInput,Alert,PanResponder} from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import {Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/basedUrl';
import { postFavorite , postComment} from '../redux/ActionCreators';
import StarRating from 'react-native-star-rating';
import { color } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';


  const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (author,comment,rate,dishId) => dispatch(postComment(author,comment,rate,dishId))

})

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                {/* <Text style={{fontSize: 12}}>{item.rating} Stars</Text> */}
                <StarRating
                    containerStyle={{width:18}}
                    starSize={15}
                    disabled={true}
                    maxStars={5}    
                    rating={item.rating}
                    fullStarColor={'orange'}
                    />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <View>
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        </View>

    );
}
function RenderDish(props){
    const dish=props.dish;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > -200 )
            return true;
        else
            return false;
    }
    handleViewRef = ref => this.view = ref;
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                
            {    Alert.alert(
                        'Add Favorite',
                        'Are you sure you wish to add ' + dish.name + ' to favorite?',
                        [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                        ],
                        { cancelable: false }
                    );
                return true;
            }
            else if (recognizeComment(gestureState)) {
                props.toggleModal();
                return true;
            }
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},

    })
    if(dish != null)
    {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            {...panResponder.panHandlers}
            ref={(ref)=>this.handleViewRef(ref)}
            >
            <Card
                featuredTitle={dish.name}
                image={{uri : baseUrl + dish.image }}
            >
                <Text
                    style={{margin: 10}}
                >
                    {dish.description}
                </Text>
                <View style={styles.IconsRow}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.toggleModal()}
                        />
                </View>
                
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {props.showModal}
                    onDismiss = {() => props.toggleModal() }
                    onRequestClose = {() => props.toggleModal() }>
                    <View>
                    <View style={styles.textrow}>
                        <Text style={{fontSize:30,color: 'orange'}}>Rating :</Text><Text style={{fontSize:50, color: 'orange'}}>{props.starCount}</Text><Text style={{color: 'orange',fontSize:30}}>/5</Text>
                    </View>    
                        <View style={styles.starsRow}>
                            <StarRating
                                disabled={false}
                                maxStars={5}    
                                rating={props.starCount}
                                selectedStar={(rating) => props.onStarRatingPress(rating)}
                                fullStarColor={'orange'}
                                />

                        </View>
                        <View style={styles.inputRow}>
                            <Icon
                            raised
                            reverse
                            name='user'
                            type='font-awesome'
                            style={{flex:1}}
                            /> 
                            <TextInput
                                style={{height: 50, borderBottomWidth : 2,
                                flex:1.5
                                ,marginRight:20
                                }}
                                value={props.author}
                                placeholder="Author"
                                onChangeText={(text)=>props.handleAutrhor(text)}
                            />
                        </View>
                        <View style={styles.inputRow}>
                            <Icon
                            raised
                            reverse
                            name='comment'
                            type='font-awesome'
                            style={{flex:1}}
                            /> 
                            <TextInput
                                style={{height: 50, borderBottomWidth : 2,
                                flex:1.5
                                ,marginRight:20
                                }}
                                value={props.comment}
                                placeholder="Comment"
                                onChangeText={(text)=>props.handleComment(text)}
                                // defaultValue={text}
                            />
                            </View>
                                
                        <View style={{margin:15}}>
                            <Button 
                                onPress = {() =>{props.toggleModal(),props.handleSubmit();}}
                                color="#512DA8"
                                title="Submit" 
                                />
                        </View>
                        <View  style={{margin:15}}>        
                            <Button 
                                onPress = {() =>{props.toggleModal()}}
                                color="#808080"
                                title="Cancel" 
                                />
                        </View>
                    </View>    
                </Modal>
            </Card>
        </Animatable.View>

        );
    }
    else{
        return(<View></View>)
        
    }
}


class Dishdetail extends Component{
    constructor(props){
    super(props);
    this.state={
    
        favorites: [],
        showModal:false,
        starCount: 3.5,
        author:'',
        comment:''

    }   
    this.onStarRatingPress = this.onStarRatingPress.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.markFavorite = this.markFavorite.bind(this);
    this.handleAutrhor = this.handleAutrhor.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


}
handleSubmit(dishId){
    this.props.postComment(this.state.author,this.state.comment,this.state.starCount,dishId)
}
handleAutrhor(text){
    this.setState({
        author:text
    })
}
handleComment(text){
    this.setState({
        comment:text
    })
}
onStarRatingPress(rating) {
    this.setState({starCount: rating});

  }
toggleModal() {
    this.setState({showModal: !this.state.showModal});
}
markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

static navigationOptions = {
    title: 'Dish Details',
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }
};

render(){


    const dishId = this.props.navigation.getParam('dishId','');
    return(
        <View>

            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                        favorite={this.props.favorites.some(el => el === dishId)}
                        onPress={() => this.markFavorite(dishId)}
                        toggleModal={() => this.toggleModal()} 
                        showModal={this.state.showModal}
                        onStarRatingPress={this.onStarRatingPress}
                        starCount={this.state.starCount}

                        handleAutrhor={this.handleAutrhor}
                        handleComment={this.handleComment}
                        handleSubmit={()=>this.handleSubmit(dishId)}
                />
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <RenderComments 
                comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </Animatable.View>
        </View>
        )
}
}
const styles = StyleSheet.create({
    textrow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin:15,
    },
    inputRow:{
        flex: 1,
        flexDirection: 'row',
        marginBottom:80

    },
    starsRow:{
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    },
    IconsRow:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin:30
    },
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     },
     cardcontainer: {
        // flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 0,
       }
});
   

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);