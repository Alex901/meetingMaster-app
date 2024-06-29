import React, { createContext, useContext } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {


    const uploadFile = async (file) => {
        console.log('Uploading file:', file);
       
    };

    return (
        <DataContext.Provider value={{ uploadFile }}>
            {children}
        </DataContext.Provider>
    );
};

const useDataContext = () => useContext(DataContext);

export { DataProvider, useDataContext };