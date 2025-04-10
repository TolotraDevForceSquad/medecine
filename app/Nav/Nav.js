import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Pages/Login/Login";
import Med from "../Pages/Med/Med";
import Sign from "../Pages/Login/Sign";

const Stack = createStackNavigator();
const Nav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Sign" component={Sign} />
                <Stack.Screen name="Med" component={Med} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Nav;