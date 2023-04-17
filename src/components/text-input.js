import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../assets/styles/colors'
import Icon from 'react-native-vector-icons/FontAwesome';

const TextInputField = ({ placeholder, icon, text, setText }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <View style={styles.mainContainer}>
            <>
                <TextInput

                    placeholder={placeholder}
                    value={text}
                    onChangeText={text => setText(text)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                        width: "100%",
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: isFocused ? Colors.greenColor : Colors.gray,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: '8%',
                        backgroundColor: 'red'
                    }}
                >
                    <Icon name={icon} size={20} color="gray" style={{ marginRight: 10 }} />
                </TextInput>
                {isFocused && <Text style={{ position: 'absolute', top: -10, left: 25, backgroundColor: Colors.background, paddingHorizontal: "5%" }}>{placeholder}</Text>}
            </>
        </View>
    )
}

export default TextInputField

const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: 'center',
        width: '70%',
        height: 40,
        marginTop: '3%'
    },
})