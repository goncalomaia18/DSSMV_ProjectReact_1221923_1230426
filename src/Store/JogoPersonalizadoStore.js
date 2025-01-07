import React, { useReducer, createContext } from 'react';
import perguntaReducer from '../PersonalizadoController/JogoPersonalizadoReducer';

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(perguntaReducer, {
        perguntas: [],
        loading: false,
        error: null,
    });

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
