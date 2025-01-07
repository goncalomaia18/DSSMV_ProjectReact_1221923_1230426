// ModalPerguntasAdd.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ModalPerguntasAdd = ({ visible, onClose, onAddPergunta }) => {
    const [novaPergunta, setNovaPergunta] = useState('');

    const handleAdicionarPergunta = () => {
        if (!novaPergunta.trim()) {
            return alert('A pergunta não pode estar vazia.');
        }
        onAddPergunta(novaPergunta);
        setNovaPergunta('');
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Adicionar Pergunta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite uma pergunta"
                        value={novaPergunta}
                        onChangeText={setNovaPergunta}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.addButton} onPress={handleAdicionarPergunta}>
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 8, width: '80%' },
    title: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
    input: { borderWidth: 1, borderRadius: 8, marginBottom: 16, padding: 8 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    addButton: { backgroundColor: 'blue', padding: 10, borderRadius: 4 },
    cancelButton: { backgroundColor: 'gray', padding: 10, borderRadius: 4 },
    buttonText: { color: 'white', textAlign: 'center' },
});

export default ModalPerguntasAdd;
