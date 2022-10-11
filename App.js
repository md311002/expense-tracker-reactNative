import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';



import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import { GlobalStyles } from './constants/styles.js'
import IconButton from './components/UI/IconButton';
import reducers from './redux/reducers';

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
})

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) =>
          <IconButton
            name='add'
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense')
            }}
          />
      })}
    >
      <BottomTabs.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    < >
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name='ExpenseOverview' component={ExpenseOverview} options={{ headerShown: false }} />
            <Stack.Screen name='ManageExpense' component={ManageExpense} options={{ presentation: 'modal' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    </>
  );
}


