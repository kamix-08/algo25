import { Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Image } from 'react-native'

import Icon from './../assets/splash-icon.png'

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <DrawerItem
                label='test'
                icon={() => <Image style={{ width: 50, height: 50 }} source={Icon} />}
                onPress={() => console.log('test')}
            />
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent