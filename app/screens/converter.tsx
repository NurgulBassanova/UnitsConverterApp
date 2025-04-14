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

// Оставляем только 5 основных единиц измерения
const lengthUnits = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  mi: 1609.34,
};

const unitLabels: { [key in keyof typeof lengthUnits]: string } = {
  mm: 'Millimeters',
  cm: 'Centimeters',
  m: 'Meters',
  km: 'Kilometers',
  mi: 'Miles',
};

// Простой селектор, похожий на HTML <select>
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
  const [fromUnit, setFromUnit] = useState<keyof typeof lengthUnits>('m');
  const [toUnit, setToUnit] = useState<keyof typeof lengthUnits>('cm');

  const unitItems = Object.keys(lengthUnits).map(key => ({
    label: unitLabels[key as keyof typeof lengthUnits],
    value: key
  }));

  useEffect(() => {
    if (inputValue) {
      convertLength();
    }
  }, [inputValue, fromUnit, toUnit]);

  const convertLength = () => {
    const inputNumber = parseFloat(inputValue);
    if (isNaN(inputNumber)) {
      setOutputValue('');
      return;
    }

    const valueInMeters = inputNumber * lengthUnits[fromUnit];
    const convertedValue = valueInMeters / lengthUnits[toUnit];
    setOutputValue(convertedValue.toFixed(2));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Unit Converter</Text>

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
            onValueChange={(value) => setFromUnit(value as keyof typeof lengthUnits)}
            label="From"
          />
          
          <SimpleSelect
            value={toUnit}
            items={unitItems}
            onValueChange={(value) => setToUnit(value as keyof typeof lengthUnits)}
            label="To"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Convert" onPress={convertLength} />
        </View>

        <View style={styles.resultContainer}>
          {outputValue !== '' && (
            <Text style={styles.output}>
              Result: {outputValue} {unitLabels[toUnit]}
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