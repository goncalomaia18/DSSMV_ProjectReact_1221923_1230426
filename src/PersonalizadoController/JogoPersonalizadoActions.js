// src/context/actions/perguntaActions.js
import {
    FetchPerguntasPersonalizadas,
    AddPerguntaPersonalizada,
    DeletePerguntaPersonalizada,
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
