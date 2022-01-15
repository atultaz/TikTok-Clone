import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Auth} from 'aws-amplify';

const Profile = () => {
  const logOut = () => {
    Auth.signOut();
  };
  return (
    <View>
      <Text>Profile</Text>
      <Pressable
        onPress={logOut}
        style={{
          backgroundColor: 'red',
          height: 50,
          margin: 10,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;
