import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Text, Card,Button } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';

export default function ProductDetails() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const categories = [
    { label: 'Laptop', value: 'laptop' },
    { label: 'Computers', value: 'computers' },
    { label: 'Mobile Phones', value: 'mobilephones' },
    { label: 'Washing Machine', value: 'washingmachine' },
    { label: 'Rice Cooker', value: 'ricecooker' },
  ];

  const models = {
    laptop: ['Acer One 14 Business Laptop', 'ALenovo E41-55 AMD Laptop', 'Asus VivoBook 15'],
    computers: ['Dell. XPS Desktop', 'MSI. MEG Trident X', 'Apple. Mac Mini M2 (2023)'],
    mobilephones: ['Huawei Y9 Prime', 'Samsung Galaxy', 'iPhone 12'],
    washingmachine: ['10.5kg, AI Direct Drive ', '8kg, AI Direct Drive Front Load', '7kg, 6 Motion Inverter Direct Drive Front Load'],
    ricecooker: ['Panasonic SR-DF101', 'Panasonic SR-DF181 White Microcomputer', 'AROMA® Professional 8-Cup (Cooked)'],
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedModel(null);
  };

  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth - 40; // Subtracting padding on both sides

  return (
    <>
      <StatusBar backgroundColor="#108F94" translucent={true} />
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Our Products
        </Text>

        <Card style={[styles.card, { width: cardWidth }]}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category:</Text>
              <ModalDropdown
                options={categories.map((category) => category.label)}
                onSelect={(index) => handleCategoryChange(categories[index].value)}
                defaultValue="Select a category"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownOptions}
                dropdownTextStyle={styles.dropdownOptionText}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Model:</Text>
              <ModalDropdown
                options={selectedCategory ? models[selectedCategory] : []}
                onSelect={(index) => handleModelChange(models[selectedCategory][index])}
                defaultValue="Select a model"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownOptions}
                dropdownTextStyle={styles.dropdownOptionText}
                disabled={!selectedCategory}
              />
            </View>

            {selectedModel && (
              <Text style={styles.selectedText}>
                Selected: {selectedCategory} - {selectedModel}
              </Text>
            )}
          </Card.Content>
        </Card>
        <View>
                    
                    <Button mode="contained"
                     onPress={()=>handleSubmit()} 
                     style={{ backgroundColor: '#388F82' }} 
                     >
                      OK
                    </Button>
                 
                  </View>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 60,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    cardContent: {
      alignItems: 'center',
    },
    dropdown: {
      height: 40,
      width: '100%',
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#999999',
      borderRadius: 4,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    dropdownText: {
      fontSize: 16,
      color: '#333333',
    },
    dropdownOptions: {
      marginTop: 10,
    },
    modelDropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    modelDropdownLabel: {
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    selectedText: {
      marginTop: 10,
      textAlign: 'center',
    },
  });
  