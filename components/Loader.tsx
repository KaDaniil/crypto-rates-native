import React from 'react';
import { ActivityIndicator } from 'react-native';
import CenteringWrapper from './CenteringWrapper';

const Loader = () => (
    <CenteringWrapper>
        <ActivityIndicator size="large" color="#0000ff" />
    </CenteringWrapper>
);

export default Loader;
