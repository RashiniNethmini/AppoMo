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
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
   
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
      setSelectedTypes((prevSelectedTypes) => ({
        ...prevSelectedTypes,
        [typeName]: true,
      }));
      setSelectedModels((prevSelectedModels) => ({
        ...prevSelectedModels,
        [typeName]: [],
      }));
    } else {
      setSelectedTypes((prevSelectedTypes) => {
        const updatedSelectedTypes = { ...prevSelectedTypes };
        delete updatedSelectedTypes[typeName];
        return updatedSelectedTypes;
      });
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
    
    if (dataFetched) {
      axios
        .put("http://localhost:8070/Product/update", newProduct)
        .then((response) => {
          console.log(response.data);
          alert("Products updated");
        })
        .catch((error) => {
          console.log(error);
          alert("Error occurred while updating the product");
        });
    } else {
    axios.post("http://localhost:8070/Product/add",newProduct).then((response) => {
        console.log(response.data);
        alert("Products added");
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred while adding the product");
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8070/Product/get/Relevant")
      .then((response) => {
        const productData = response.data;
        const selectedModels = {
          MobilePhone: productData.MobilePhone || [],
          Laptop: productData.Laptop || [],
          Desktop: productData.Desktop || [],
          WashingMachine: productData.WashingMachine || [],
          Television: productData.Television || [],
        };
        setSelectedTypes(productData);
        setSelectedModels(selectedModels);
        setDataFetched(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error occurred while fetching the product");
      });
  }, []);


  return (
    <div className={styles.typeContainer}>
    <NavBar/>
      <Paper elevation={6} className={styles.pDiv}>
        <div className={styles.typeTitle}>
          <h1>Product Types</h1>
        </div>
        <div className={styles.typeList}>
          {types.map((type) => (
            <div className={styles.typeItem} key={type.name}>
              <Checkbox
                checked={Boolean(selectedTypes[type.name])}
                onChange={(event) => handleTypeChange(event, type.name)}
              />
              <span className={styles.typeName}>{type.name}</span>
              {Boolean(selectedTypes[type.name]) && (
                <div className={styles.modelDropdown}>
                  <FormControl className={styles.formStyle}>
                    
                      <InputLabel >Model</InputLabel>
                      <Select sx={{ width: '20vw' }}
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
                    
                  </FormControl>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.saveB}>
          <Button variant="contained" onClick={saveProduct} >
            Save
          </Button>
        </div>
        
        {error && <p>{error}</p>}
      </Paper>
    </div>
  );
}