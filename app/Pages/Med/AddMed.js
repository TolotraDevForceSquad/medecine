import { TextInput, View, Text, Pressable, Modal } from "react-native";
import xs from "../../../assets/styles/Style";
import { useMed } from "../../Context/CMed";

const AddMed = () => {
    const {
        id, setId,
        nom, setNom,
        nbj, setnbj,
        txj, setTxj,
        showAdd, setShowAdd,
        showEdit, setShowEdit,
        add_med,
        up_med,
        clear,
    } = useMed();
    return (
        <Modal animationType={"slide"} visible={showAdd} onRequestClose={() => setShowAdd(false)} transparent={true}>
            <View style={[xs.bg_main, {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }]}>
                <Text style={{
                    fontSize: 25,
                    margin: 10, 
                }}>Ajouter un medecin</Text>
                <View style={[xs.ctn, {
                    width: "80%",
                }]}>
                    <Text>Nom</Text>
                    <TextInput
                        value={nom}
                        onChangeText={(text) => setNom(text)}
                        style={xs.inp}
                    />
                    <Text>Nombre de jour</Text>
                    <TextInput style={xs.inp}
                        value={nbj}
                        onChangeText={(text) => setnbj(text)}
                    />
                    <Text>Taux journalier</Text>
                    <TextInput style={xs.inp}
                        value={txj}
                        onChangeText={(text) => setTxj(text)}
                    />
                    <Pressable style={[xs.inp,{ 
                        borderColor: "#1d8cf8",
                        alignItems: "center",
                        WebkitTextFillColor: "#1d8cf8",
                    }]}
                        onPress={() =>{
                            if(showEdit) {
                                up_med(id, nom, nbj, txj);
                            } else {
                                add_med(nom, nbj, txj);
                            }
                        }}
                    >
                        <Text>Enregistrer</Text>
                    </Pressable>
                    <Pressable style={[xs.inp,{ 
                        borderColor: "#00bf9a",
                        alignItems: "center",
                        WebkitTextFillColor: "#00bf9a",
                    }]}
                        onPress={() => {
                            setShowAdd(false);
                            clear();
                        }}
                    >
                        <Text>Annuler</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default AddMed;