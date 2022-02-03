import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '650466088403-ntrp2rd06bp5fs7q36shm1rn2ksfeedf.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  const googleSignInFnc = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      console.log('Google');
      const {idToken} = await GoogleSignin.signIn();
      console.log('Google1');
      console.log(idToken, 'userInfo');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user has canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('progress hudai xa ');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };
  // Set an initializing state whilst Firebase connects
  //const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  /* function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
 */
  /*  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []); */

  // if (initializing) return null;
  if (user) {
    return (
      <View>
        <Text>"hello world</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#000',
          backgroundColor: 'blue',
          width: 100,
          alignItems: 'center',
        }}
        onPress={googleSignInFnc}>
        <Text style={{color: '#fff'}}>SignIn with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
