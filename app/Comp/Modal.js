import React from "react";
import { View, Modal, Pressable } from "react-native";

const MyModal = ({ show, hide, anim, children }) => {
    return (
        <Modal animationType={anim} visible={show} onRequestClose={hide} transparent={true}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Pressable style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#00000099',
                    position: 'absolute',
                }}
                onPress={hide}
                >   
                </Pressable>
                {children}
            </View>
        </Modal>
    )
}

export default MyModal;