import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    
    container: {
        flex: 1, 
        paddingTop: 40
    },

    header: {
        backgroundColor: 'grey',
        padding: 30, 
        alignItems: "center"
    },

    headerText: {
        fontSize: 30,
        color: 'white', 
        fontWeight: "bold"
    },

    input: {
        fontSize: 25, 
        padding: 10,
        margin: 5,
        backgroundColor: 'lightgrey'
    },

    result: {
        textAlign: 'center', 
        fontSize: 30, 
        marginTop: 30,  
    },

    viewButtons: {
        flexDirection: 'row',
        alignItems: "center", 
        justifyContent: 'center'
    },

    buttons: {
        backgroundColor: 'purple', 
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        margin: 5, 
        justifyContent: 'center'
    }, 
    textButtons: {
        color: 'white',
        fontWeight: 'bold', 
        fontSize: 25,
        textAlign: 'center'
    }
})