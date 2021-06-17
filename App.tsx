/**
 * Correct
 * https://github.com/gtg7784/Correct
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {SignInScreen, SignUpScreen} from 'screens/Auth';
import {HomeScreen} from 'screens/Home';
import {SettingScreen} from 'screens/Setting';
import {SelectBookScreen} from 'screens/Answer';
import TabBar from 'components/TabBar';
import {BLACK, MAIN} from 'utils/color';
import configureStore from 'store';

const store = configureStore();

const RootStack = createStackNavigator<RootStackType>();
const AuthStack = createStackNavigator<AuthStackType>();
const MainTab = createBottomTabNavigator<MainTabType>();
const HomeStack = createStackNavigator<HomeStackType>();
const AnswerStack = createStackNavigator<AnswerStackType>();
const SettingStack = createStackNavigator<SettingStaackType>();

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="SignInScreen" component={SignInScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </AuthStack.Navigator>
);

const HomeNavigator = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
  </HomeStack.Navigator>
);

const AnswerNavigator = () => (
  <AnswerStack.Navigator headerMode="none">
    <AnswerStack.Screen name="SelectBookScreen" component={SelectBookScreen} />
  </AnswerStack.Navigator>
);

const SettingNavigator = () => (
  <SettingStack.Navigator headerMode="none">
    <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
  </SettingStack.Navigator>
);

const MainNavigator = () => (
  <MainTab.Navigator
    tabBar={props => <TabBar {...props} />}
    tabBarOptions={{
      activeTintColor: MAIN,
      inactiveTintColor: BLACK,
    }}
    initialRouteName="HomeStack">
    <MainTab.Screen name="HomeStack" component={HomeNavigator} />
    <MainTab.Screen name="AnswerStack" component={AnswerNavigator} />
    <MainTab.Screen name="SettingStack" component={SettingNavigator} />
  </MainTab.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="LoginStack" headerMode="none">
            <RootStack.Screen name="LoginStack" component={AuthNavigator} />
            <RootStack.Screen name="MainTab" component={MainNavigator} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
