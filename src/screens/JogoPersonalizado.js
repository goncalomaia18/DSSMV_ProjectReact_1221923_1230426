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

const JogoPersonalizado = () => {
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
            justifyContent: 'center', // Centralizar no eixo vertical
            alignItems: 'center', // Centralizar no eixo horizontal
            backgroundColor: '#FFF',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 32,
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 32, // Distância abaixo do título
            textAlign: 'center',
        },
        buttonContainer: {
            flexDirection: 'row', // Alinha os botões na horizontal
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%', // Garantir que o container ocupe o espaço inteiro
            maxWidth: 400, // Tamanho máximo do container para centralizar bem
        },
        button: {
            flex: 1, // Ambos os botões terão o mesmo tamanho
            backgroundColor: '#D81B60',
            paddingVertical: 16,
            borderRadius: 16, // Mantém bordas arredondadas
            marginHorizontal: 8, // Espaço entre os botões
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 16,
        },
    });

export default JogoPersonalizado;
