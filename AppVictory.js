import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer } from "victory-native";

const data = [];
for (let y = 1990; y < 2016; y++) {
  for (let m = 1; m < 13; m++) {
    for (let d = 1; d < 21; d++) {
      data.push({ a: new Date(y, m, d), b: Math.random() * 2000 + 1000 });
    }
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
    };
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} height={300} theme={VictoryTheme.material} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={data}
            x="a"
            y="b"
          />

        </VictoryChart>
        <VictoryChart
          width={350} height={50} theme={VictoryTheme.material} scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.zoomDomain}
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis
            tickFormat={(x) => new Date(x).getFullYear()}
          />
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={data}
            x="key"
            y="b"
          />
        </VictoryChart>
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