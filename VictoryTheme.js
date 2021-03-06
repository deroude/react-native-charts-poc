const colors = [
    "#aeaeaf",
    "#deaeaf",
    "#aedeaf",
    "#aefeaf",
    "#aefeaf",
    "#feaeaf",
    "#aeaeff"
];
const charcoal = "#252525";
const grey = "#969696";
const light = "#fafafa";
const shade = "#aeaeaf";

// Typography
const sansSerif =
    "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const letterSpacing = "normal";
const fontSize = 14;

// Layout
const baseProps = {
    width: 450,
    height: 300,
    padding: 50,
    colorScale: colors
};

// Labels
const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding: 10,
    fill: light,
    stroke: "transparent"
};
const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);

// Strokes
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
export const theme = {
    area: Object.assign(
        {
            style: {
                data: {
                    fill: shade,
                    stroke: light
                },
                labels: centeredLabelStyles
            }
        },
        baseProps
    ),
    axis: Object.assign(
        {
            style: {
                axis: {
                    fill: "transparent",
                    stroke: light,
                    strokeWidth: 1,
                    strokeLinecap,
                    strokeLinejoin
                },
                axisLabel: Object.assign({}, centeredLabelStyles, {
                    padding: 25
                }),
                grid: {
                    fill: "none",
                    stroke: "none",
                    pointerEvents: "painted"
                },
                ticks: {
                    fill: "transparent",
                    size: 1,
                    stroke: "transparent"
                },
                tickLabels: baseLabelStyles
            }
        },
        baseProps
    ),
    bar: Object.assign(
        {
            style: {
                data: {
                    fill: shade,
                    padding: 8,
                    strokeWidth: 0
                },
                labels: baseLabelStyles
            }
        },
        baseProps
    ),
    boxplot: Object.assign(
        {
            style: {
                max: {
                    padding: 8,
                    stroke: shade,
                    strokeWidth: 1
                },
                maxLabels: baseLabelStyles,
                median: {
                    padding: 8,
                    stroke: shade,
                    strokeWidth: 1
                },
                medianLabels: baseLabelStyles,
                min: {
                    padding: 8,
                    stroke: shade,
                    strokeWidth: 1
                },
                minLabels: baseLabelStyles,
                q1: {
                    padding: 8,
                    fill: light
                },
                q1Labels: baseLabelStyles,
                q3: {
                    padding: 8,
                    fill: light
                },
                q3Labels: baseLabelStyles
            },
            boxWidth: 20
        },
        baseProps
    ),
    candlestick: Object.assign(
        {
            style: {
                data: {
                    stroke: shade,
                    strokeWidth: 1
                },
                labels: centeredLabelStyles
            },
            candleColors: {
                positive: "#ffffff",
                negative: shade
            }
        },
        baseProps
    ),
    chart: baseProps,
    errorbar: Object.assign(
        {
            borderWidth: 8,
            style: {
                data: {
                    fill: "transparent",
                    stroke: shade,
                    strokeWidth: 2
                },
                labels: centeredLabelStyles
            }
        },
        baseProps
    ),
    group: Object.assign(
        {
            colorScale: colors
        },
        baseProps
    ),
    legend: {
        colorScale: colors,
        gutter: 10,
        orientation: "vertical",
        titleOrientation: "top",
        style: {
            data: {
                type: "circle"
            },
            labels: baseLabelStyles,
            title: Object.assign({}, baseLabelStyles, { padding: 5 })
        }
    },
    line: Object.assign(
        {
            style: {
                data: {
                    fill: "transparent",
                    stroke: shade,
                    strokeWidth: 2
                },
                labels: centeredLabelStyles
            }
        },
        baseProps
    ),
    pie: {
        style: {
            data: {
                padding: 10,
                stroke: "transparent",
                strokeWidth: 1
            },
            labels: Object.assign({}, baseLabelStyles, { padding: 20 })
        },
        colorScale: colors,
        width: 400,
        height: 400,
        padding: 50
    },
    scatter: Object.assign(
        {
            style: {
                data: {
                    fill: shade,
                    stroke: "transparent",
                    strokeWidth: 0
                },
                labels: centeredLabelStyles
            }
        },
        baseProps
    ),
    stack: Object.assign(
        {
            colorScale: colors
        },
        baseProps
    ),
    tooltip: {
        style: Object.assign({}, centeredLabelStyles, {
            padding: 5,
            pointerEvents: "none"
        }),
        flyoutStyle: {
            stroke: shade,
            strokeWidth: 1,
            fill: "#f0f0f0",
            pointerEvents: "none"
        },
        cornerRadius: 5,
        pointerLength: 10
    },
    voronoi: Object.assign(
        {
            style: {
                data: {
                    fill: "transparent",
                    stroke: "transparent",
                    strokeWidth: 0
                },
                labels: Object.assign({}, centeredLabelStyles, {
                    padding: 5,
                    pointerEvents: "none"
                }),
                flyout: {
                    stroke: shade,
                    strokeWidth: 1,
                    fill: "#f0f0f0",
                    pointerEvents: "none"
                }
            }
        },
        baseProps
    )
};