const API_URL = 'https://verdadeconsequencia-3d59.restdb.io/rest/perguntas';
const API_KEY = 'f9ac62cfdf5b449cd16ee1a1052d328b8e6b5'; // Substitua pela chave da API

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
