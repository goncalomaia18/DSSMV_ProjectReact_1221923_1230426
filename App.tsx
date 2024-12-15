import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainActivity from './src/screens/MainActivity'; // Ajuste o caminho se necessário

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <MainActivity />
        </SafeAreaView>
    );
};

export default App;