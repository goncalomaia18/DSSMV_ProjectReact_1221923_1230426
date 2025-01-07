const initialState = {
    perguntas: [],
    loading: false,
    error: null,
};

const perguntaReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, perguntas: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_SUCCESS':
            return { ...state, perguntas: [...state.perguntas, action.payload] };
        case 'DELETE_SUCCESS':
            // Ao deletar, o payload tem o _id da pergunta removida
            return { ...state, perguntas: state.perguntas.filter((p) => p._id !== action.payload) };
        default:
            return state;
    }
};

export default perguntaReducer;
