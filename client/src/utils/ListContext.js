import React, { createContext, useContext } from 'react';

const ListContext = createContext();

export const useListContext = () => useContext(ListContext);

export const listProvider = ({children}) => {
    const initialState = {
        listId: "63b5f71b6d5c4f0f31c89700",
    };

    return (
        <ListContext.Provider value={initialState}>
            {children}
        </ListContext.Provider>
    )
}