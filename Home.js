import React from 'react';
import {
    View,
    Button
  } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Charts Demo',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <Button
                    title="Victory Demo"
                    onPress={() => navigate('Victory')}
                />
                <Button
                    title="Wrapper Demo"
                    onPress={() => navigate('Wrapper')}
                />
            </View>
        );
    }
}