import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
    FlatList,
    Modal,
} from 'react-native';
import {
    AddPerguntaPersonalizada,
    AddConsequenciaPersonalizada,
    DeletePerguntaPersonalizada,
    FetchPerguntasPersonalizadas,
} from '../services/api';

const JogoPersonalizado = ({ goToPerguntapersonalizadoScreen }) => {
    const [novaEntrada, setNovaEntrada] = useState('');
    const [exibirInput, setExibirInput] = useState(false);
    const [tipoEntrada, setTipoEntrada] = useState('');
    const [perguntas, setPerguntas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selecionada, setSelecionada] = useState(null);

    useEffect(() => {
        const carregarPerguntas = async () => {
            try {
                const data = await FetchPerguntasPersonalizadas();
                setPerguntas(data);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar as perguntas.');
            }
        };

        carregarPerguntas();
    }, []);

    // Função para salvar Verdade
    const handleSalvarPergunta = async () => {
        if (!novaEntrada.trim()) {
            Alert.alert('Erro', 'A verdade não pode estar vazia!');
            return;
        }

        try {
            const novaPergunta = novaEntrada.trim(); // Salva o valor atual
            await AddPerguntaPersonalizada(novaPergunta);
            Alert.alert('Sucesso', 'Verdade adicionada com sucesso!');
            setNovaEntrada('');
            setExibirInput(false);
            setPerguntas((prevPerguntas) => [
                ...prevPerguntas,
                { id: new Date().toISOString(), perguntaspersonalizado: novaPergunta },
            ]);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a verdade.');
        }
    };

    // Função para salvar Consequência
    const handleSalvarConsequencia = async () => {
        if (!novaEntrada.trim()) {
            Alert.alert('Erro', 'A consequência não pode estar vazia!');
            return;
        }

        try {
            await AddConsequenciaPersonalizada({ consequencia: novaEntrada });
            Alert.alert('Sucesso', 'Consequência adicionada com sucesso!');
            setNovaEntrada('');
            setExibirInput(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a consequência.');
        }
    };

    // Função para salvar dependendo do tipo de entrada (Verdade ou Consequência)
    const handleSalvar = () => {
        if (tipoEntrada === 'Verdade') {
            handleSalvarPergunta();
        } else if (tipoEntrada === 'Consequência') {
            handleSalvarConsequencia();
        }
    };

    // Função para listar todas as perguntas
    const handleListarPerguntas = async () => {
        try {
            const data = await FetchPerguntasPersonalizadas();
            setPerguntas(data);
            setModalVisible(true);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as perguntas.');
        }
    };

    const handleDeletarPergunta = async () => {
        if (!selecionada) {
            Alert.alert('Erro', 'Por favor, selecione uma pergunta.');
            return;
        }

        try {
            await DeletePerguntaPersonalizada(selecionada.id);
            Alert.alert('Sucesso', 'Pergunta removida com sucesso!');
            setPerguntas((prev) => prev.filter((p) => p.id !== selecionada.id));
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover a pergunta.');
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
                        setTipoEntrada('Verdade');
                        setExibirInput(true);
                    }}
                >
                    <Text style={styles.buttonText}>Adicionar Verdade</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleListarPerguntas}>
                    <Text style={styles.buttonText}>Remover Verdade</Text>
                </TouchableOpacity>
            </View>

            {/* Seção "Consequência" */}
            <Text style={styles.title}>Consequência</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setTipoEntrada('Consequência');
                        setExibirInput(true);
                    }}
                >
                    <Text style={styles.buttonText}>Adicionar Consequência</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleListarPerguntas}>
                    <Text style={styles.buttonText}>Remover Consequência</Text>
                </TouchableOpacity>
            </View>

            {/* Input para Adicionar Entrada */}
            {exibirInput && (
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>
                        Digite a nova {tipoEntrada.toLowerCase()}:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={`Exemplo: ${
                            tipoEntrada === 'Verdade'
                                ? 'Conte um segredo engraçado'
                                : 'Dance por 1 minuto'
                        }`}
                        value={novaEntrada}
                        onChangeText={setNovaEntrada}
                    />
                    <View style={styles.inputButtons}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.saveButton, styles.cancelButton]}
                            onPress={() => setExibirInput(false)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Modal para remover perguntas */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Selecione uma pergunta para remover</Text>
                    <FlatList
                        data={perguntas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.listItem,
                                    item.id === selecionada?.id && styles.selectedItem,
                                ]}
                                onPress={() => setSelecionada(item)}
                            >
                                <Text>{item.pergunta}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDeletarPergunta}
                        >
                            <Text style={styles.buttonText}>Remover</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.deleteButton, styles.cancelButton]}
                            onPress={() => {
                                setModalVisible(false);
                                setSelecionada(null);
                            }}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Botão "Jogar" */}
            <TouchableOpacity style={styles.playButton} onPress={goToPerguntapersonalizadoScreen}>
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

