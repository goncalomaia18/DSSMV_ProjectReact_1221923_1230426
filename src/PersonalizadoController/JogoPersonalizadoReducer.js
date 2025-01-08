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
        case 'FETCH_CONSEQUENCIAS_SUCCESS':
            return { ...state, loading: false, consequencias: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_SUCCESS':
            return { ...state, perguntas: [...state.perguntas, action.payload] };
        case 'ADD_CONSEQUENCIA_SUCCESS':
            return { ...state, consequencias: [...state.consequencias, action.payload] };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                perguntas: state.perguntas.filter((p) => p._id !== action.payload),
            };
        case 'DELETE_CONSEQUENCIA_SUCCESS':
            return {
                ...state,
                consequencias: state.consequencias.filter((c) => c._id !== action.payload),
            };
        default:
            return state;
    }
};

export default perguntaReducer;
