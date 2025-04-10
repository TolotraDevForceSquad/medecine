import { Pressable, View, Text, StyleSheet } from "react-native";
import MyModal from "./Modal";
import { useMed } from "../Context/CMed";

const MyOption = ({ mod, sup }) => {
    const {
        showOption, setShowOption,
        id,
    } = useMed(); 

    return (
        <MyModal show={showOption} hide={() => setShowOption(false)}>
            <View style={styles.ctn_choix}> 
                <Pressable style={[styles.btn_action, {
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                }]} onPress={() => mod()}>
                    <Text style={styles.btn_text}>Modifier</Text>
                </Pressable>
                <Pressable style={styles.btn_action} onPress={() => sup(id)}>
                    <Text style={styles.btn_text}>Supprimer</Text>
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

export default MyOption;