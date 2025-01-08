// src/context/actions/perguntaActions.js
import {
    FetchPerguntasPersonalizadas,
    AddPerguntaPersonalizada,
    DeletePerguntaPersonalizada,
    fetchConsequenciaPersonalizada,
    AddConsequenciaPersonalizada,
    DeleteConsequenciaPersonalizada,
} from '../services/api';

export const fetchPerguntasPersonalizadasAction = async (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    try {
        const perguntas = await FetchPerguntasPersonalizadas();
        dispatch({ type: 'FETCH_SUCCESS', payload: perguntas });
    } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
};

export const addPerguntaPersonalizadaAction = async (dispatch, pergunta) => {
    try {
        const novaPergunta = await AddPerguntaPersonalizada(pergunta);
        dispatch({ type: 'ADD_SUCCESS', payload: novaPergunta });
    } catch (error) {
        alert(`Erro ao adicionar pergunta: ${error.message}`);
    }
};

export const deletePerguntaPersonalizadaAction = async (dispatch,pergunta) => {
    try {
        await DeletePerguntaPersonalizada(pergunta);
        dispatch({ type: 'DELETE_SUCCESS', payload: pergunta._id });
    } catch (error) {
        alert(`Erro ao deletar pergunta: ${error.message}`);
    }
};
export const fetchConsequenciasPersonalizadasAction = async (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    try {
        const consequencias = await fetchConsequenciaPersonalizada(); // Reutiliza endpoint
        dispatch({ type: 'FETCH_CONSEQUENCIAS_SUCCESS', payload: consequencias });
    } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
};


export const addConsequenciaPersonalizadaAction = async (dispatch, consequencia) => {
    try {
        const novaConsequencia = await AddConsequenciaPersonalizada(consequencia);
        dispatch({ type: 'ADD_CONSEQUENCIA_SUCCESS', payload: novaConsequencia });
    } catch (error) {
        alert(`Erro ao adicionar consequência: ${error.message}`);
    }
};


export const deleteConsequenciaPersonalizadaAction = async (dispatch, consequencia) => {
    try {
        await DeleteConsequenciaPersonalizada(consequencia);
        dispatch({ type: 'DELETE_CONSEQUENCIA_SUCCESS', payload: consequencia._id });
    } catch (error) {
        alert(`Erro ao deletar consequência: ${error.message}`);
    }
};
