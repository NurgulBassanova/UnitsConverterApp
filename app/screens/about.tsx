import { View, Text, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📱 Unit Converter App</Text>
      <Text style={styles.text}>
        Our Unit Converter app is a simple yet powerful tool that allows you to convert between different units effortlessly. Whether you need to switch between metric and imperial systems or perform quick conversions for daily use, our app has you covered!
      </Text>

      <Text style={styles.subheading}>✅ Length</Text>
      <Text style={styles.text}>Millimeters (mm), Centimeters (cm), Meters (m), Kilometers (km), Inches (in), Feet (ft), Yards (yd), Miles (mi)</Text>

      <Text style={styles.subheading}>✅ Weight</Text>
      <Text style={styles.text}>Milligrams (mg), Grams (g), Kilograms (kg), Pounds (lb), Ounces (oz)</Text>

      <Text style={styles.subheading}>✅ Temperature</Text>
      <Text style={styles.text}>Celsius (°C), Fahrenheit (°F), Kelvin (K)</Text>

      <Text style={styles.subheading}>✅ Volume</Text>
      <Text style={styles.text}>Milliliters (mL), Liters (L), Cups, Pints, Gallons</Text>

      <Text style={styles.subheading}>🏆 Credits</Text>
      <Text style={styles.text}>
        Developed by Bassanova Nurgul, Zhaksybek Zhannur, Ernazarov Alsalim in the scope of the course "Crossplatform Development" at Astana IT University.
      </Text>
      <Text style={styles.text}>
        👨‍🏫 Mentor (Teacher): Assistant Professor Abzal Kyzyrkanov
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
