import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Login from '../../static/image/login';
import Logo from '../../static/image/logo';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../Constants/RootScreen';
import { TextInput } from 'react-native-paper';

export const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    navigation.navigate('TabNavigator' as never);
  };
  const handleSignUp = () => {
    navigation.navigate(RootScreens.SIGNIN as never);
  };
  return (
    <View style={styles.container}>
      <Login />
      <View style={styles.container1}>
        <View style={[styles.leftContainer, { flex: 8 }]}>
          <Text style={styles.sloganText}>
            Quản lý căn hộ của bạn ở bất cứ đâu
          </Text>
        </View>
        <View style={[styles.rightContainer, { flex: 5 }]}>
          <Logo />
        </View>
      </View>
      <TextInput
        style={styles.input}
        label='Email'
        onChangeText={text => setEmail(text)}
        value={email}
        mode='outlined'
      />
      <TextInput
        style={styles.input}
        label='Password'
        onChangeText={text => setPassword(text)}
        value={password}
        mode='outlined'
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={handleTogglePasswordVisibility}
            style={{
              paddingTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        }
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: '#006c49', fontSize: 14, fontWeight: 'bold' }}>
          Đăng nhập
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerLink} onPress={handleSignUp}>
        <Text style={{ color: '#434343' }}>Bạn chưa có tài khoản? </Text>
        <Text style={{ color: '#006c49' }}>Đăng ký ngay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordLink}>
        <Text style={{ color: '#434343', fontSize: 14 }}>Quên mật khẩu?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  logo: {
    width: 148,
    height: 148,
    paddingRight: 5,
  },
  sloganText: {
    color: '#434343',
    paddingLeft: 30,
    paddingTop: 20,
    fontSize: 20,
  },
  input: {
    width: 250,
    padding: 10,
    marginBottom: 5,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: 250,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006C49',
    marginTop: 40,
  },
  registerLink: {
    marginTop: 10,
    flexDirection: 'row',
  },
  forgotPasswordLink: {
    marginTop: 10,
  },
  leftContainer: {
    alignItems: 'flex-start',
  },
  rightContainer: {
    alignItems: 'center',
    paddingRight: 20,
  },
  container1: {
    flexDirection: 'row',
    marginTop: 25,
  },
});

export default SignIn;
