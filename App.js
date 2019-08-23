import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

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
              data={[
                { a: new Date(1982, 1, 1), b: 125 },
                { a: new Date(1987, 1, 1), b: 257 },
                { a: new Date(1993, 1, 1), b: 345 },
                { a: new Date(1997, 1, 1), b: 515 },
                { a: new Date(2001, 1, 1), b: 132 },
                { a: new Date(2005, 1, 1), b: 305 },
                { a: new Date(2011, 1, 1), b: 270 },
                { a: new Date(2015, 1, 1), b: 470 }
              ]}
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
              data={[
                { key: new Date(1982, 1, 1), b: 125 },
                { key: new Date(1987, 1, 1), b: 257 },
                { key: new Date(1993, 1, 1), b: 345 },
                { key: new Date(1997, 1, 1), b: 515 },
                { key: new Date(2001, 1, 1), b: 132 },
                { key: new Date(2005, 1, 1), b: 305 },
                { key: new Date(2011, 1, 1), b: 270 },
                { key: new Date(2015, 1, 1), b: 470 }
              ]}
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