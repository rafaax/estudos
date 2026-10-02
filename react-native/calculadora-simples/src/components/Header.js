import { styles }  from './StyleSheet' 
import { Text, View } from 'react-native';

export const Header = function() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}> Calculadora</Text> 
        </View>
    )
}
