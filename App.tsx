import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainActivity from './src/screens/MainActivity';
import PerguntaScreen from './src/screens/PerguntaScreen';
import ConsequenciaScreen from './src/screens/ConsequenciaScreen';
import JogoPersonalizado from './src/screens/JogoPersonalizado';
import PerguntaPersonalizadoScreen from './src/screens/PerguntaPersonlizadoScreen';
import StoreProvider from './src/Store/JogoPersonalizadoStore'; // Importe o StoreProvider


const App = () => {
    const [currentScreen, setCurrentScreen] = useState('home'); // Controla a navegação entre telas

    // Funções de navegação
    const goToQuestionScreen = () => setCurrentScreen('question');
    const goToConsequenceScreen = () => setCurrentScreen('consequence');
    const goBackToHome = () => setCurrentScreen('home'); // Voltar para a tela inicial
    const goToJogoPersonalizadoScreen = () => setCurrentScreen('jogopersonalizado'); // Vai para o jogo personalizado
    const goToPerguntaPersonalizadoScreen = () => setCurrentScreen('perguntapersonalizado');



    return (
        <StoreProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />

            {currentScreen === 'home' && (
                <MainActivity
                    goToQuestionScreen={goToQuestionScreen}
                    goToJogoPersonalizadoScreen={goToJogoPersonalizadoScreen} // Passando a função de navegação
                />
            )}

            {currentScreen === 'question' && (
                <PerguntaScreen
                    goBack={goBackToHome} // Passando goBack para voltar à tela inicial
                    goToConsequenceScreen={goToConsequenceScreen}
                />
            )}

            {currentScreen === 'consequence' && (
                <ConsequenciaScreen
                    onRespondeuConsequencia={goToQuestionScreen}
                />
            )}

            {currentScreen === 'jogopersonalizado' && (
                <JogoPersonalizado
                    goToPerguntaPersonalizadoScreen={goToPerguntaPersonalizadoScreen} // Corrigir caso seja um erro de nome
                />
            )}

            {currentScreen === 'perguntapersonalizado' && (
                <PerguntaPersonalizadoScreen
                    goBack={goToJogoPersonalizadoScreen} // Verificar se goToJogoPersonalizadoScreen está definido corretamente
                />
            )}
        </SafeAreaView>
            </StoreProvider>
    );
};

export default App;
