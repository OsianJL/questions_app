import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  width?: string | number;
  children?: React.ReactNode;
}

const CustomButton = ({ 
  onPress, 
  title, 
  backgroundColor = '#fff', 
  textColor = '#000',
  disabled = false,
  width = '100%',
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? '#cccccc' : backgroundColor },
        { opacity: disabled ? 0.7 : 1 }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, 
    width: '80%',
    marginBlock: 10,
    alignSelf: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CustomButton;