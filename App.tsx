import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainActivity from './src/screens/MainActivity';
import JogoPersonalizado from './src/screens/JogoPersonalizado'; // Ajuste o caminho

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Stack.Navigator>
                    <Stack.Screen
                        name="MainActivity"
                        component={MainActivity}
                        options={{ title: 'Tela Inicial' }}
                    />
                    <Stack.Screen
                        name="JogoPersonalizado"
                        component={JogoPersonalizado}
                        options={{ title: 'Jogo Personalizado' }}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;
