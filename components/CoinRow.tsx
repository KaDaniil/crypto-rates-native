import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { coinLabelMap } from '../utils';

export const coinLabelMap = {
    rate: 'Current Rate',
    ask: 'Asking Price',
    bid: 'Bidding Price',
    diff24h: '24h Difference',
};

interface CoinRowProps {
    rowKey: keyof typeof coinLabelMap;
    rowValue?: number;
    index: number;
    total: number;
}

const CoinRow = memo(({ rowKey, rowValue, index, total }: CoinRowProps) => {
    const label = coinLabelMap[rowKey] ?? rowKey;
    return (
        <View style={[styles.row, { marginTop: index === 0 ? 0 : 20, marginBottom: index === total - 1 ? 30 : 0 }]}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{rowValue !== undefined ? rowValue.toString() : 'N/A'}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15, // Increased vertical padding
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 16, // Increased font size for better readability
    },
    value: {
        flex: 1,
        textAlign: 'right',
        fontSize: 16, // Increased font size for better readability
    },
});

export default CoinRow;
