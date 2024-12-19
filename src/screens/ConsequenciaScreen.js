import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {fetchConsequencia} from "../services/api";

const ConsequenciaScreen = ({ onRespondeuConsequencia }) => {
    const [consequencia, setConsequencia] = useState('Carregando Consequência...');

    const carregarConsequencia = async () => {
        try {
            const data = await fetchConsequencia();
            if (data.length > 0) {
                const consequenciaaleatoria = data[Math.floor(Math.random() * data.length)];
                setConsequencia(consequenciaaleatoria.consequencias);
            } else {
                setConsequencia('Nenhuma consequencia encontrada.');
            }
        } catch (error) {
            setConsequencia('Erro ao carregar pergunta.');
        }
    };

    useEffect(() => {
        carregarConsequencia();
    }, []);


    return (
        <View style={styles.container}>

            <View style={styles.mainContent}>
                <Text style={styles.title}>Consequência</Text>
                <Text style={styles.consequencia}>{consequencia}</Text>

                {/* Botão Nova Consequência */}
                <TouchableOpacity style={styles.button} onPress={carregarConsequencia}>
                    <Text style={styles.buttonText}>Consequência</Text>
                </TouchableOpacity>

                {/* Botão Respondeu */}
                <TouchableOpacity style={styles.button} onPress={onRespondeuConsequencia}>
                    <Text style={styles.buttonText}>Respondeu</Text>
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
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#D81B60',
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    consequencia: {
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
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default ConsequenciaScreen;
