import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {fetchPergunta, fetchPerguntaPersonalizada} from '../services/api'; // Caminho para o arquivo da API

const PerguntaScreen = ({ goBack }) => {
    const [pergunta, setPergunta] = useState('A carregar pergunta...');

    // Função para carregar uma pergunta
    const carregarPergunta = async () => {
        try {
            const data = await fetchPerguntaPersonalizada();
            if (data.length > 0) {
                const perguntaAleatoria = data[Math.floor(Math.random() * data.length)];
                setPergunta(perguntaAleatoria.perguntas);
            } else {
                setPergunta('Nenhuma pergunta encontrada.');
            }
        } catch (error) {
            setPergunta('Erro ao carregar pergunta.');
        }
    };

    // Carrega uma pergunta ao montar o componente
    useEffect(() => {
        carregarPergunta();
    }, []);


    return (
        <View style={styles.container}>
            {/* Botão de Voltar */}
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>

            {/* Conteúdo da tela de Perguntas */}
            <View style={styles.mainContent}>
                <Text style={styles.title}>Verdade</Text>
                <Text style={styles.pergunta}>{pergunta}</Text>

                <TouchableOpacity style={styles.button} onPress={carregarPergunta}>
                    <Text style={styles.buttonText}>Respondeu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Consequência</Text>
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

export default PerguntaScreen;
