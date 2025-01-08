const API_URL = 'https://verdadeconsequencia-3d59.restdb.io/rest/perguntas';
const API_CONSEQUENCIA_URL = 'https://verdadeconsequencia-3d59.restdb.io/rest/consequencias';
const API_KEY = 'f9ac62cfdf5b449cd16ee1a1052d328b8e6b5'; // Substitua pela chave da API
const API_URL_PER = 'https://verdadeconsequencia-3d59.restdb.io/rest/perguntaspersonalizado';
const API_URL_CON = 'https://verdadeconsequencia-3d59.restdb.io/rest/consequenciaspersonalizado';


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
        const response = await fetch(API_URL_CON, {
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

export const AddConsequenciaPersonalizada = async (novaConsequencia) => {
        try {
            const response = await fetch(API_URL_CON, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': API_KEY,
                    'cache-control': 'no-cache',
                },
                body: JSON.stringify({ consequenciaspersonalizado: novaConsequencia }),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar a consequencia');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
export const DeletePerguntaPersonalizada = async (pergunta) => {
    try {
        if (!pergunta || !pergunta._id) {
            throw new Error('Pergunta não encontrada ou ID inválido.');
        }

        // Faz a requisição para deletar a pergunta usando o _id
        const response = await fetch(`${API_URL_PER}/${pergunta._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Detalha o erro
            console.error('Erro ao eliminada a pergunta:', errorData);
            throw new Error('Erro ao eliminada a pergunta');
        }

        console.log('Pergunta eliminada com sucesso!');
        return { success: true };
    } catch (error) {
        console.error('Erro inesperado:', error);  // Log do erro completo
        throw error;
    }
};
export const DeleteConsequenciaPersonalizada = async (consequencia) => {
    try {
        if (!consequencia || !consequencia._id) {
            throw new Error('Consequencia não encontrada ou ID inválido.');
        }

        const response = await fetch(`${API_URL_CON}/${consequencia._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'cache-control': 'no-cache',
            },
        });

        if (!response.ok) {
            const errorData = await response.json(); // Detalha o erro
            console.error('Erro ao eliminar consequencia:', errorData);
            throw new Error('Erro ao eliminar consequencia');
        }

        console.log('Consequencia eliminada com sucesso!');
        return { success: true };
    } catch (error) {
        console.error('Erro inesperado:', error);  // Log do erro completo
        throw error;
    }
};
