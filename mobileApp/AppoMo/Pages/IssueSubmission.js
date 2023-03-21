import React from 'react';
import {View,StyleSheet,Platform,StatusBar, ScrollView} from 'react-native';
import { Card, Button,Text,TextInput,IconButton,Dialog, Paragraph, Portal,colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const MAX_HEIGHT = 500;

export default function IssueSubmission() {
  const [name, setTextname] = React.useState("");
  const [contactNo,setTextcontactNo] = React.useState("");
  const [invoice,setTextinvoice] = React.useState("");
  const [product,setTextproduct] = React.useState("");
  const [issue,setTextissue] = React.useState("");

  const [error, setError] = React.useState('');  // set restriction to add only 10 numbers to contact number.
  const handleInputChange = (text) => {
    if (/^\d{0,10}$/.test(text)) {
      setTextcontactNo(text);
      setError('');
    } else {
      setError('Invalid contact Number.');
    }
  };

  const handleMicPress = () => {  //voice message button handle
    console.log('Mic button pressed');
  };
  const [disableSubmit, setDisableSubmit] = React.useState(true); // disable the submit button at begining.
  const checkInputs = () => {
    if (name && contactNo && invoice && product && issue) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };


  const handleSubmit = () => {
    console.log('Submit button pressed');
    //below 5 lineshelps to  clear all inputs when touch the submit button.
    setTextname('');
    setTextcontactNo('');
    setTextinvoice('');
    setTextproduct('');
    setTextissue(''); 
    setVisible(true);
    setDisableSubmit(true); // disable submit button after form submission
    checkInputs(); // check input fields after form submission
  };
  React.useEffect(() => {
    checkInputs();
  }, [name, contactNo, invoice, product, issue]);
  const [visible, setVisible] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [scrollEnabled, setScrollEnabled] = React.useState(true);

  React.useEffect(() => {
    if (contentHeight >= MAX_HEIGHT) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  }, [contentHeight]);

  
    return (
      <>
      <StatusBar backgroundColor="#108F94"  translucent={true} />
      <KeyboardAwareScrollView
        style={styles.view}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="always"
      >
      <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
 
       

        <View>
        <Text variant="headlineLarge" styles={StyleSheet.title}>Let us know what's wrong</Text>
        </View>
        

        <View >
          <Card styles={StyleSheet.card}>
          <Card.Content styles={StyleSheet.cardContent}>
            <Card.Actions>
            <ScrollView>

              <View>
              <Text variant="bodyLarge">Name</Text>
              <TextInput type="outlined" value={name} onChangeText={text => setTextname(text)} style={styles.input} />
              </View>

              <View>
              <Text variant="bodyLarge">Contact No</Text>
              <TextInput type="outlined"  value={contactNo} onChangeText={text => handleInputChange(text)}keyboardType="numeric" style={styles.input}/> 
              {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
              </View> 
            

              <View>
              <Text variant="bodyLarge">Invoice No</Text>
              <TextInput type="outlined"  value={invoice} onChangeText={text => setTextinvoice(text)} styles={StyleSheet.textbox} />
              </View>

              <View>
              <Text variant="bodyLarge">Product</Text>
              <TextInput type="outlined"  value={product} onChangeText={text => setTextproduct(text)} styles={StyleSheet.textbox}/>
              </View>

              <View>
              <Text variant="bodyLarge">Issue in brief</Text>
              <TextInput type="outlined"  value={issue} onChangeText={text => setTextissue(text)} styles={StyleSheet.textbox} />
              </View>

              <View>
              <Text variant="bodyLarge">Feel free to explain your issue</Text>
              <Text variant="bodyMedium">*Leave a voice message</Text>
              <IconButton icon={() => <Icon name="microphone" size={30} color="#fff" />} onPress={handleMicPress} style={{ backgroundColor: '#388F82' }}/>
              </View>

              <View>
              <Button mode="contained" onPress={handleSubmit} style={{backgroundColor: disableSubmit ? "#ccc" : '#388F82',}}disabled={disableSubmit}>
                Submit
              </Button>
              <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                  
                  <Dialog.Content>
                    <Paragraph>Please wait till we looking to your issue.</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={() => setVisible(false)}>Ok</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
              </View>





            </ScrollView>
               
          </Card.Actions>
          </Card.Content>
        </Card>
       
        
      </View>
        

    </View>
    </KeyboardAwareScrollView>
   
    </>
    
      
    );
}
const styles = StyleSheet.create({
  container:{
    flex:200,
    alignItems:'center',
    justifyContent: 'space-between',
  },
  title:{
    padding: 10,
    marginTop:20,
    marginBottom:20,
    alignItems:'center',
    justifyContent: 'space-between',
  },
  card:{
    padding:20,
    width:70,
    
  },
  view:{
    flex: 1,
    marginTop:20,
  },
 
  card:{
    width:80,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cardContent:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    color: 'red',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
  }
  
});