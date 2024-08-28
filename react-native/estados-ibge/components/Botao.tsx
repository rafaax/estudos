import { TouchableOpacity, Text, StyleSheet} from "react-native";

export function Botao() {
    return (
        <TouchableOpacity style={styles.botao}>
            <Text style={styles.legenda}>Botão</Text>  
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