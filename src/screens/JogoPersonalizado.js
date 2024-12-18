import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
} from 'react-native';

import PerguntaPersonlizadoScreen from "./PerguntaPersonlizadoScreen";
import { AddPerguntaPersonalizada } from '../services/api';


const JogoPersonalizado = () => {
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);

    const [novaPergunta, setNovaPergunta] = useState('');

    // Função para navegar para a tela de perguntas
    const goToQuestionScreen = () => {
        setIsQuestionScreen(true);
    };

    // Função para voltar para a tela inicial
    const goBack = () => {
        setIsQuestionScreen(false);
    };

    // Se estiver na tela de perguntas, exibe a tela de perguntas
    if (isQuestionScreen) {
        return <PerguntaPersonlizadoScreen goBack={goBack} />;
    }

    const adicionarPergunta = async () => {
        if (!novaPergunta.trim()) {
            Alert.alert('Erro', 'O campo de pergunta não pode estar vazio.');
            return;
        }

        try {
            const data = await AddPerguntaPersonalizada({ pergunta: novaPergunta });
            Alert.alert('Sucesso', 'Pergunta adicionada com sucesso!');
            setNovaPergunta(''); // Limpa o campo de entrada
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar a pergunta.');
        }
    };


    return (
        <View style={styles.container}>
            {/* Seção "Verdade" */}
            <Text style={styles.title}>Verdade</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite uma nova verdade"
                value={novaPergunta}
                onChangeText={setNovaPergunta}
            />
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}  onPress={adicionarPergunta}>
                    <Text style={styles.buttonText}>Adicionar Verdade</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Remover Verdade</Text>
                </TouchableOpacity>
            </View>

            {/* Seção "Consequência" */}
            <Text style={styles.title}>Consequência</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Adicionar Consequência</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Remover Consequência</Text>
                </TouchableOpacity>
            </View>

            {/* Botão "Jogar" */}
            <TouchableOpacity style={styles.playButton} onPress={goToQuestionScreen}>
                <Text style={styles.playButtonText}>Jogar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff0077',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#ff3399',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    playButton: {
        backgroundColor: '#ff0066',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 60,
        marginTop: 20,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default JogoPersonalizado;
