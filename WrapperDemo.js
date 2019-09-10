import React from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  ImageBackground,
  View, processColor,
  PanResponder
} from 'react-native';
import data from './data'

//https://github.com/wuxudong/react-native-charts-wrapper/tree/master/Example/app

import { LineChart } from 'react-native-charts-wrapper';

const ranges = {
  '3y': { start: new Date(2017, 1, 1).getTime(), end: new Date().getTime() },
  'ytd': { start: new Date(2019, 1, 1).getTime(), end: new Date().getTime() },
  '6m': { start: new Date(2019, 3, 1).getTime(), end: new Date().getTime() },
};

export default class WrapperDemo extends React.Component {
  static navigationOptions = {
    title: 'ChartsWrapper Demo',
  };
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


  changeData(count, start = new Date(2016, 1, 1).getTime(), end = new Date().getTime()) {
    const ndata = data.filter(d => {
      const dday = new Date(d.day).getTime();
      return dday > start && dday < end;
    }).map(d => ({ x: new Date(d.day).getTime(), y: d.value }));
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
          {this.state.data.length > 0 && <View {...this._panResponder.panHandlers} style={styles.container}>
            <LineChart style={styles.chart}
              legend={{ enabled: false }}
              xAxis={{
                valueFormatter: 'date',
                valueFormatterPattern: 'YYYY-M',
                position: 'BOTTOM',
                granularityEnabled: true,
                granularity: 1,
                labelCount: 5,
                drawGridLines: false,
                gridColor: processColor('white'),
                textColor: processColor('white'),
              }}
              yAxis={{
                left: {
                  drawGridLines: false,
                  gridColor: processColor('white'),
                  textColor: processColor('white'),
                },
                right: { enabled: false }
              }}
              data={{
                dataSets: [{
                  label: "demo", values: this.state.data,
                  config: {
                    drawCircles: false,
                    drawCircleHole: false,
                    circleColor: processColor('white'),
                    drawValues: false,
                    drawFilled: true,
                    fillColor: processColor('#fafaf3'),
                    fillAlpha: 700,
                    color: processColor('white'),
                    barShadowColor: processColor('lightgrey'),
                    drawHighlightIndicators: true,
                    drawHorizontalHighlightIndicator: false,
                    highlightLineWidth: 10,
                    highlightColor: processColor('gray')
                  }
                }]
              }}
              chartDescription={{ text: '' }}
              dragEnabled={false}
              scaleEnabled={false}
              scaleXEnabled={false}
              scaleYEnabled={false}
              pinchZoom={false}
              doubleTapToZoomEnabled={false}
              marker={{
                enabled: true,
                digits: 2,
                backgroundTint: processColor('gray'),
                markerColor: processColor('navy'),
                textColor: processColor('white'),
                textSize: 14
              }}
            />
          </View>}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chart: {
    height: 250
  }
});