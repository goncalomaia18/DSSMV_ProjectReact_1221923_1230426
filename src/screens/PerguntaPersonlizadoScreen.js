import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FetchPerguntasPersonalizadas } from '../services/api';
import { accelerometer } from 'react-native-sensors';
import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

// Configura o intervalo de leitura do acelerômetro
setUpdateIntervalForType(SensorTypes.accelerometer, 100);

const PerguntaPersonalizadoScreen = ({ goBack, goToConsequenciasPersonalizadoScreen }) => {
    const [pergunta, setPergunta] = useState('A carregar pergunta...');
    const [isShaking, setIsShaking] = useState(false); // Controle de debounce do shake

    // Função para carregar uma pergunta
    const carregarPergunta = async () => {
        try {
            const data = await FetchPerguntasPersonalizadas();
            if (data.length > 0) {
                const perguntaAleatoria = data[Math.floor(Math.random() * data.length)];
                setPergunta(perguntaAleatoria.perguntaspersonalizado);
            } else {
                setPergunta('Nenhuma pergunta encontrada.');
            }
        } catch (error) {
            setPergunta('Erro ao carregar pergunta.');
        }
    };

    // Função que processa os movimentos de shake
    const processarShake = ({ x, y, z }) => {
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const threshold = 20; // Ajuste de sensibilidade ao shake

        if (magnitude > threshold && !isShaking) {
            setIsShaking(true);
            carregarPergunta();

            // Reseta a flag após um segundo (debounce)
            setTimeout(() => setIsShaking(false), 1000);
        }
    };

    useEffect(() => {
        // Subscrição no acelerômetro
        const subscription = accelerometer.subscribe({
            next: processarShake,
        });

        // Carrega a pergunta inicial
        carregarPergunta();

        // Cleanup ao desmontar o componente
        return () => subscription.unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            {/* Botão de Voltar */}
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>

            {/* Conteúdo principal */}
            <View style={styles.mainContent}>
                <Text style={styles.title}>Verdade</Text>
                <Text style={styles.pergunta}>{pergunta}</Text>

                <TouchableOpacity style={styles.button} onPress={carregarPergunta}>
                    <Text style={styles.buttonText}>Respondeu</Text>
                </TouchableOpacity>

                {/* Botão Consequência */}
                <TouchableOpacity style={styles.button} onPress={goToConsequenciasPersonalizadoScreen}>
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

export default PerguntaPersonalizadoScreen;
