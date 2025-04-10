import { TextInput, View, Text, Pressable } from "react-native";
import xs from "../../../assets/styles/Style";
import { API_URL } from "../../../config";
import Boo from "../../Comp/Boo";
import { useState } from "react";

const Sign = ({ navigation }) => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const sign = async (user, password) => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Inscription réussie:', data);
            } else {
                console.error('Erreur lors de l\'inscription:', data.message);
            }
        } catch (error) {
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
            }}>S'Enregistrer</Text>
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
                <Text>Confirme mot de passe</Text>
                <TextInput style={xs.inp}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <Pressable style={[xs.inp,{ 
                    borderColor: "#00bf9a",
                    alignItems: "center",
                    WebkitTextFillColor: "#00bf9a",
                }]}
                    onPress={() => {
                        if (password !== confirmPassword) {
                            setMessage('Les mots de passe ne correspondent pas');
                            setShow(true);
                            return;
                        }
                        sign(user, password);
                        setMessage('Inscription réussie');
                        setShow(true);
                        setUser('');
                        setPassword('');
                        setConfirmPassword('');
                        navigation.navigate("Login");
                    } }
                >
                    <Text>Enregistrer</Text>
                </Pressable>
                <Pressable style={[xs.inp,{ 
                    borderColor: "#1d8cf8",
                    alignItems: "center",
                    WebkitTextFillColor: "#1d8cf8",
                }]}
                    onPress={() => {{
                        navigation.navigate("Login");
                    }}}
                >
                    <Text>Connexion</Text>
                </Pressable>
            </View>
            <Boo show={show} hide={() => setShow(false)} message={message} />
        </View>
    )
}

export default Sign;