import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Message() {
    const { id } = useLocalSearchParams()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>USer Profile - {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ee1122",
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
  },
})