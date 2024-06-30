import React, { useEffect, useState } from 'react';
import { Button, Chip } from '@mui/material';
import { useDataContext } from '/contexts/DataContext';

const DataContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadFile } = useDataContext();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.txt')) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Please select a .txt file.');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  // Function to handle data upload
  const handleUpload = () => {
    uploadFile(selectedFile);
    setSelectedFile(null);
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
            onDelete={() => handleRemoveFile()}
            variant="outlined"
          />
        )}
      </div>
    </div>
  );
};

export default DataContent;