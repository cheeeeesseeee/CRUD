import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoanTypes from '../components/(pages)/LoanTypes';
import Home from '../components/(pages)/Home';

const stack = createStackNavigator();

export default function Navigator(){
    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName='Home'>
                <stack.Screen name='Loan Types' component={LoanTypes} />
                <stack.Screen name='Home' component={Home} />
            </stack.Navigator>
        </NavigationContainer>
    )
}
