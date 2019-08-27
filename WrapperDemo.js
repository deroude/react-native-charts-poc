import React from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  View, processColor
} from 'react-native';

//https://github.com/wuxudong/react-native-charts-wrapper/tree/master/Example/app

import { LineChart } from 'react-native-charts-wrapper';


export default class WrapperDemo extends React.Component {
  static navigationOptions = {
    title: 'ChartsWrapper Demo',
  };
  constructor() {
    super();
    this.state = { count: 50, data: [] };
  }
  componentDidMount() {
    this.changeData(50);
  }

  changeData(count) {
    const data = [];
    const start = new Date(2016, 1, 1).getTime();
    const end = new Date().getTime();
    const interval = (end - start) / count;
    for (let d = start; d < end; d += interval) {
      data.push({ x: new Date(d).getTime(), y: Math.random() * 2000 + 1000 });
    }
    this.setState({ count: count, data: data });
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.count || 50}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.changeData(itemValue)
          }>
          <Picker.Item label='50' value={50} />
          <Picker.Item label='500' value={5000} />
          <Picker.Item label='5000' value={50000} />
        </Picker>
        <LineChart style={styles.chart}
          legend={{ enabled: false }}
          xAxis={{
            valueFormatter: 'date',
            valueFormatterPattern: 'YYYY-M',
            position: 'BOTTOM',
            granularityEnabled: true,
            granularity: 1,
            labelCount: 5,
          }}
          data={{ dataSets: [{ label: "demo", values: this.state.data }] }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  chart: {
    width: 350,
    height: 300
  }
});