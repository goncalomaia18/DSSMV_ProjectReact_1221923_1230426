import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PerguntaScreen from "./PerguntaScreen";

const MainActivity = () => {
    const [isQuestionScreen, setIsQuestionScreen] = useState(false); // Controla a navegação

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
        return <PerguntaScreen goBack={goBack} />;
    }

    return (
        <View style={styles.container}>
            {/* Toolbar */}
            <View style={styles.toolbar}>
                <Text style={styles.toolbarTitle}>Verdade ou Consequência</Text>
            </View>

            {/* Conteúdo principal */}
            <View style={styles.mainContent}>
                <Image
                    source={require('../assets/dadossemfundo.png')}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={goToQuestionScreen}>
                        <Text style={styles.buttonText}>Verdade ou Consequência</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Verdade ou Consequência Personalizado
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEBEE',
    },
    toolbar: {
        backgroundColor: '#D81B60',
        padding: 16,
    },
    toolbarTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mainContent: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 16,
        borderRadius: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 24,
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        backgroundColor: '#D81B60',
        padding: 16,
        marginHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default MainActivity;
