import { Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Image } from 'react-native'

import { Ionicons } from '@react-native-vector-icons/ionicons'

const CustomDrawerContent = (props) => {
    return (
        <>
            <View style={{ overflow: 'hidden' }}>
                <View style={{ position: 'absolute', backgroundColor: 'orange', width: '100%', height: 75 }}></View>
                <View style={{ backgroundColor: 'orange', height: 200, borderRadius: '50%', width: '100%', top: -25, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 15 }}>Notes App cz. 3</Text>
                    <Text style={{ color: '#6E4B57', fontSize: 16, fontWeight: 'bold' }}>MongoDB - backup - restore</Text>
                </View>
            </View>

            <DrawerContentScrollView {...props} style={{ position: 'relative', top: -40 }}>
                <DrawerItemList {...props} />

                <DrawerItem
                    label='info'
                    icon={() => <Ionicons name='information-circle' color='red' size={28} />}
                    onPress={() => alert('Notes App, v.3.0.0')}
                />
            </DrawerContentScrollView>
        </>
    )
}

export default CustomDrawerContent