import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

//https://github.com/wuxudong/react-native-charts-wrapper/tree/master/Example/app

import { BarChart } from 'react-native-charts-wrapper';

const data = [];
for (let y = 1990; y < 2016; y++) {
  for (let m = 1; m < 13; m++) {
    for (let d = 1; d < 21; d++) {
      data.push({
        //  x: new Date(y, m, d).getTime(), 
         y: Math.random() * 2000 + 1000 
        });
    }
  }
}

export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <BarChart style={styles.chart}
            // xAxis={{
            //   valueFormatter: data.map(d => 'a'),
            //   position: 'BOTTOM',
            //   // granularityEnabled: true,
            //   // granularity: 1,
            //   // labelCount: 5,
            // }}
            data={{ dataSets: [{ label: "demo", values: data }] }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});