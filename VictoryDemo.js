import React from "react";
import { StyleSheet, View, Picker, Button } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictorySelectionContainer } from "victory-native";

export default class VictoryDemo extends React.Component {
  constructor() {
    super();
    this.state = { count: 50, data: [] };
  }

  componentDidMount() {
    this.changeData(50);
  }

  static navigationOptions = {
    title: 'Victory Charts Demo',
  };

  changeData(count, start = new Date(2016, 1, 1).getTime(), end = new Date().getTime()) {
    const data = [];
    const interval = (end - start) / count;
    for (let d = start; d < end; d += interval) {
      data.push({ a: new Date(d), b: Math.random() * 2000 + 1000 });
    }
    this.setState({ count: count, data: data });
  }

  selectZoom(points, bounds, props) {
    // console.error(points,bounds,props);
    this.changeData(this.state.count, new Date(bounds.x[0]).getTime(), new Date(bounds.x[1]).getTime());
    return false;
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
        <Button
          title="Reset"
          onPress={() => this.changeData(50)}
        />
        {this.state.data.length > 0 && <VictoryChart width={350} height={300} theme={VictoryTheme.material} scale={{ x: "time" }}
          containerComponent={
            <VictorySelectionContainer
              selectionDimension="x"
              onSelection={this.selectZoom.bind(this)}
            // onSelection={(a,b,c)=>console.error('bla', JSON.stringify(b))}
            // selectionStyle={{
            //   fill: "tomato", fillOpacity: 0.5,
            //   stroke: "tomato", strokeWidth: 2
            // }}
            />
          }
        >
          <VictoryLine
            style={{ data: { stroke: ({ active }) => active ? "tomato" : "gray" } }}
            data={this.state.data}
            x="a"
            y="b"
          />

        </VictoryChart>
        }
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
  }
});