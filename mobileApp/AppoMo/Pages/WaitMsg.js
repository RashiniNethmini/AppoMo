import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

export default function WaitMsg() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDialog}>
        <Text style={styles.buttonText}>Show Dialog</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={hideDialog}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <Text style={styles.messageText}>
              Please wait until we look into your issue.
            </Text>
            <TouchableOpacity onPress={hideDialog}>
              <Text style={styles.okButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
