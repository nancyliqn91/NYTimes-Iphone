import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TopStories from './TopStories'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Ny times Top Stories</Text>
      <StatusBar style="auto" /> 
      <TopStories/>   
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


