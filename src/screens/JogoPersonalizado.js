import React, { useEffect,useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import { AddPerguntaPersonalizada } from '../services/api';
import PerguntaPersonlizadoScreen from "./PerguntaPersonlizadoScreen";

const JogoPersonalizado = () => {
    const [novaPergunta, setNovaPergunta] = useState(''); // Texto do input
    const [exibirInput, setExibirInput] = useState(false); // Controla a exibição do campo
    const [tipoPergunta, setTipoPergunta] = useState(''); // "Verdade" ou "Consequência"
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);

    const goToQuestionScreen = () => {
        setIsQuestionScreen(true);
    };

    // Função para voltar para a tela inicial
    const goBack = () => {
        setIsQuestionScreen(false);
    };

    if (isQuestionScreen) {
        return <PerguntaPersonlizadoScreen goBack={goBack} />;
    }

    // Função para salvar a pergunta
    const handleSalvarPergunta = async () => {
        if (!novaPergunta.trim()) {
            Alert.alert('Erro', 'A pergunta não pode estar vazia!');
            return;
        }

        try {
            await AddPerguntaPersonalizada({ pergunta: novaPergunta, tipo: tipoPergunta });
            Alert.alert('Sucesso', `${tipoPergunta} adicionada com sucesso!`);
            setNovaPergunta('');
            setExibirInput(false); // Esconde o input após salvar
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a pergunta.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Seção "Verdade" */}
            <Text style={styles.title}>Verdade</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setTipoPergunta('Verdade');
                        setExibirInput(true); // Mostra o input para Verdade
                    }}
                >
                    <Text style={styles.buttonText}>Adicionar Verdade</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Remover Verdade</Text>
                </TouchableOpacity>
            </View>

            {/* Seção "Consequência" */}
            <Text style={styles.title}>Consequência</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setTipoPergunta('Consequência');
                        setExibirInput(true); // Mostra o input para Consequência
                    }}
                >
                    <Text style={styles.buttonText}>Adicionar Consequência</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Remover Consequência</Text>
                </TouchableOpacity>
            </View>

            {/* Input para Adicionar Pergunta */}
            {exibirInput && (
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>
                        Digite a nova {tipoPergunta.toLowerCase()}:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={`Exemplo: Conte um segredo engraçado.`}
                        value={novaPergunta}
                        onChangeText={setNovaPergunta}
                    />
                    <View style={styles.inputButtons}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSalvarPergunta}
                        >
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, styles.cancelButton]}
                            onPress={() => setExibirInput(false)} // Fecha o input
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Botão "Jogar" */}
            <TouchableOpacity style={styles.playButton} onPress={goToQuestionScreen}>
                <Text style={styles.playButtonText}>Jogar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default JogoPersonalizado;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D81B60',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#D81B60',
        padding: 16,
        marginTop: 10,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    playButton: {
        backgroundColor: '#D81B60',
        padding: 16,
        marginTop: 15,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    cancelButton: {
        backgroundColor: '#B00020',
    },
    inputContainer: {
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 20,
        elevation: 2, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    inputTitle: {
        fontSize: 18,
        color: '#D81B60',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
});

