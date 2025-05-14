import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { config } from '../../config'
const Discovery = () => {
  const navigation = useNavigation();
  const [pong, setPong] = useState('Not Ponged');
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/ping`);
      const data = await response.json();
      console.log(data);
      setPong(data.message);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const mockData = [
    { id: '1', event: 'Football: Team A vs Team B', odds: '2.5' },
    { id: '2', event: 'Basketball: Team C vs Team D', odds: '1.8' },
    { id: '3', event: 'Tennis: Player E vs Player F', odds: '1.6' },
  ];

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.navigate('index')} />
      <Text style={styles.title}>Discover Your Next Bet</Text>
      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.event}>{item.event}</Text>
            <Text style={styles.odds}>Odds: {item.odds}</Text>
          </View>
        )}
      />
      <Text>{pong}</Text>
    </View>
  )
}

export default Discovery

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  event: {
    fontSize: 18,
    fontWeight: '500',
  },
  odds: {
    fontSize: 16,
    color: '#888',
  },
})