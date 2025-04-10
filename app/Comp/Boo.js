import { Pressable, View, Text, StyleSheet } from "react-native";
import MyModal from "./Modal";

const Boo = ({ show, hide, message }) => { 

    return (
        <MyModal show={show} hide={hide}>
            <View style={styles.ctn_choix}> 
                <Pressable style={[styles.btn_action, {
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                }]}>
                    <Text style={styles.btn_text}>Attention</Text>
                </Pressable>
                <Pressable style={[styles.btn_action]}>
                    <Text style={[styles.btn_text, {textAlign: 'center'}]}>{message}</Text>
                </Pressable>
            </View>
        </MyModal>
    )
}

const styles = StyleSheet.create({
    btn_action: {
        padding: 10,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctn_choix: {
        backgroundColor: '#1f2251', 
        padding: 10, 
        width: '70%', 
        borderRadius: 10, 
        alignItems: "center",
        alignSelf: 'center',
    },
    btn_text: {
        color: 'white', fontWeight: 'bold',
    }
})

export default Boo;