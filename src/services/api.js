const API_URL = 'https://verdadeconsequencia-3d59.restdb.io/rest/perguntas';
const API_CONSEQUENCIA_URL = 'https://verdadeconsequencia-3d59.restdb.io/rest/consequencias';
const API_KEY = 'f9ac62cfdf5b449cd16ee1a1052d328b8e6b5'; // Substitua pela chave da API
const API_URL_PER = 'https://verdadeconsequencia-3d59.restdb.io/rest/perguntaspersonalizado';

// Função para buscar perguntas
export const fetchPergunta = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar pergunta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Relança o erro para tratamento no componente
    }
};


// Função para buscar consequencias
export const fetchConsequencia = async () => {
    try {
        const response = await fetch(API_CONSEQUENCIA_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar pergunta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Relança o erro para tratamento no componente
    }
};

export const FetchPerguntasPersonalizadas = async () => {
    try {
        const response = await fetch(API_URL_PER, {
            method: 'GET',  //
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar as perguntas');
        }

        const data = await response.json();
        return data; // Retorna as perguntas
    } catch (error) {
        console.error(error);
        throw error;  // Relança o erro para poder ser tratado em outro lugar
    }
};

export const AddPerguntaPersonalizada = async (novaPergunta) => {
    try {
        const response = await fetch(API_URL_PER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
            body: JSON.stringify({ perguntaspersonalizado: novaPergunta }),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar a pergunta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Relança o erro para tratamento no componente
    }
};

export const fetchConsequenciaPersonalizada = async () => {
    try {
        const response = await fetch(API_URL_PER, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar pergunta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Relança o erro para tratamento no componente
    }
};

export const AddConsequenciaPersonalizada = async () => {
    try {
        const response = await fetch(API_URL_PER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar a pergunta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Relança o erro para tratamento no componente
    }
};
export const DeletePerguntaPersonalizada = async () => {
    try {
        const response = await fetch(API_URL_PER, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar a pergunta');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error; // Relança o erro para tratamento no componente
    }
};
