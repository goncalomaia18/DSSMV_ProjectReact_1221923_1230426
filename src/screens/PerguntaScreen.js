import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchPergunta } from '../services/api';
import { accelerometer } from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

// Configuração para frequência de leitura do acelerômetro
setUpdateIntervalForType(SensorTypes.accelerometer, 100);

const PerguntaScreen = ({ goBack, goToConsequenceScreen }) => {
    const [pergunta, setPergunta] = useState('Carregando pergunta...');
    const [isShaking, setIsShaking] = useState(false); // Controle de debounce do shake

    const carregarPergunta = async () => {
        try {
            const data = await fetchPergunta();
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

    // Processa os dados do acelerômetro para detectar "shake"
    const processarShake = ({ x, y, z }) => {
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const threshold = 23; // Limiar ajustável de sensibilidade

        if (magnitude > threshold && !isShaking) {
            setIsShaking(true);
            carregarPergunta();

            // Reseta o debounce após 1 segundo
            setTimeout(() => setIsShaking(false), 1000);
        }
    };

    useEffect(() => {
        // Subscrição no acelerômetro
        const subscription = accelerometer.subscribe({
            next: processarShake,
        });

        // Carregar pergunta inicial
        carregarPergunta();

        // Cleanup ao desmontar o componente
        return () => subscription.unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.mainContent}>
                <Text style={styles.title}>Verdade</Text>
                <Text style={styles.pergunta}>{pergunta}</Text>

                <TouchableOpacity style={styles.button} onPress={carregarPergunta}>
                    <Text style={styles.buttonText}>Respondeu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={goToConsequenceScreen}>
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
        color: '#D81B60',
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
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

