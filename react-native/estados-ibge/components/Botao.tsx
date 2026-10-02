import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from "react-native";

interface BotaoProps extends TouchableOpacityProps {
    titulo:  string
}

export function Botao({titulo, ...rest} : BotaoProps) {
    return (
        <TouchableOpacity 
            style={styles.botao}
            {...rest}
        >
            <Text style={styles.legenda}>{titulo}</Text>  
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    botao: {
        backgroundColor: 'green',
        width: 200,
        height: 60,
        marginVertical: 10,
        elevation: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: "center"
    }, 
    legenda: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
  })