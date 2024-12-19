import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainActivity from './src/screens/MainActivity';
import PerguntaScreen from './src/screens/PerguntaScreen';
import ConsequenciaScreen from './src/screens/ConsequenciaScreen';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('home'); // Controla a navegação entre telas

    // Funções de navegação
    const goToQuestionScreen = () => setCurrentScreen('question');
    const goToConsequenceScreen = () => setCurrentScreen('consequence');
    const goBackToHome = () => setCurrentScreen('home'); // Voltar para a tela inicial

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />

            {currentScreen === 'home' && <MainActivity goToQuestionScreen={goToQuestionScreen} />}

            {currentScreen === 'question' && (
                <PerguntaScreen
                    goBack={goBackToHome}  // Passando goBack para voltar à tela inicial
                    goToConsequenceScreen={goToConsequenceScreen}
                />
            )}

            {currentScreen === 'consequence' && (
                <ConsequenciaScreen
                    onRespondeuConsequencia={goToQuestionScreen}
                />
            )}
        </SafeAreaView>
    );
};

export default App;