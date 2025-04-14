import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

// FAQ Item Component
type FAQItemProps = {
  title: string;
  children: React.ReactNode;
};

const FAQItem: React.FC<FAQItemProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.faqHeader}>
        <Text style={styles.subheading}>
          {expanded ? "▼" : "▶"} {title}
        </Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.text}>{children}</Text>}
    </View>
  );
};

export default function About() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  const containerStyle: ViewStyle = {
    paddingHorizontal: isPortrait ? 20 : 60,
    paddingVertical: isPortrait ? 20 : 40,
    alignItems: isPortrait ? "stretch" : "center",
  };

  const contentStyle: ViewStyle = {
    width: isPortrait ? "100%" : "80%" as `${number}%`,
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, containerStyle]}>
      <View style={contentStyle}>
        <Text style={[styles.heading, { fontSize: isPortrait ? 22 : 26 }]}>
          Unit Converter App
        </Text>

        <FAQItem title="What is this app about?">
          Our Unit Converter app is a simple yet powerful tool that allows you to convert between different units effortlessly. Whether you need to switch between metric and imperial systems or perform quick conversions for daily use, our app has you covered!
        </FAQItem>

        <FAQItem title="Length">
          Millimeters (mm), Centimeters (cm), Meters (m), Kilometers (km), Inches (in), Feet (ft), Yards (yd), Miles (mi)
        </FAQItem>

        <FAQItem title="Weight">
          Milligrams (mg), Grams (g), Kilograms (kg), Pounds (lb), Ounces (oz)
        </FAQItem>

        <FAQItem title="Temperature">
          Celsius (°C), Fahrenheit (°F), Kelvin (K)
        </FAQItem>

        <FAQItem title="Volume">
          Milliliters (mL), Liters (L), Cups, Pints, Gallons
        </FAQItem>

        <FAQItem title="Credits">
          Developed by Bassanova Nurgul, Zhaksybek Zhannur, Ernazarov Alsalim in the scope of the course "Crossplatform Development" at Astana IT University.{"\n"}
          👨‍🏫 Mentor (Teacher): Assistant Professor Abzal Kyzyrkanov
        </FAQItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#333",
  },
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});
