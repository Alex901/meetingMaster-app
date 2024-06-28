import React, { useEffect, useState } from 'react';
import { Button, Chip } from '@mui/material';

const DataContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    console.log("Debug, selected file: ", selectedFile);
  }
    , [selectedFile]);


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Debug, selected file: ", selectedFile);
    } else {
      setSelectedFile(null);
    }

    console.log("Debug, selected file: ", selectedFile);
  };

  const handleDelete = () => {
    setSelectedFile(null);
  };

  // Function to handle data upload
  const handleUpload = () => {

    console.log('Upload data');
  };


  return (
    <div style={{ backgroundColor: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h2>Handle data</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          accept="*/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileSelect}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span">
            Select File
          </Button>
        </label>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile}
          sx={{
            marginLeft: '10px',
            borderRadius: '5px',
            backgroundColor: 'green',
            '&:hover': {
              backgroundColor: 'darkgreen',
            }
          }}>
          Upload Data
        </Button>
      </div>
      <div>
        {selectedFile && (
          <Chip
            label={selectedFile.name}
            onDelete={() => handleDelete()}
            variant="outlined"
          />
        )}
      </div>
    </div>
  );
};

export default DataContent;