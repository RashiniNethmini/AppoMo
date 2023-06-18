import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProviderType.module.css";
import {
  Paper,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProviderType() {
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModels, setSelectedModels] = useState({});
  

  useEffect(() => {
    // Fetch product types and their models from an API or a data source
    // For demonstration purposes, I'm using static data here
    const productTypes = [
      {
        id: 1,
        name: "Mobile Phone",
        models: [],
      },
      {
        id: 2,
        name: "Laptop",
        models: [],
      },
      {
        id: 3,
        name: "Desktop",
        models: [],
      },
      {
        id: 4,
        name: "Washing Machine",
        models: [],
      },
      {
        id: 5,
        name: "TV",
        models: [],
      },
    ];

    setTypes(productTypes);
  }, []);

  const handleTypeChange = (event, typeId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const selectedType = types.find((type) => type.id === typeId);
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, selectedType]);
      setSelectedModels((prevSelectedModels) => ({
        ...prevSelectedModels,
        [typeId]: [""],
      }));
    } else {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((type) => type.id !== typeId)
      );
      setSelectedModels((prevSelectedModels) => {
        const updatedSelectedModels = { ...prevSelectedModels };
        delete updatedSelectedModels[typeId];
        return updatedSelectedModels;
      });
    }
  };

  const handleModelChange = (event, typeId, modelIndex) => {
    const modelsCopy = [...selectedModels[typeId]];
    modelsCopy[modelIndex] = event.target.value;

    setSelectedModels((prevSelectedModels) => ({
      ...prevSelectedModels,
      [typeId]: modelsCopy,
    }));
  };

  const addModel = (typeId) => {
    setSelectedModels((prevSelectedModels) => ({
      ...prevSelectedModels,
      [typeId]: [...prevSelectedModels[typeId], ""],
    }));
  };

  const removeModel = (typeId, modelIndex) => {
    const modelsCopy = [...selectedModels[typeId]];
    modelsCopy.splice(modelIndex, 1);

    setSelectedModels((prevSelectedModels) => ({
      ...prevSelectedModels,
      [typeId]: modelsCopy,
    }));
  };

 const handleSave = () => {
  const products = selectedTypes.map((selectedType) => ({
    productType: selectedType.name,
    models: selectedModels[selectedType.id],
  }));

  axios
    .post('http://localhost:8070/Product/add', products)
    .then((response) => {
      console.log(response.data);
      alert('Products Added');
      // Handle success or show a success message
    })
    .catch((error) => {
      console.error(error);
      alert('Error occurred while adding the products');
      // Handle error or show an error message
    });
};

  return (
    <div className={styles.typeContainer}>
      <Paper elevation={6} className={styles.pDiv}>
        <div className={styles.typeTitle}>
          <h1>Product Types</h1>
        </div>
        <div className={styles.typeList}>
          {types.map((type) => (
            <div className={styles.typeItem} key={type.id}>
              <Checkbox
                checked={selectedTypes.some((selectedType) => selectedType.id === type.id)}
                onChange={(event) => handleTypeChange(event, type.id)}
              />
              <span className={styles.typeName}>{type.name}</span>
              {selectedTypes.some((selectedType) => selectedType.id === type.id) && (
                <div className={styles.modelFields}>
                  {selectedModels[type.id].map((model, modelIndex) => (
                    <div className={styles.modelField} key={modelIndex}>
                      <TextField
                        label="Model"
                        value={model}
                        onChange={(event) => handleModelChange(event, type.id, modelIndex)}
                      />
                      {modelIndex === selectedModels[type.id].length - 1 && (
                        <IconButton
                          className={styles.addButton}
                          onClick={() => addModel(type.id)}
                        >
                          <AddIcon />
                        </IconButton>
                      )}
                      {modelIndex !== selectedModels[type.id].length - 1 && (
                        <IconButton
                          className={styles.removeButton}
                          onClick={() => removeModel(type.id, modelIndex)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div>
          <button onClick={handleSave}>Save Products</button>
          </div>
        </div>
      </Paper>
    </div>
  );
}