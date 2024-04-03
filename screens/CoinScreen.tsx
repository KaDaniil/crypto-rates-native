import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRoute } from '@react-navigation/native';
import { currencyStore } from '../store/CurrencyStore';
import Loader from '../components/Loader';
import CoinRow from '../components/CoinRow';

const CoinScreen = observer(() => {
    const route = useRoute();
    const { coinId } = route.params;

    useEffect(() => {
        if (coinId) {
            currencyStore.fetchCurrencies();
        }
    }, [coinId]);

    if (!coinId) {
        return <Text style={styles.errorText}>Sorry, we haven't received the coinId parameter.</Text>;
    }

    const coin = currencyStore.currencies[coinId];

    if (!coin && !currencyStore.isLoading) {
        return <Text style={styles.errorText}>Sorry, we don't have the {coinId.toUpperCase()} coin.</Text>;
    }
    if (!coin) {
        return <Loader />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{coinId.toUpperCase()} Details</Text>
            <View style={styles.detailContainer}>
                {Object.entries(coin).map(([rowKey, rowValue]) => (
                    <CoinRow key={rowKey} rowKey={rowKey} rowValue={rowValue}/>
                ))}
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailContainer: {
        marginTop: 40,
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 18,
        marginTop: 20,
    },
});

export default CoinScreen;
