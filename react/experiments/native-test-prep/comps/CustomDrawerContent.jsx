import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text } from 'react-native'

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ backgroundColor: 'orange', borderRadius: '50%', position: 'absolute', width: '150%', left: '-25%', top: -100, height: 300 }}></View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
                <Text style={{ color: 'white', fontSize: 32 }}>Notes</Text>
                <Text style={{ fontSize: 24 }}>opis</Text>
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent