
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TouchableOpacity,SafeAreaView,
  TouchableWithoutFeedback,
  Animated } from 'react-native';
import CompanyOrServiceCenter from './CompanyOrServiceCenter';


export default function App() {
  return (
    <View style={styles.container}>
    <CompanyOrServiceCenter/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#108F94',
  }
});

