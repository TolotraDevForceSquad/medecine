import { TextInput, View, Text, Pressable } from "react-native";
import { useState } from "react";
import xs from "../../../assets/styles/Style";
import { API_URL } from "../../../config";
import Boo from "../../Comp/Boo";

const Login = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const login = async (user, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Connexion réussie:', data);
                setMessage('Connexion réussie');
                setShow(true);
                navigation.navigate("Med"); 
            } else {
                setMessage(data.message || 'Échec de connexion');
                setShow(true);
                console.error('Échec de connexion:', data.message);
            }
        } catch (error) {
            setMessage('Erreur réseau');
            setShow(true);
            console.error('Erreur réseau:', error);
        }
    };

    return (
        <View style={[xs.bg_main, {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }]}>
            <Text style={{
                fontSize: 25,
                margin: 10, 
            }}>Connexion</Text>
            <View style={[xs.ctn, {
                width: "80%",
            }]}>
                <Text>Nom d'utilisateur</Text>
                <TextInput style={xs.inp}
                    value={user}
                    onChangeText={setUser}
                />
                <Text>Mot de passe</Text>
                <TextInput style={xs.inp}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Pressable style={[xs.inp,{ 
                    borderColor: "#1d8cf8",
                    alignItems: "center",
                    WebkitTextFillColor: "#1d8cf8",
                }]}
                    onPress={() => {
                        if (!user || !password) {
                            setMessage("Veuillez remplir tous les champs");
                            setShow(true);
                            return;
                        }
                        login(user, password);
                    }}
                >
                    <Text>Connexion</Text>
                </Pressable>
                <Pressable style={[xs.inp,{ 
                    borderColor: "#00bf9a",
                    alignItems: "center",
                    WebkitTextFillColor: "#00bf9a",
                }]}
                    onPress={() => {
                        navigation.navigate("Sign");
                    }}
                >
                    <Text>S'Enregistrer</Text>
                </Pressable>
            </View>
            <Boo show={show} hide={() => setShow(false)} message={message} />
        </View>
    );
};

export default Login;
