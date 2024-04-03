import React from 'react';
import { View, StyleSheet } from 'react-native';

const CenteringWrapper = ({ children }) => {
    return <View style={styles.centeringWrapper}>{children}</View>;
};

const styles = StyleSheet.create({
    centeringWrapper: {
        flex: 1, // This makes the component expand to fill its parent, similar to height: 100%
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CenteringWrapper;
