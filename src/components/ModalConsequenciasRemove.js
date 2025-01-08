import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ModalConsequenciasRemove = ({ visible, consequencias, onClose, onDelete, onSelectConsequencia, selecionada }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Selecione uma Consequencia para remover</Text>
                    <FlatList
                        data={consequencias}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.listItem,
                                    selecionada?._id === item._id && styles.selectedItem,
                                ]}
                                onPress={() => onSelectConsequencia(item)}
                            >
                                <Text>{item.consequenciaspersonalizado}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                            <Text style={styles.buttonText}>Remover</Text>
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
    listItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    selectedItem: { backgroundColor: '#f0f0f0' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    deleteButton: { backgroundColor: 'red', padding: 10, borderRadius: 4 },
    cancelButton: { backgroundColor: 'gray', padding: 10, borderRadius: 4 },
    buttonText: { color: 'white', textAlign: 'center' },
});

export default ModalConsequenciasRemove;
