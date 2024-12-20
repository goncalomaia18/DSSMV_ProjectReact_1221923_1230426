import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchConsequenciaPersonalizada } from '../services/api'; // Caminho para o arquivo da API

const ConsequenciaPersonalizadaScreen = ({ goBack, goToPerguntaPersonalizadaScreen }) => {
    const [consequencia, setConsequencia] = useState('A carregar consequencia...');

    // Função para carregar uma pergunta
    const carregarConsequencia = async () => {
        try {
            const data = await fetchConsequenciaPersonalizada();
            if (data.length > 0) {
                const perguntaAleatoria = data[Math.floor(Math.random() * data.length)];
                setConsequencia(perguntaAleatoria.consequenciasPersonlizada);
            } else {
                setConsequencia('Nenhuma consequencia encontrada.');
            }
        } catch (error) {
            setConsequencia('Erro ao carregar consequencia.');
        }
    };

    // Carrega uma pergunta ao montar o componente
    useEffect(() => {
        carregarConsequencia();
    }, []);


    return (
        <View style={styles.container}>
            {/* Botão de Voltar */}
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>

            {/* Conteúdo da tela de Perguntas */}
            <View style={styles.mainContent}>
                <Text style={styles.title}>Consequencia</Text>
                <Text style={styles.pergunta}>{consequencia}</Text>

                <TouchableOpacity style={styles.button} onPress={carregarConsequencia}>
                    <Text style={styles.buttonText}>Fez</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={goToPerguntaPersonalizadaScreen}>
                    <Text style={styles.buttonText}>Verdade</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    backButton: {
        marginBottom: 20,
        backgroundColor: '#D81B60',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: 'auto',
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D81B60',
        marginBottom: 20,
    },
    pergunta: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#D81B60',
        padding: 16,
        marginTop: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
});

export default ConsequenciaPersonalizadaScreen;
