// JogoPersonalizado.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StoreContext } from '../Store/JogoPersonalizadoStore';
import ModalPerguntasAdd from '../components/ModalPerguntasAdd';
import ModalPerguntasRemove from '../components/ModalPerguntasRemove';
import ModalConsequenciaAdd from '../components/ModalConsequenciaAdd';
import ModalConsequenciasRemove from '../components/ModalConsequenciasRemove';
import {
    addPerguntaPersonalizadaAction,
    deletePerguntaPersonalizadaAction,
    fetchPerguntasPersonalizadasAction,
    addConsequenciaPersonalizadaAction,
    deleteConsequenciaPersonalizadaAction,
    fetchConsequenciasPersonalizadasAction,
} from '../PersonalizadoController/JogoPersonalizadoActions';

const JogoPersonalizado = ({ goToPerguntaPersonalizadoScreen, goBack }) => {
    const { state, dispatch } = useContext(StoreContext);

    // Garante que state existe antes de tentar acessar
    const perguntas = state?.perguntas || [];
    const consequencias = state?.consequencias || [];

    // Renomeando para modalRemoveVisible e setModalRemoveVisible
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false); // Modal para remover perguntas
    const [modalAddVisible, setModalAddVisible] = useState(false); // Modal para adicionar pergunta
    const [modalRemoveConsequenciaVisible, setModalRemoveConsequenciaVisible] = useState(false); // Modal para remover perguntas de Consequência
    const [modalAddConsequenciaVisible, setModalAddConsequenciaVisible] = useState(false); // Modal para adicionar pergunta de Consequência
    const [selecionada, setSelecionada] = useState(null);

    useEffect(() => {
        if (dispatch) {
            fetchPerguntasPersonalizadasAction(dispatch);
            fetchConsequenciasPersonalizadasAction(dispatch);
        }
    }, [dispatch]);

    const handleAdicionarPergunta = (pergunta) => {
        addPerguntaPersonalizadaAction(dispatch, pergunta);
        setModalAddVisible(false);
    };

    const handleRemoverPergunta = () => {
        if (!selecionada) return alert('Selecione uma pergunta para remover.');
        deletePerguntaPersonalizadaAction(dispatch, selecionada);
        setSelecionada(null);
        setModalRemoveVisible(false);
    };

    const handleAdicionarConsequencia = (consequencia) => {
        addConsequenciaPersonalizadaAction(dispatch, consequencia);
        setModalAddConsequenciaVisible(false); // Fecha o modal após adicionar
    };

    const handleRemoverConsequencia = () => {
        if (!selecionada) return alert('Selecione uma consequência para remover.');
        deleteConsequenciaPersonalizadaAction(dispatch, selecionada);
        setSelecionada(null);
        setModalRemoveConsequenciaVisible(false);
    };
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.buttonText}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Jogo Personalizado</Text>
            <Text style={styles.subtitle}>Verdade</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setModalAddVisible(true)}>
                    <Text style={styles.buttonText}>Adicionar Verdade</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setModalRemoveVisible(true)}>
                    <Text style={styles.buttonText}>Remover Verdade</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Consequências</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalAddConsequenciaVisible(true)}
                >
                    <Text style={styles.buttonText}>Adicionar Consequência</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalRemoveConsequenciaVisible(true)}
                >
                    <Text style={styles.buttonText}>Remover Consequência</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button]} // Botão de "Joga"
                    onPress={goToPerguntaPersonalizadoScreen} // Função de navegação
                ><Text style={styles.buttonText}>Jogar</Text>
                </TouchableOpacity>
            </View>
            {/* Modal de Adicionar Pergunta */}
            <ModalPerguntasAdd
                visible={modalAddVisible}
                onClose={() => setModalAddVisible(false)}
                onAddPergunta={handleAdicionarPergunta}
            />

            {/* Modal de Remover Pergunta */}
            <ModalPerguntasRemove
                visible={modalRemoveVisible}
                perguntas={perguntas} // Passa a lista de perguntas
                onClose={() => setModalRemoveVisible(false)}
                onDelete={handleRemoverPergunta}
                onSelectPergunta={setSelecionada} // Define a pergunta selecionada
                selecionada={selecionada}
            />
            <ModalConsequenciaAdd
                visible={modalAddConsequenciaVisible}
                onClose={() => setModalAddConsequenciaVisible(false)}
                onAddConsequencia={handleAdicionarConsequencia} // Passa o handle para adicionar consequência
            />
            <ModalConsequenciasRemove
                visible={modalRemoveConsequenciaVisible}
                consequencias={consequencias} // Passa a lista de consequências
                onClose={() => setModalRemoveConsequenciaVisible(false)}
                onDelete={handleRemoverConsequencia}
                onSelectConsequencia={setSelecionada} // Define a consequência selecionada
                selecionada={selecionada}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 60,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row', // Botões lado a lado
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400, // Controla o tamanho máximo dos botões
        alignSelf: 'center',
        marginBottom: 16, // Espaço entre containers de botões
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16, // Alinha ao lado esquerdo
        backgroundColor: '#D81B60',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    button: {
        flex: 1,
        backgroundColor: '#D81B60',
        paddingVertical: 16,
        borderRadius: 16,
        marginHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    playButton: {
        backgroundColor: '#D81B60',
        paddingVertical: 16,
        borderRadius: 16,
        width: '60%', // Controla o tamanho horizontal do botão
        maxWidth: 250,
        alignSelf: 'center', // Centraliza na tela
        marginBottom: 32, // Espaço abaixo do botão "Jogar"
    },
});

export default JogoPersonalizado;
