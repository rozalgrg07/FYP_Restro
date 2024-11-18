import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); // Initialize the router for navigation

  const handleLogin = async () => {
    const loginData = { username, password };
  
    try {
      // Make the API call to validate credentials
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the response to JSON
      const data = await response.json();
  
      // Handle success or error based on the returned message
      if (data.status === 'success') {
        console.log('Login successful');
        router.push('/'); // Navigate to home page after successful login
      } else {
        setErrorMessage(data.message); // Display error message from server
        console.log('Login failed: ' + data.message);
      }
    } catch (error) {
      setErrorMessage('Error connecting to server or invalid response');
      console.log('Error: ' + error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/icons/logo.png")} // Add your logo path here
          style={styles.logo}
        />
      </View>
      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Display error message */}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => router.push('./Screens/AccountantScreen')} // Navigate to signup page
      >
        <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 141,
    alignItems: 'center',
    justifyContent: 'center',  // Centers everything in the container vertically and horizontally
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 0,  // Take available space for the logo
    justifyContent: 'center',  // Vertically center the logo
    alignItems: 'center',  // Horizontally center the logo
    marginBottom: 20,  // Space below the logo
  },
  logo: {
    width: 200,  // Adjust based on your logo size
    height: 100,  // Adjust based on your logo size
    resizeMode: "contain",  // Ensures the logo maintains its aspect ratio
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#be1010',
    marginBottom: 20,
    paddingLeft: 30,
    borderRadius: 30,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: '#be1010',
    borderRadius: 20,
    alignItems: 'center',
  },
  signupButton: {
    marginTop: 10,
    width: '80%',
    padding: 10,
    backgroundColor: '#be1010',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
});
