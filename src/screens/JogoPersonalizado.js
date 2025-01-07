// JogoPersonalizado.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StoreContext } from '../Store/JogoPersonalizadoStore';
import ModalPerguntasAdd from '../components/ModalPerguntasAdd';
import ModalPerguntasRemove from '../components/ModalPerguntasRemove';
import {
    addPerguntaPersonalizadaAction,
    deletePerguntaPersonalizadaAction,
    fetchPerguntasPersonalizadasAction,
} from '../PersonalizadoController/JogoPersonalizadoActions';

const JogoPersonalizado = () => {
    const { state, dispatch } = useContext(StoreContext);

    // Garante que state existe antes de tentar acessar
    const perguntas = state?.perguntas || [];

    // Renomeando para modalRemoveVisible e setModalRemoveVisible
    const [modalRemoveVisible, setModalRemoveVisible] = useState(false); // Modal para remover perguntas
    const [modalAddVisible, setModalAddVisible] = useState(false); // Modal para adicionar pergunta
    const [selecionada, setSelecionada] = useState(null);

    useEffect(() => {
        if (dispatch) {
            fetchPerguntasPersonalizadasAction(dispatch);
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jogo Personalizado</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalAddVisible(true)}>
                <Text style={styles.buttonText}>Adicionar Pergunta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listButton} onPress={() => setModalRemoveVisible(true)}>
                <Text style={styles.buttonText}>Listar Perguntas</Text>
            </TouchableOpacity>

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '100%',
    },
    addButton: {
        backgroundColor: '#D81B60',
        paddingVertical: 16,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    listButton: {
        backgroundColor: '#D81B60',
        paddingVertical: 16,
        borderRadius: 8,
        flex: 1,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});
export default JogoPersonalizado;
