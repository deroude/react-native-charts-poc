import React from "react";
import { StyleSheet, View, Picker, Button, ImageBackground, Animated, Image, PanResponder } from "react-native";
import { VictoryLine, VictoryTooltip, VictoryVoronoiContainer, VictoryLabel, VictoryBar, VictoryArea, VictoryChart, VictoryTheme, VictoryAxis, VictoryCursorContainer, createContainer, VictoryZoomContainer } from "victory-native";
import { Svg } from "react-native-svg"
import { PinchGestureHandler, PanGestureHandler } from "react-native-gesture-handler"
import { theme } from "./VictoryTheme"

const ranges = {
  '3y': { start: new Date(2017, 1, 1).getTime(), end: new Date().getTime() },
  'ytd': { start: new Date(2019, 1, 1).getTime(), end: new Date().getTime() },
  '6m': { start: new Date(2019, 3, 1).getTime(), end: new Date().getTime() },
  '1m': { start: new Date(2019, 8, 1).getTime(), end: new Date().getTime() }
};

export default class VictoryDemo extends React.Component {
  constructor() {
    super();
    this.state = { count: 50, range: '3y', data: [] };
  }

  componentDidMount() {
    this.changeData(50, ranges[this.state.range].start, ranges[this.state.range].end);
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => { },
      onPanResponderTerminate: () => { },
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onShouldBlockNativeResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (evt) => {
        const touches = evt.nativeEvent.touches;
        if (touches.length === 2) {
          if (!this.state.isZooming) {
            this.setState({ isZooming: true, zoomStart: Math.abs(touches[0].locationX - touches[1].locationX) })
          }
          this.setState({ zoomEnd: Math.abs(touches[0].locationX - touches[1].locationX) })
        }
        if (!this.state.isPanning) {
          this.setState({ isPanning: true, panStart: touches[0].locationX })
        }
        if (touches.length === 1) {
          this.setState({ panEnd: touches[0].locationX })
        }
      },
      onPanResponderRelease: (evt) => {
        if (this.state.isZooming) {
          if (this.state.zoomStart < this.state.zoomEnd) {
            //Zoom out
            this.selectNextRange();
          } else {
            this.selectPrevRange();
          }
        }
        if (this.state.isPanning) {
          if (this.state.panStart < this.state.panEnd) {
            // Pan right
            this.selectNextRange();
          } else {
            this.selectPrevRange();
          }
        }
        this.setState({
          isZooming: false,
          isPanning: false,
        });
      },
    });
  }

  static navigationOptions = {
    title: 'Victory Charts Demo',
  };

  changeData(count, start = new Date(2016, 1, 1).getTime(), end = new Date().getTime()) {
    const ndata = data.filter(d => {
      const dday = new Date(d.day).getTime();
      return dday > start && dday < end;
    }).map(d => ({ a: new Date(d.day), b: d.value }));
    this.setState({ count, data:ndata });
  }

  selectZoom(points, bounds, props) {
    // console.error(points,bounds,props);
    this.changeData(this.state.count, new Date(bounds.x[0]).getTime(), new Date(bounds.x[1]).getTime());
    return false;
  }

  selectRange(range) {
    this.setState({ range }, () =>
      this.changeData(this.state.count, ranges[range].start, ranges[range].end));
    return false;
  }

  selectNextRange() {
    const i = Object.keys(ranges).indexOf(this.state.range);
    if (i >= 0 && i + 1 < Object.keys(ranges).length) {
      this.selectRange(Object.keys(ranges)[i + 1])
    }
    return []
  }

  selectPrevRange() {
    const i = Object.keys(ranges).indexOf(this.state.range);
    if (i - 1 >= 0)
      this.selectRange(Object.keys(ranges)[i - 1])
  }

  render() {

    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://ichef.bbci.co.uk/images/ic/1280xn/p070kck4.jpg' }}
          style={styles.container}>
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
          {this.state.data.length > 0 &&
            <View {...this._panResponder.panHandlers}>
              <VictoryChart width={320} height={300} theme={theme} scale={{ x: "time" }}>
                <VictoryArea
                  labelComponent={<VictoryTooltip />}
                  labels={({ datum }) => datum.y}
                  data={this.state.data}
                  x="a"
                  y="b"

                />

              </VictoryChart>
            </View>
          }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  semi: {
    backgroundColor: "rgba(256,256,256,.3)"
  }
});