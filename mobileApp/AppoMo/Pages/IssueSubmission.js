import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Text, TextInput, IconButton, Dialog, Paragraph, Portal, colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Audio } from 'expo-av';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const MAX_HEIGHT = 500;

export default function IssueSubmission() {
  const [name, setTextname] = useState("");
  const [contactNo, setTextcontactNo] = useState("");
  const [invoice, setTextinvoice] = useState("");
  const [product, setTextproduct] = useState("");
  const [issue, setTextissue] = useState("");

  const [error, setError] = useState('');  // set restriction to add only 10 numbers to contact number.
  const handleInputChange = (text) => {
    if (text.length < 1) {  // If the input is empty, clear the error message and set the input value
      setError('');
      setTextcontactNo(text);

    } else if (text.length < 10) {  // If the input is less than 10 characters, display an error message and set the input value
      setError('Contact number must be at least 10 characters long.');
      setTextcontactNo(text);

    } else if (text.length > 10) {  // If the input is more than 10 characters, display an error message and set the input value
      setError('Contact number must not exceed 10 characters.');
      setTextcontactNo(text);
    } else if (/^\d{10}$/.test(text)) {  // If the input is exactly 10 digits, set the input value and clear the error message
      setTextcontactNo(text);
      setError('');
    } else {  // If the input contains non-digit characters, display an error message and clear the input value
      setError('Contact number can only contain digits.');
      setTextcontactNo('');
    }
  };





  const [recording, setRecording] = useState();
  const startRecording = async () => {
    try {
      console.log('Requesting recording permission');
      await Audio.requestPermissionsAsync();
      console.log('Starting recording...');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };
  const stopRecording = async () => {
    console.log('Stopping recording...');
    try {
      await recording.stopAndUnloadAsync();
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
    setRecording(undefined);
  };

  const handleMicPress = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };




  const [disableSubmit, setDisableSubmit] = useState(true); // disable the submit button at begining.
  const checkInputs = () => {
    if (name && contactNo && product && issue) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };


  const handleSubmit = () => {
    console.log('Submit button pressed');
    //below 5 lines helps to  clear all inputs when touch the submit button.
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

  
  const [visible, setVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  React.useEffect(() => {
    if (contentHeight >= MAX_HEIGHT) {
      setScrollEnabled(false);
    } else {
      setScrollEnabled(true);
    }
  }, [contentHeight]);


  return (
    <>
      <StatusBar backgroundColor="#108F94" translucent={true} />
      <View>
            <Text variant="headlineLarge" style={styles.title} >Let Us Know What's Wrong</Text>
          </View>
      <KeyboardAwareScrollView
        style={styles.view}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="always"
      >
        <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>



         


          <View >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Card.Actions>
                  <ScrollView>


                    <View>
                      <Text variant="bodyLarge">Name</Text>
                      <TextInput type="outlined" value={name} onChangeText={text => setTextname(text)} style={styles.input} activeUnderlineColor='#388F82' />
                    </View>

                    <View>
                      <Text variant="bodyLarge">Contact No</Text>
                      <TextInput type="outlined" value={contactNo} onChangeText={text => handleInputChange(text)} keyboardType="numeric" style={styles.input} activeUnderlineColor='#388F82'  />
                      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                    </View>


                    <View>
                      <Text variant="bodyLarge">Invoice No</Text>
                      <TextInput type="outlined" value={invoice} onChangeText={text => setTextinvoice(text)} style={styles.input} activeUnderlineColor='#388F82'  />
                    </View>

                    <View>
                      <Text variant="bodyLarge">Product</Text>
                      <TextInput type="outlined" value={product} onChangeText={text => setTextproduct(text)} style={styles.input} activeUnderlineColor='#388F82'  />
                    </View>

                    <View>
                      <Text variant="bodyLarge">Issue in brief</Text>
                      <TextInput type="outlined" value={issue} onChangeText={text => setTextissue(text)} style={styles.input} activeUnderlineColor='#388F82'  />
                    </View>

                    <View>
                      <Text variant="bodyLarge">Feel free to explain your issue</Text>
                      <Text variant="bodyMedium">*Leave a voice message</Text>
                      <IconButton
                        icon={() => <Icon name={recording ? 'stop-circle' : 'microphone'} size={30} color="#fff" />}
                        onPress={handleMicPress}
                        style={{ backgroundColor: recording ? '#FF0000' : '#388F82' }}
                      />

                    </View>

                    <View>
                      <Button mode="contained" onPress={handleSubmit} style={{ backgroundColor: disableSubmit ? "#ccc" : '#388F82', }} disabled={disableSubmit}>
                        Submit
                      </Button>
                      <Portal>
                        <Dialog visible={visible} onDismiss={() => setVisible(false)}>

                          <Dialog.Content>
                            <Paragraph>Please wait till we look into your issue.</Paragraph>
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
  container: {
    flex: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
  textAlign: 'center',
    padding: 10,
    marginTop: 60,
    marginBottom: 0,
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    //border: '1px solid red',
    color:'#FFFFFF',
    fontWeight: 'bold',



  },
  card: {
    paddingVertical: 10,
    marginHorizontal:5,
    width:360,

  },
  view: {
    flex: 1,
    marginTop: 0,
  },

  
  
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 5,
    fontSize: 16,
   
    borderBottomWidth: 1,
    activeUnderlineColor: '#388F82',




  }





});