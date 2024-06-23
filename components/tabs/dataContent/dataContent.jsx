import React from 'react';
import Button from '@mui/material/Button';

const DataContent = () => {
  // Function to handle file selection
  const handleFileSelect = (event) => {
    // Process the selected file here
    console.log(event.target.files[0]);
  };

  // Function to handle data upload
  const handleUpload = () => {
    // Upload data logic here
    console.log('Upload data');
  };

  // Function to handle data download
  const handleDownload = () => {
    // Download data logic here
    console.log('Download data');
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
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
        <Button variant="outlined" onClick={handleUpload} style={{ marginLeft: '10px' }}>
          Upload Data
        </Button>
      </div>
      <div>
        <Button variant="outlined" onClick={handleDownload}>
          Download Data
        </Button>
      </div>
    </div>
  );
};

export default DataContent;