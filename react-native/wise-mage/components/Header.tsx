import { StatusBar, Text, View } from 'react-native'
import { styles} from './StyleSheet'


export const Header = function() {
    return (
        <View>
            <StatusBar barStyle='dark-content'></StatusBar>
            <Text style={styles.textHeader}>Faça sua pergunta!</Text>
        </View>
    )
} 