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
                    color: "white" 
                }}>Formulaire medecin</Text>
                <View style={[xs.ctn, {
                    width: "80%",
                }]}>
                    <Text style={{
                        color: 'white'
                    }}>Nom</Text>
                    <TextInput
                        value={nom}
                        onChangeText={(text) => setNom(text)}
                        style={xs.inp}
                    />
                    <Text style={{
                        color: 'white'
                    }}>Nombre de jour</Text>
                    <TextInput style={xs.inp}
                        value={nbj}
                        onChangeText={(text) => setnbj(text)}
                    />
                    <Text style={{
                        color: 'white'
                    }}>Taux journalier</Text>
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
                        <Text style={{
                            color: '#1d8cf8'
                        }}>Enregistrer</Text>
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
                        <Text style={{
                            color: '#00bf9a'
                        }}>Annuler</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default AddMed;