import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'

export type imageObject = {
  id: number
  image: string
}

type props = {
  addimageToList: React.Dispatch<React.SetStateAction<imageObject[]>>
  setTyet: () => void
}

export const openMobileCamera = async (props: props) => {
  ;() => {}
  const { status } = await ImagePicker.requestCameraPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert(
      'Permission Required',
      'We need your permission to use the camera.'
    )
    return
  }

  const result = await ImagePicker.launchCameraAsync({
    // mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    aspect: [11, 15]
  })

  if (!result.canceled) {
    props.addimageToList(state => [
      ...state,
      { id: state.length + 1, image: result.assets[0].uri }
    ])
    props.setTyet()
  }
}
