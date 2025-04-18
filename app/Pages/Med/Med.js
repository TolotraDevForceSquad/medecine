import { TextInput, View, Text, Pressable, ScrollView, Image } from "react-native";
import xs from "../../../assets/styles/Style";
import { useMed } from "../../Context/CMed";
import { useEffect, useState } from "react";
import AddMed from "./AddMed";
import MyOption from "../../Comp/Option";

const Med = ({ navigation }) => {
    const {
        id, setId,
        nom, setNom,
        nbj, setnbj,
        txj, setTxj,
        list_med,
        med,
        clear,
        showAdd, setShowAdd,
        showEdit, setShowEdit,
        showOption, setShowOption,
        select,
        del_med,
        get_stats,
        stats,
    } = useMed();

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        list_med();
        get_stats();
    }, []);

    // 🧠 Filtrage de la liste en fonction du terme de recherche
    const filteredMed = med.filter(i =>
        i.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.nb_jours.toString().includes(searchTerm) ||
        i.taux_journalier.toString().includes(searchTerm)
    );

    return (
        <View style={[xs.bg_main, { padding: 10 }]}>
            <View style={[xs.two_tri, {paddingBottom: 0}]}>
                <Text style={xs.titre_1}>Médecin</Text>
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                >
                    <Image source={require('../../../assets/imgs/dec.png')} style={{ width: 30, height: 30, tintColor: '#ffffff' }} />
                </Pressable>
            </View>
            <Text style={xs.titre_2}>Gérer les médecins</Text>

            <TextInput
                placeholder="Rechercher"
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={[xs.inp, { height: 40 }]}
            />

                <View style={xs.two_tri}>
                    <Text>
                        <Text style={{ 
                            fontSize: 15, color: 'white',
                        }}>Total : </Text>
                        <Text style={{ 
                            fontSize: 15, color: '#0bf019', 

                        }}>{stats.total}</Text>
                    </Text>

                    <Text>
                        <Text style={{ 
                            fontSize: 15, color: 'white',

                        }}>Min : </Text>
                        <Text style={{ 
                            fontSize: 15, color: '#0bf019', 

                        }}>{stats.min}</Text>
                    </Text>

                    <Text>
                        <Text style={{ 
                            fontSize: 15, color: 'white',

                        }}>Max : </Text>
                        <Text style={{ 
                            fontSize: 15, color: '#0bf019', 

                        }}>{stats.max}</Text>
                    </Text>
                </View>

            <ScrollView style={{ maxHeight: '80%' }} showsVerticalScrollIndicator={false}>
                {filteredMed.map((i) => (
                    <Pressable key={i.id} style={[xs.list]}
                        onPress={() => {
                            setShowOption(true);
                            select(i.id, i.nom, i.nb_jours, i.taux_journalier);
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#0bf019' }}>Dr. {i.nom}</Text>
                        <Text style={{ color: '#ffffff' }}>Nombre de jour : {i.nb_jours}</Text>
                        <Text style={{ color: '#ffffff' }}>Taux journalier : {i.taux_journalier}</Text>
                        <Text style={{ color: '#ffffff' }}>Prestation : {i.prestation}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <Pressable style={xs.addm} onPress={() => {setShowAdd(true);clear();}}>
                <Image source={require('../../../assets/imgs/ic_add.png')} style={{ width: 50, height: 50, tintColor: '#ffffff' }} />
            </Pressable>

            <MyOption
                sup={(i) => del_med(i)}
                mod={() => {
                    setShowAdd(true);
                    setShowEdit(true);
                }}
            />
            <AddMed />
        </View>
    );
};

export default Med;
