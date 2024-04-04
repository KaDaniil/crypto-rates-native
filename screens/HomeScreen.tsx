import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { currencyStore } from '../store/CurrencyStore';
import Loader from '../components/Loader';

const HomeScreen = observer(() => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        currencyStore.fetchCurrencies();
    }, []);

    const handleSearchChange = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredCurrencies = Object.entries(currencyStore.currencies)
        .filter(([name]) => name.toLowerCase().includes(searchTerm))
        .map(([name, data]) => ({ name, ...data }));

    if (currencyStore.isLoading) return <Loader />;
    if (currencyStore.error) return <View style={styles.centered}><Text style={styles.error}>{currencyStore.error}</Text></View>;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                onChangeText={handleSearchChange}
                placeholder="Search for a currency"
                clearButtonMode="while-editing"
            />
            <ScrollView style={styles.list}>
                {filteredCurrencies.map((item) => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.item}
                        onPress={() => navigation.navigate('Coin', { coinId: item.name })}
                    >
                        <Text style={styles.itemText}>{item.name.toUpperCase()}</Text>
                        <Text style={styles.itemSubText}>{`${item.rate.toFixed(6)}`}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 10,
    },
    list: {
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
    },
    itemSubText: {
        fontSize: 16,
        color: '#666',
    },
    error: {
        color: 'red',
    },
});

export default HomeScreen;
