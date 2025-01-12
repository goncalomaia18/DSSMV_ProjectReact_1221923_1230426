import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchConsequencia } from "../services/api";
import { accelerometer } from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

// Configuração para atualização do sensor
setUpdateIntervalForType(SensorTypes.accelerometer, 100);

const ConsequenciaScreen = ({ onRespondeuConsequencia }) => {
    const [consequencia, setConsequencia] = useState('Carregando Consequência...');
    const [consequenciasOptions, setConsequenciasOptions] = useState([]);
    const [isShaking, setIsShaking] = useState(false); // Flag para detectar shake recente

    // Função para carregar as consequências
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

    // Função para processar shake baseado na magnitude
    const processarShake = ({ x, y, z }) => {
        const magnitude = Math.sqrt(x * x + y * y + z * z); // Cálculo da magnitude do movimento
        const threshold = 23; // Ajuste para definir a sensibilidade do shake

        if (magnitude > threshold && !isShaking) {
            setIsShaking(true); // Impede detecções consecutivas
            carregarConsequencia();

            // Redefinir isShaking após 1 segundo para permitir outro shake
            setTimeout(() => setIsShaking(false), 1000);
        }
    };

    useEffect(() => {
        // Começar a observar o acelerômetro
        const subscription = accelerometer.subscribe({
            next: processarShake, // Processa os dados do acelerômetro
        });

        // Carregar a primeira consequência ao iniciar
        carregarConsequencia();

        // Limpeza do listener ao desmontar o componente
        return () => subscription.unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <Text style={styles.title}>Consequência</Text>
                <Text style={styles.consequencia}>{consequencia}</Text>

                {/* Botão Nova Consequência */}
                <TouchableOpacity style={styles.button} onPress={carregarConsequencia}>
                    <Text style={styles.buttonText}>Nova Consequência</Text>
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

