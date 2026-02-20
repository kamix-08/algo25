import { Text, TouchableOpacity } from 'react-native'

const Item08 = ({ color, number, pressed, setPressed }) => {
    function handlePress() {
        setPressed(p => {
            if (p == number)
                return 0
            return number
        })
    }

    return (
        <TouchableOpacity style={{ backgroundColor: color, flex: 1, justifyContent: 'center', borderWidth: 1 }} onPress={handlePress}>
            <Text style={{ color: 'black', textAlign: 'center' }}>{number}{pressed == number ? " active" : ""}</Text>
        </TouchableOpacity>
    )
}

export default Item08