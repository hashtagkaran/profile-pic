import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Loading...</Text>
  </View>
);
const App = () => {
  const [image, setImage] = useState(null);
  const takePicture = async (camera) => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync({options});
      setImage(data.uri);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <>
      <View>
        <Text>sfsdfsd</Text>
      </View>
    </>
  );
};
export default App;
