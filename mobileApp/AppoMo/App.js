import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Log into Appomo</Text>
      </View>
      <View styles={styles.inputtext}>
        <TextInput placeholder="Username" />
      </View>
      <View styles={styles.inputtext}>
        <TextInput placeholder="Password" />
      </View>

      <Button title='Submit' />
    </View>






  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    backgroundColor: "#108F94"

  },
  title: {
    color: "white",
    fontSize: 40,
    marginTop: 80,
    marginBottom: 30
  },

  inputtext: {
    borderColor: 'blue',
    padding: 20,
    marginBottom: 300,
  }

  




});
