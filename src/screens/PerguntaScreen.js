import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PerguntaScreen = ({ goBack }) => {
    return (
        <View style={styles.container}>
            {/* Botão de Voltar */}
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>

            {/* Conteúdo da tela de Perguntas */}
            <View style={styles.mainContent}>
                <Text style={styles.title}>Verdade</Text>
                <Text style={styles.pergunta}>Qual é a sua cor favorita?</Text>

                <TouchableOpacity style={styles.button}>
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
        marginBottom: 20,  // Ajusta a margem inferior
        backgroundColor: '#D81B60',
        paddingVertical: 10,  // Ajusta o padding vertical para diminuir o tamanho
        paddingHorizontal: 16, // Ajusta o padding horizontal
        borderRadius: 8,
        alignItems: 'center',
        width: 'auto', // Garante que o botão tenha o tamanho ideal
        alignSelf: 'flex-start', // Alinha o botão à esquerda
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
