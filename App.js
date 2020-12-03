import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
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
  const [code, setCode] = useState(null);
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
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.camera}>Here is your new picture</Text>
          <Image
            style={styles.clicked}
            source={{uri: image, width: '100%', height: '80%'}}
          />
          <Button title={'Click New picture'} onPress={() => setImage(null)} />
        </View>
      ) : (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'longer text to user camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.warn(
              JSON.stringify(barcodes[0].type) +
                ' : ' +
                JSON.stringify(barcodes[0].data),
            );
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio',
            message: 'longer text to user audio',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View>
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.capture}>
                  <Text>SNAP</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
      <Text>{code}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0a79df',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: 'orange',
  },
  camera: {
    backgroundColor: '#3498db',
    color: '#fff',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25,
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
export default App;
