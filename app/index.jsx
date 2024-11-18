import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const router = useRouter(); // Initialize the router for navigation

  return (
    <View style={styles.container}>
      {/* Background GIF */}
      <Image
        source={require('./../assets/images/icons/giphy.gif')}
        style={styles.backgroundGif}
        contentFit="cover"
      />
      <View style={styles.overlay}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/icons/logoF.png")} // Add your logo path here
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Welcome to Restro!</Text>
      <Text style={styles.subtitle}>Explore our menu and order easily.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundGif: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  logoContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#be1010",
    borderRadius: 40,
    width: '60%',
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});