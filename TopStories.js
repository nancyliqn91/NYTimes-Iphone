import React, { useEffect, useReducer} from 'react';
import blogReducer from './reducers/blog-reducer'
import { getReviewsFailure, getReviewsSuccess } from './actions/index';
import {StyleSheet, View, Text, FlatList, Button,SafeAreaView,Alert } from 'react-native';
import { API_KEY } from './config';
import { TouchableOpacity, Linking } from 'react-native';

const initialState = {
  isLoaded: false,
  reviews: [],
  error: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  fitToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

function TopStories() {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  
  // let link = ``;
  
  // if(buttonPressed1 === 1){
    
  // } else if (buttonPressed2 === 2){

  // }
  
  const linkTopStories = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
  //https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${API_KEY}
  //https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${API_KEY}
  //https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${API_KEY}
  
useEffect(() => {
  fetch(linkTopStories)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      // depends on the response. 
      const action = getReviewsSuccess(jsonifiedResponse.results)
      dispatch(action);
      })
    .catch((error) => {
      const action = getReviewsFailure(error.message)
      dispatch(action);
    });
  }, [])

  const {error, isLoaded, reviews} = state;

  if (error) {
    return <Text>Error!</Text>;
  } else if (!isLoaded) {
    return <Text>...Loading...</Text>;
  } else {
    return (
      <View>
        <Text>Button Below</Text>  
        
          <View style={styles.fitToText}>
            <Button title="Home" color="#93ff00" onPress={() => Alert.alert("button pressed 1")}/>
            <Button title="Art" color="#00ff70" onPress={() => Alert.alert("button pressed 2")}/>
            <Button title="Science" color="#0b92fc" onPress={() => Alert.alert("button pressed 3")}/>
            <Button title="World" color="#500bfc" onPress={() => Alert.alert("button pressed 4")}/>
          </View>
        
        <Text>TopStories</Text>

        <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 20 }}>
            
            <Text>Title: {item.title}</Text>
            <Text>Abstract: {item.abstract}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={{ color: 'blue' }}>URL: {item.url}</Text>
            </TouchableOpacity>
            <Text>Published Date: {item.published_date}</Text>

            <TouchableOpacity onPress={() => Linking.openURL(item.short_url)}>
              <Text style={{ color: 'blue' }}>short_url: {item.short_url}</Text>
            </TouchableOpacity>
                   
          </View>
        )}
      />
      
      </View>
    );
  }

}

export default TopStories;