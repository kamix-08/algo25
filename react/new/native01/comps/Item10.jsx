import { TouchableOpacity, View } from 'react-native'

const Item10 = ({color, onPress}) => {
    return (
        <TouchableOpacity style={{backgroundColor: color, flex: 1}} onPress={onPress} />
    )
}

export default Item10