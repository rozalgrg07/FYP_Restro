// SignupScreen.js
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker"; // Import the Picker component
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Default role is 'customer'
  const [isPasswordVisible, setPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };


  const handleGoToLogin = () => {
    navigation.navigate('/login'); // Navigate to Login screen
  };

  const handleSignup = () => {
    const signupData = { username, email, password, role };

    // Call the backend API to sign up
    fetch("http://10.0.2.2:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User created successfully") {
          alert("Signup successful!");
        } else {
          alert("Signup failed: " + data.message);
        }
      })
      .catch((error) => {
        alert("Error signing up: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
       <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/icons/logo.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Sign Up to Restro</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username..."
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email address..."
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <View style={{width: '80%',}}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password..."
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={20}
            color="#be1010"
          />
        </TouchableOpacity>
      </View>

      {/* Role Picker */}
      <View style={styles.pickerContainer}>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Waiter" value="waiter" />
        <Picker.Item label="Kitchen" value="kitchen" />
        <Picker.Item label="Accountant" value="accountant" />
      </Picker>
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Link to Login screen */}
      {/* "Already Have an Account?" Link */}
      <TouchableOpacity onPress={'./login'}>
        <Text style={styles.linkText}>I Already Have Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
  iconContainer:{
      position: 'absolute',
      right: 18,
      top: 13,
      height: 20,
      width: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#be1010",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
  },
  pickerContainer: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#be1010',
    borderRadius: 30,
    marginBottom: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "#be1010",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkText: {
    color: '#be1010',
    textAlign: 'center',
    marginTop:10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});