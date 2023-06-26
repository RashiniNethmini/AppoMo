import React, { useState,useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Card} from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';
import { BackHandler } from 'react-native';
import { useParams } from 'react-router-native';

const IssueSubmitMsg = () => {
  const navigate = useNavigate();
  const {objectId} = useParams();
  const handleBackButton = () => {
    // navigate('/CompanyOrServiceCenter/:objectId');
    navigate(`/CompanyOrServiceCenter/${objectId}`,{objectId});
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);

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
