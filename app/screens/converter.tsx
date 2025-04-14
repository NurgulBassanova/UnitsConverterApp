import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';

// Define all unit types
const unitTypes = {
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    mi: 1609.34,
  },
  weight: {
    mg: 0.001,
    g: 1,
    kg: 1000,
    lb: 453.592,
    oz: 28.3495,
  },
  time: {
    ms: 0.001,
    s: 1,
    min: 60,
    h: 3600,
    d: 86400,
  },
  temperature: {
    C: 1,
    F: 1,
    K: 1,
  },
};

const unitLabels: {
  [key in keyof typeof unitTypes]: { [key: string]: string }
} = {
  length: {
    mm: 'Millimeters',
    cm: 'Centimeters',
    m: 'Meters',
    km: 'Kilometers',
    mi: 'Miles',
  },
  weight: {
    mg: 'Milligrams',
    g: 'Grams',
    kg: 'Kilograms',
    lb: 'Pounds',
    oz: 'Ounces',
  },
  time: {
    ms: 'Milliseconds',
    s: 'Seconds',
    min: 'Minutes',
    h: 'Hours',
    d: 'Days',
  },
  temperature: {
    C: 'Celsius',
    F: 'Fahrenheit',
    K: 'Kelvin',
  },
};

// Special conversion for temperature
const convertTemperature = (value: number, fromUnit: string, toUnit: string) => {
  let celsius;
  // Convert to Celsius first
  switch (fromUnit) {
    case 'F':
      celsius = (value - 32) * 5/9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
    default: // Celsius
      celsius = value;
  }

  // Convert from Celsius to target unit
  switch (toUnit) {
    case 'F':
      return (celsius * 9/5) + 32;
    case 'K':
      return celsius + 273.15;
    default: // Celsius
      return celsius;
  }
};

// Simple select component
const SimpleSelect = ({ 
  value, 
  items, 
  onValueChange, 
  label 
}: { 
  value: string, 
  items: { label: string, value: string }[], 
  onValueChange: (value: string) => void,
  label: string
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedLabel = items.find(item => item.value === value)?.label || '';
  
  return (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>{selectedLabel}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    item.value === value && styles.selectedItem
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.modalItemText,
                    item.value === value && styles.selectedItemText
                  ]}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const Converter: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [currentUnitType, setCurrentUnitType] = useState<keyof typeof unitTypes>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');

  // Get available units for the current type
  const currentUnits = unitTypes[currentUnitType];
  const currentLabels = unitLabels[currentUnitType];

  

  const unitTypeItems = Object.keys(unitTypes).map(key => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key
  }));

  const unitItems = Object.keys(currentUnits).map(key => ({
    label: currentLabels[key],
    value: key
  }));

  useEffect(() => {
    // Reset units when type changes
    const units = Object.keys(currentUnits);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setOutputValue('');
  }, [currentUnitType]);

  useEffect(() => {
    if (inputValue) {
      convert();
    }
  }, [inputValue, fromUnit, toUnit, currentUnitType]);

  const convert = () => {
    const inputNumber = parseFloat(inputValue);
    if (isNaN(inputNumber)) {
      setOutputValue('');
      return;
    }
  
    if (currentUnitType === 'temperature') {
      const convertedValue = convertTemperature(inputNumber, fromUnit, toUnit);
      setOutputValue(convertedValue.toFixed(2));
    } else {
      const units = unitTypes[currentUnitType] as { [key: string]: number };
      const baseValue = inputNumber * units[fromUnit];
      const convertedValue = baseValue / units[toUnit];
      setOutputValue(convertedValue.toFixed(2));
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Unit Converter</Text>

        {/* Unit type selector */}
        <View style={styles.unitTypeContainer}>
          {unitTypeItems.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.unitTypeButton,
                currentUnitType === item.value && styles.selectedUnitTypeButton
              ]}
              onPress={() => setCurrentUnitType(item.value as keyof typeof unitTypes)}
            >
              <Text style={[
                styles.unitTypeText,
                currentUnitType === item.value && styles.selectedUnitTypeText
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter value"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />

        <View style={styles.pickerRow}>
          <SimpleSelect
            value={fromUnit}
            items={unitItems}
            onValueChange={(value) => setFromUnit(value)}
            label="From"
          />
          
          <SimpleSelect
            value={toUnit}
            items={unitItems}
            onValueChange={(value) => setToUnit(value)}
            label="To"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Convert" onPress={convert} />
        </View>

        <View style={styles.resultContainer}>
          {outputValue !== '' && (
            <Text style={styles.output}>
              Result: {outputValue} {currentLabels[toUnit]}
            </Text>
          )}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/length.png')}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  unitTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  unitTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedUnitTypeButton: {
    backgroundColor: 'tomato',
  },
  unitTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedUnitTypeText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    width: '100%',
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  conversionImage: {
    width: 100,
    height: 100,
  },
  selectContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    padding: 8,
    backgroundColor: '#eee',
    textAlign: 'center',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
  },
  selectText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#e3efff',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemText: {
    fontWeight: '600',
    color: '#0066cc',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  output: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default Converter;
