import React, { useState, useEffect } from "react";
import styles from "./ProviderType.module.css";
import {
  Paper,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import NavBar from '../NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useParams} from 'react-router-dom';

export default function ProviderType() {
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedModels, setSelectedModels] = useState({});
  const [error, setError] = useState("");
  const {objectId} = useParams();

  useEffect(() => {
    // Fetch product types and their models from an API or a data source
    // For demonstration purposes, I'm using static data here
    const productTypes = [
      {
        name: "Mobile Phone",
        models: ["Samsung M21", "Samsung M31"],
      },
      {
        name: "Laptop",
        models: ["Asus", "Dell"],
      },
      {
        name: "Desktop",
        models: ["Dell", "Asus"],
      },
      {
        name: "Washing Machine",
        models: ["Singer", "Abans"],
      },
      {
        name: "Television",
        models: ["LG", "Singer"],
      },
    ];

    setTypes(productTypes);
  }, []);

  const handleModelChange = (event, typeName) => {
    const selectedModels = Array.from(event.target.value);
    setSelectedModels((prevSelectedModels) => ({
      ...prevSelectedModels,
      [typeName]: selectedModels,
    }));
  };

  const handleTypeChange = (event, typeName) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const selectedType = types.find((type) => type.name === typeName);
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, selectedType]);
      setSelectedModels((prevSelectedModels) => ({
        ...prevSelectedModels,
        [typeName]: [],
      }));
    } else {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((type) => type.name !== typeName)
      );
      setSelectedModels((prevSelectedModels) => {
        const updatedSelectedModels = { ...prevSelectedModels };
        delete updatedSelectedModels[typeName];
        return updatedSelectedModels;
      });
    }
  };

  function saveProduct  (e)  {
    e.preventDefault();

    const newProduct = {
      MobilePhone: selectedModels["Mobile Phone"] || [],
      Laptop: selectedModels["Laptop"] || [],
      Desktop: selectedModels["Desktop"] || [],
      WashingMachine: selectedModels["Washing Machine"] || [],
      Television: selectedModels["Television"] || [],
      Company:objectId
    
    };
  
    axios.post("http://localhost:8070/Product/add",newProduct).then((response) => {
        console.log(response.data);
        alert("Products added");
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred while adding the product");
      });
  };

  return (
    <div className={styles.typeContainer}>
    <NavBar/>
      <Paper elevation={6} className={styles.pDiv}>
        <div className={styles.typeTitle}>
          <h1>Product Type</h1>
        </div>
        <div className={styles.typeList}>
          {types.map((type) => (
            <div className={styles.typeItem} key={type.name}>
              <Checkbox
                checked={selectedTypes.some((selectedType) => selectedType.name === type.name)}
                onChange={(event) => handleTypeChange(event, type.name)}
              />
              <span className={styles.typeName}>{type.name}</span>
              {selectedTypes.some((selectedType) => selectedType.name === type.name) && (
                <div className={styles.modelDropdown}>
                  <FormControl>
                    <div>
                      <InputLabel>Model</InputLabel>
                      <Select
                        multiple
                        value={selectedModels[type.name] || []}
                        onChange={(event) => handleModelChange(event, type.name)}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {type.models.map((model) => (
                          <MenuItem key={model} value={model}>
                            <Checkbox checked={selectedModels[type.name]?.includes(model)} />
                            {model}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button variant="contained" onClick={saveProduct}>
          Save
        </Button>
        {error && <p>{error}</p>}
      </Paper>
    </div>
  );
}