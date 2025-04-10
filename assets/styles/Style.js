import { StyleSheet } from "react-native";

export default StyleSheet.create({
    bg_main: {
        flex: 1,
        backgroundColor: "#171941",
        WebkitTextFillColor: "white",
        padding: 5,
    },
    titre_1: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25,
    },
    titre_2: {
        color: '#ffffff',
        fontSize: 20,
    },
    ctn: {
        backgroundColor: "#1f2251",
        padding: 30,
        borderRadius: 10,
    },
    inp: {
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#2b3553",
        borderRadius: 5,
    },
    addm: {
        position: 'absolute', 
        bottom: 11,
        right: 11,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#ffffff'
    },
    list: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        backgroundColor: '#1f2251',
        marginBottom: 15,
    },
    two_tri: {
        paddingTop: 10,
        paddingBottom: 20,
        alignContent: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },

});