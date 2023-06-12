import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Card} from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';



const IssueSubmitMsg = () => {
  

    return (
        <View style={styles.container}>
            <Text style={styles.messageText}>
            Please wait till we look into your issue.
          </Text>
          
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default IssueSubmitMsg;
