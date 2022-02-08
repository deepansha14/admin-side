import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Dashboard from "./app/containers/Dashboard";
import Products from "./app/containers/Products";
import Finances from "./app/containers/Finances";
import Account from "./app/containers/Account";
import Orders from "./app/containers/Orders";
import Login from "./app/containers/Login";
import Registration from "./app/containers/Registration";
import Splashscreen from "./app/containers/Splashscreen";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Finances" component={Finances} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}

        {/* Auth Navigator: Include Login and Signup */}

        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigator}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
