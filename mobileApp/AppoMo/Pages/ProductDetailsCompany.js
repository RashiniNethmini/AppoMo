// import React, { useState, useEffect } from 'react';
// //import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import { Text, Card,Button} from 'react-native-paper';
// import { View, StyleSheet, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { useParams } from 'react-router-native';
// import { BackHandler } from 'react-native';
// import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';

// export default function ProductDetailsCompany() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('A');
//   const [models, setModels] = useState([]);
//   const [selectedModel, setSelectedModel] = useState('B');

//   const [scrollEnabled, setScrollEnabled] = useState(true);
//   const [contentHeight, setContentHeight] = useState(0);

//   const {objectId} = useParams();
//   const {companyID} = useParams();
//   const {serviceProviderName} = useParams();
//   const {_id} = useParams();
//   const branchID=_id;

//   const navigate = useNavigate();
//   const handleBackButton = () => {
//     navigate(`/ComBranchDetails/${objectId}/${companyID}/${serviceProviderName}`,{objectId,companyID,serviceProviderName});
//     return true;
//   };

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

//     return () => backHandler.remove();
//   }, [handleBackButton]);


//   useEffect(() => {
    
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://192.168.1.226:8070/Product/first'); 
//       const product = response.data;
//       const availableCategories = Object.keys(product).filter(category => Array.isArray(product[category]) && product[category].length > 0);
//       setCategories(availableCategories);
//       if (availableCategories.length > 0) {
//         setSelectedCategory(availableCategories[0]);
//         fetchModels(availableCategories[0]);
//       }
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   const fetchModels = async (category) => {
//     try {
//       const response = await axios.get('http://192.168.1.226:8070/Product/first'); 
//       const product = response.data;
//       const availableModels = product[category] || [];
//       setModels(availableModels);
//       if (availableModels.length > 0) {
//         setSelectedModel(availableModels[0]);
//       }
//     } catch (error) {
//       console.error('Failed to fetch models:', error);
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     fetchModels(category);
//   };

//   const handleModelChange = (model) => {
//     setSelectedModel(model);
//   };

//   const handleSubmit = async () => {
//     navigate(`/IssueSubmission/${objectId}/${companyID}/${serviceProviderName}/${branchID}/${selectedCategory}/${selectedModel}`,{objectId,companyID,serviceProviderName,branchID,selectedCategory,selectedModel});
//   };

//   return (
//     <>
//      <StatusBar backgroundColor="#108F94" translucent={true} />
//     <View>
//     <View>
//         <Text variant="headlineLarge" style={styles.title} >Company Product Details</Text>
//     </View>
//     {/* <KeyboardAwareScrollView
//         style={styles.view}
//         contentContainerStyle={styles.contentContainer}
//         scrollEnabled={scrollEnabled}
//         keyboardShouldPersistTaps="always"
//       > */}
//          <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
//          <View >
//             <Card style={styles.card}>
//               <Card.Content style={styles.cardContent}>
//                 <Card.Actions>
//                   <ScrollView>



//       <Text>Category:</Text>
//       <Picker
//         selectedValue={selectedCategory}
//         onValueChange={handleCategoryChange}
//       >
//         {categories.map(category => (
//           <Picker.Item key={category} label={category} value={category} />
//         ))}
//       </Picker>

//       <Text>Model:</Text>
//       <Picker
//         selectedValue={selectedModel}
//         onValueChange={handleModelChange}
//       >
//         {models.map(model => (
//           <Picker.Item key={model} label={model} value={model} />
//         ))}
//       </Picker>
      






// </ScrollView>

// </Card.Actions>
// </Card.Content>
// </Card>
// <View>
//           <Button mode="contained" style={{ backgroundColor: '#388F82' }} onPress={()=>handleSubmit()}>
//             OK
//           </Button>
//         </View>

// </View>
//       </View>
      
//       {/* </KeyboardAwareScrollView> */}
//     </View>
    
//     </>
//   );
// };

// const styles = StyleSheet.create({
 
//   title: {
//     textAlign: 'center',
//     marginTop: 100, 
//     color: '#ffff',
//     fontWeight: 'bold',
//     marginBottom:1
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//     width: '100%',
//   },
//   cardContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   card: {
//     marginTop: 1, // Adjust this value to change the space between title and card
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     width: 300,
//     marginBottom:250
//   },


// });

import React, { useState, useEffect } from 'react';
//import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Text, Card,Button} from 'react-native-paper';
import { View, StyleSheet, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useParams } from 'react-router-native';
import { BackHandler } from 'react-native';
import { NativeRouter, Link, Route, useNavigate } from 'react-router-native';

export default function ProductDetails() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('A');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('B');

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  const {objectId} = useParams();
  const {companyID} = useParams();
  const {serviceProviderName} = useParams();
  const {_id} = useParams();
  const branchID=_id;

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(`/ComBranchDetails/${objectId}/${companyID}/${serviceProviderName}`,{objectId,companyID,serviceProviderName});
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, [handleBackButton]);

  useEffect(() => {
    
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8070/Product/first'); 
      const product = response.data;
      const availableCategories = Object.keys(product).filter(category => Array.isArray(product[category]) && product[category].length > 0);
      console.log(availableCategories);
      setCategories(availableCategories);
      if (availableCategories.length > 0) {
        setSelectedCategory(availableCategories[0]);
        fetchModels(availableCategories[0]);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchModels = async (category) => {
    try {
      const response = await axios.get('http://10.0.2.2:8070/Product/first'); 
      const product = response.data;
      const availableModels = product[category] || [];
      console.log(availableModels);
      setModels(availableModels);
      if (availableModels.length > 0) {
        setSelectedModel(availableModels[0]);
      }
    } catch (error) {
      console.error('Failed to fetch models:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchModels(category);
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  const handleSubmit = async () => {
    navigate(`/IssueSubmission/${objectId}/${companyID}/${serviceProviderName}/${branchID}/${selectedCategory}/${selectedModel}`,{objectId,companyID,serviceProviderName,branchID,selectedCategory,selectedModel});
  };

  return (
    <>
     <StatusBar backgroundColor="#108F94" translucent={true} />
    <View>
    <View>
        <Text variant="headlineLarge" style={styles.title} >Our Products</Text>
    </View>
    {/* <KeyboardAwareScrollView
        style={styles.view}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="always"
      > */}
      
         <View onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
         <View >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Card.Actions>
                  <ScrollView>



      <Text>Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={handleCategoryChange}
      >
        {categories.map(category => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

      <Text>Model:</Text>
      <Picker
        selectedValue={selectedModel}
        onValueChange={handleModelChange}
      >
        {models.map(model => (
          <Picker.Item key={model} label={model} value={model} />
        ))}
      </Picker>
      






</ScrollView>

</Card.Actions>
</Card.Content>
</Card>
<View>
          <Button mode="contained" style={{ backgroundColor: '#388F82' }} onPress={()=>handleSubmit()}>
            OK
          </Button>
        </View>

</View>
      </View>
      
      {/* </KeyboardAwareScrollView> */}
    </View>
    
    </>
  );
};

const styles = StyleSheet.create({
 
  title: {
    textAlign: 'center',
    marginTop: 100, 
    color: '#ffff',
    fontWeight: 'bold',
    marginBottom:1
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    marginTop: 1, // Adjust this value to change the space between title and card
    paddingVertical: 10,
    marginHorizontal: 5,
    width: 300,
    marginBottom:250
  },


});
