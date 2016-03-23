/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.visuals.samples {
    import SelectionManager = utility.SelectionManager;
    import ValueFormatter = powerbi.visuals.valueFormatter;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
    //import AxisScale = powerbi.visuals.axisScale;
    import TextMeasurementService = powerbi.TextMeasurementService;

    export interface PulseChartConstructorOptions {
        animator?: IGenericAnimator;
        svg?: D3.Selection;
        behavior?: IInteractiveBehavior;
    }
    export interface PulseBehaviorOptions {
        layerOptions?: any[];
        clearCatcher: D3.Selection;
    }

    export interface TooltipSettings {
        dataPointColor: string;
        marginTop: number;
        timeHeight: number;
    }

    export interface PulseChartSeries extends LineChartSeries {
        name?: string;
        data: PulseChartDataPoint[];
        color: string;
        identity: SelectionId;
        width: number;
        xAxisProperties?: PulseChartXAxisProperties;
        widthOfGap: number;
    }

    export interface PulseChartTooltipData {
        value: string;
        title: string;
        description: string;
        offsetX?: number;
    }

    export interface PulseChartAnimationPosition {
        series: number;
        index: number;
    }
    export interface PulseChartPointXY {
        x: number;
        y: number;
    }

    export interface PulseChartDataPoint extends LineChartDataPoint, PulseChartPointXY {
        groupIndex: number;
        popupInfo?: PulseChartTooltipData;
        eventSize: number;
        runnerCounterValue: any;
        runnerCounterFormatString: any;
    }

    export interface PulseChartLegend extends DataViewObject {
        show?: boolean;
        showTitle?: boolean;
        titleText?: string;
        position?: LegendPosition;
    }

    export interface PulseChartPopupSettings {
        alwaysOnTop: boolean;
        showType: PulseChartPopupShow;
        width: number;
        height: number;
        color: string;
        fontSize: number;
        fontColor: string;
        showTime: boolean;
        showTitle: boolean;
        timeColor: string;
        timeFill: string;
    }

    export interface PulseChartDotsSettings {
        color: string;
        size: number;
        minSize: number;
        maxSize: number;
        transparency: number;
    }

    export function createEnumTypeFromEnum(type: any): IEnumType {
        var even: any = false;
        return createEnumType(Object.keys(type)
            .filter((key,i) => (i % 2 === even && type[key] === key && !void(even === !even)) || i % 2 !== even)
            .map(x => <IEnumMember>{ value: x, displayName: x }));
    }

    export enum PulseChartXAxisDateFormat {
        //DateAndTime = <any>'Date and time',
        DateOnly = <any>'Date only',
        TimeOnly  = <any>'Time only'
    }

    export enum PulseChartPopupShow {
        Hide = <any>'Hide',
        Selected = <any>'Selected',
        //Always  = <any>'Always',
    }

    export enum XAxisPosition {
        Center = <any>'Center',
        Bottom = <any>'Bottom',
    }

    export enum RunnerCounterPosition {
        TopLeft = <any>'Top Left',
        TopRight = <any>'Top Right'
    }

    export interface PulseChartGapsSettings {
        show: boolean;
        visibleGapsPercentage: number;
    }

    export interface PulseChartSeriesSetting {
        fill: string;
        width: number;
        showByDefault: boolean;
    }

    export interface PulseChartPlaybackSettings {
        pauseDuration: number;
        playSpeed: number;
        autoplay: boolean;
        autoplayPauseDuration: number;

        color: string;
    }

    export interface PulseChartRunnerCounterSettings {
        show: boolean;
        label: string;
        position: RunnerCounterPosition;
        fontSize: number;
        fontColor: string;
    }

    export interface PulseChartAxisSettings {
        fontColor: string;
        color: string;
        show: boolean;
    }

    export interface PulseChartXAxisSettings extends PulseChartAxisSettings {
        position: XAxisPosition;
        dateFormat?: PulseChartXAxisDateFormat;
        formatterOptions?: ValueFormatterOptions;
    }

    export interface PulseChartYAxisSettings extends PulseChartAxisSettings {
    }

    export interface PulseChartSettings {
        formatStringProperty: DataViewObjectPropertyIdentifier;
        displayName?: string;
        dots: PulseChartDotsSettings;
        fillColor?: string;
        precision: number;
        legend?: PulseChartLegend;
        colors?: IColorPalette;
        series: PulseChartSeriesSetting;
        popup: PulseChartPopupSettings;
        gaps: PulseChartGapsSettings;
        xAxis: PulseChartXAxisSettings;
        yAxis: PulseChartYAxisSettings;
        runnerCounter: PulseChartRunnerCounterSettings;
        playback: PulseChartPlaybackSettings;
    }

    export interface PulseChartData {
        columns: PulseChartDataRoles<DataViewCategoricalColumn>;
        categoryMetadata: DataViewMetadataColumn;
        hasHighlights?: boolean;

        series: PulseChartSeries[];
        isScalar?: boolean;
        dataLabelsSettings: PointDataLabelsSettings;
        axesLabels: ChartAxesLabels;
        hasDynamicSeries?: boolean;
        defaultSeriesColor?: string;
        categoryData?: LineChartCategoriesData[];

        categories: any[];
        legendData?: LegendData;

        grouped: DataViewValueColumnGroup[];

        xScale?: D3.Scale.GenericScale<D3.Scale.TimeScale | D3.Scale.LinearScale>;
        commonYScale?: D3.Scale.LinearScale;
        yScales?: D3.Scale.LinearScale[];

        yAxis?: D3.Svg.Axis;

        // yAxisProperties?: IAxisProperties;
        settings?: PulseChartSettings;
        widthOfXAxisLabel: number;
        widthOfTooltipValueLabel: number;
        heightOfTooltipDescriptionTextLine: number;
    }

    export interface PulseChartProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }

    export interface PulseChartProperties {
        [objectName: string]: PulseChartProperty;
    }

    export interface PulseChartXAxisProperties {
        values: (Date | number)[];
        scale: D3.Scale.TimeScale;
        axis: D3.Svg.Axis;
        rotate: boolean;
    }

    export interface PulseChartPoint {
        x: number;
        value: Date | number;
    }

    export interface PulseChartDataRoles<T> {
        Timestamp?: T;
        Category?: T;
        Value?: T;
        EventTitle?: T;
        EventDescription?: T;
        EventSize?: T;
        RunnerCounter?: T;
    }

    export interface PulseChartElementDimensions {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export class PulseChart implements IVisual {

        public static RoleDisplayNames = <PulseChartDataRoles<string>> {
            Timestamp: "Timestamp",
            Category: "Category",
            Value: "Value",
            EventTitle: "Event Title",
            EventDescription: "Event Description",
            EventSize: "Event Size",
            RunnerCounter: "Runner Counter",
        };

        public static RoleNames = <PulseChartDataRoles<string>>_.mapValues(PulseChart.RoleDisplayNames, (x, i) => i);

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    displayName: PulseChart.RoleDisplayNames.Timestamp,
                    name: PulseChart.RoleNames.Timestamp,
                    kind: powerbi.VisualDataRoleKind.Grouping
                },
                {
                    displayName: PulseChart.RoleDisplayNames.Value,
                    name: PulseChart.RoleNames.Value,
                    kind: powerbi.VisualDataRoleKind.Measure
                },
                /* Temporary disabled
                {
                    displayName: PulseChart.RoleDisplayNames.Category,
                    name: PulseChart.RoleNames.Category,
                    kind: powerbi.VisualDataRoleKind.Grouping
                },*/
                {
                    displayName: PulseChart.RoleDisplayNames.EventTitle,
                    name: PulseChart.RoleNames.EventTitle,
                    kind: powerbi.VisualDataRoleKind.GroupingOrMeasure
                },
                {
                    displayName: PulseChart.RoleDisplayNames.EventDescription,
                    name: PulseChart.RoleNames.EventDescription,
                    kind: powerbi.VisualDataRoleKind.GroupingOrMeasure
                },
                {
                    displayName: PulseChart.RoleDisplayNames.EventSize,
                    name: PulseChart.RoleNames.EventSize,
                    kind: powerbi.VisualDataRoleKind.GroupingOrMeasure
                },
                {
                    displayName: PulseChart.RoleDisplayNames.RunnerCounter,
                    name: PulseChart.RoleNames.RunnerCounter,
                    kind: powerbi.VisualDataRoleKind.GroupingOrMeasure
                },
            ],
            dataViewMappings: [{
                conditions: <any>[
                    <PulseChartDataRoles<NumberRange>> {
                        Timestamp: { max: 1 },
                        Value: { max: 1 },
                        Category: { max: 1 },
                        EventTitle: { max: 1 },
                        EventDescription: { max: 1 },
                        EventSize: { max: 1 },
                        RunnerCounter: { max: 1 },
                    }
                ],
                categorical: {
                    categories: {
                        for: { in: PulseChart.RoleNames.Timestamp },
                        dataReductionAlgorithm: { top: { count: 10000 } }
                    },
                    values: {
                        group: {
                            by: PulseChart.RoleNames.Category,
                            select: [
                                { bind: { to: PulseChart.RoleNames.Value } },
                                { bind: { to: PulseChart.RoleNames.EventTitle } },
                                { bind: { to: PulseChart.RoleNames.EventDescription } },
                                { bind: { to: PulseChart.RoleNames.EventSize } },
                                { bind: { to: PulseChart.RoleNames.RunnerCounter } },
                            ],
                            dataReductionAlgorithm: { top: {} }
                        },
                    },
                },
            }],
            objects: {
                series: {
                    displayName: "Series",
                    description: "Series",
                    properties: {
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: {
                                fill: {
                                    solid: {
                                        color: true
                                    }
                                }
                            }
                        },
                        width: {
                            displayName: 'Width',
                            type: {
                                numeric: true
                            }
                        },
                        showByDefault: {
                            displayName: 'Show by default',
                            type: {
                                bool: true
                            }
                        }
                    }
                },
                gaps: {
                    displayName: "Gaps",
                    description: "Gaps",
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        transparency: {//visibleGapsPercentage
                            displayName: 'Visible gaps',
                            type: { numeric: true }
                        },
                    }
                },
                general: {
                    displayName: 'General',
                    properties: {
                        formatString: { type: { formatting: { formatString: true } } },
                        fill: {
                            displayName: 'Background color',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                popup: {
                    displayName: 'Popup',
                    properties: {
                        alwaysOnTop: {
                            displayName: 'Always on top',
                            type: { bool: true }
                        },
                        showType: {
                            displayName: "Show",
                            type: { enumeration: createEnumTypeFromEnum(PulseChartPopupShow) }
                        },
                        width: {
                            displayName: 'Width',
                            type: {
                                numeric: true
                            }
                        },
                        height: {
                            displayName: 'Height',
                            type: {
                                numeric: true
                            }
                        },
                        color: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: "Text size",
                            type: { formatting: { fontSize: true } }
                        },
                        fontColor: {
                            displayName: "Text color",
                            type: { fill: { solid: { color: true } } }
                        },
                        showTime: {
                            displayName: 'Show time',
                            type: { bool: true }
                        },
                        showTitle: {
                            displayName: 'Show title',
                            type: { bool: true }
                        },
                        timeColor: {
                            displayName: "Time color",
                            type: { fill: { solid: { color: true } } }
                        },
                        timeFill: {
                            displayName: "Time fill",
                            type: { fill: { solid: { color: true } } }
                        },
                    }
                },
                dots: {
                    displayName: 'Dots',
                    properties: {
                        color: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        },
                        minSize: {
                            displayName: "Min Size",
                            type: { numeric: true }
                        },
                        maxSize: {
                            displayName: "Max Size",
                            type: { numeric: true }
                        },
                        size: {
                            displayName: "Default Size",
                            type: { numeric: true }
                        },
                        transparency: {
                            displayName: 'Transparency',
                            type: { numeric: true }
                        },
                    }
                },
                xAxis: {
                    displayName: data.createDisplayNameGetter('Visual_XAxis'),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        position: {
                            displayName: "Position",
                            type: { enumeration: createEnumTypeFromEnum(XAxisPosition) }
                        },
                        fontColor: {
                            displayName: "Font Color",
                            type: { fill: { solid: { color: true } } }
                        },
                        color: {
                            displayName: "Axis Color",
                            type: { fill: { solid: { color: true } } }
                        },
                        /*dateFormat: {
                            displayName: "Date format",
                            type: { enumeration: createEnumTypeFromEnum(PulseChartXAxisDateFormat) }
                        }*/
                    }
                },
                yAxis: {
                    displayName: data.createDisplayNameGetter('Visual_YAxis'),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        fontColor: {
                            displayName: "Font Color",
                            type: { fill: { solid: { color: true } } }
                        },
                        color: {
                            displayName: "Axis Color",
                            type: { fill: { solid: { color: true } } }
                        },
                    }
                },
                playback: {
                    displayName: 'Playback',
                    properties: {
                        autoplay: {
                            displayName: "Autoplay",
                            type: { bool: true }
                        },
                        playSpeed: {
                            displayName: "Speed (dots/sec)",
                            type: { numeric: true }
                        },
                        pauseDuration: {
                            displayName: "Pause Duration",
                            type: { numeric: true }
                        },
                        autoplayPauseDuration: {
                            displayName: "Start Delay",
                            type: { numeric: true }
                        },
                        color: {
                            displayName: "Buttons Color",
                            type: { fill: { solid: { color: true } } }
                        },
                    }
                },
                runnerCounter: {
                    displayName: 'Runner Counter',
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        label: {
                            displayName: "Label",
                            type: { text: true }
                        },
                        position: {
                            displayName: "Position",
                            type: { enumeration: createEnumTypeFromEnum(RunnerCounterPosition) }
                        },
                        fontSize: {
                            displayName: "Text Size",
                            type: { formatting: { fontSize: true } }
                        },
                        fontColor: {
                            displayName: "Font Color",
                            type: { fill: { solid: { color: true } } }
                        },
                    }
                },
            },
            sorting: {
                implicit: {
                    clauses: [{
                            role: PulseChart.RoleNames.Timestamp,
                            direction: 1//SortDirection.Ascending
                        }]
                }
            }
        };

        private static Properties: PulseChartProperties = PulseChart.getProperties(PulseChart.capabilities);
        public static getProperties(capabilities: VisualCapabilities): any {
            var result = {};
            for(var objectKey in capabilities.objects) {
                result[objectKey] = {};
                for(var propKey in capabilities.objects[objectKey].properties) {
                    result[objectKey][propKey] = <DataViewObjectPropertyIdentifier> {
                        objectName: objectKey,
                        propertyName: propKey
                    };
                }
            }

            return result;
        }
        /*
        private static GetAxisTextProperties(text?: string, fontSizeValue = 11): TextProperties {
            return {
                text: text || "",
                fontFamily: "Segoe UI,Tahoma,Verdana,Geneva,sans-serif",
                fontSize: fontSizeValue + "px",
                fontSizeValue: fontSizeValue
            };
        }
        */

        private static GetPopupValueTextProperties(text?: string, fontSizeValue = 12): TextProperties {
            return {
                text: text || "",
                fontFamily: "sans-serif",
                fontSize: fontSizeValue + "px",
                fontSizeValue: fontSizeValue
            };
        }

         private static GetPopupTitleTextProperties(text?: string, fontSizeValue = 12): TextProperties {
             return {
                 text: text || "",
                 fontFamily: "sans-serif",
                 fontWeight: "bold",
                 fontSize: fontSizeValue + "px",
                 fontSizeValue: fontSizeValue
             };
        }

        private static GetPopupDescriptionTextProperties(text?: string, fontSizeValue = 12): TextProperties {
            return {
                text: text || "",
                fontFamily: "sans-serif",
                fontSize: fontSizeValue + "px",
                fontSizeValue: fontSizeValue
            };
        }

        public static GetRunnerCounterTextProperties(text?: string, fontSizeValue = 12): TextProperties {
            return {
                fontFamily: "sans-serif",
                fontSize:  fontSizeValue + "px",
                fontSizeValue: fontSizeValue
            };
        }

        public static ConvertTextPropertiesToStyle(textProperties: TextProperties): Object {
            return {
                 'font-family': textProperties.fontFamily,
                 'font-weight': textProperties.fontWeight,
                 'font-size': textProperties.fontSize
             };
        }

        private static GetDateTimeFormatString(dateFormatType: PulseChartXAxisDateFormat, dateFormat: string): string {
            switch(dateFormatType) {
                //case PulseChartXAxisDateFormat.DateAndTime: return "d.M.yyyy H:mm";
                case PulseChartXAxisDateFormat.DateOnly: return dateFormat;
                case PulseChartXAxisDateFormat.TimeOnly: return "H:mm";
                default: return "";
            };
        }

        private static GetFullWidthOfDateFormat(dateFormat: string, textProperties: TextProperties): number {
            textProperties.text = valueFormatter.create({ format: dateFormat }).format(new Date(2000,10,20,20,20,20));
            return TextMeasurementService.measureSvgTextWidth(textProperties);
        }

        private static DefaultSettings: PulseChartSettings = {
            precision: 0,
            popup: {
                alwaysOnTop: false,
                showType: PulseChartPopupShow.Selected,
                width: 100,
                height: 80,
                color: "#808181",
                fontSize: 10,
                fontColor: 'white',
                showTime: true,
                showTitle: true,
                timeColor: 'white',
                timeFill: '#010101',
            },
            dots: {
                color: "#808181",
                size: 5,
                minSize: 5,
                maxSize: 20,
                transparency: 80,
            },
            gaps: {
                show: false,
                visibleGapsPercentage: 1
            },
            series: {
                fill: '#3779B7',
                width: 2,
                showByDefault: true,
            },
            xAxis: {
                color: "#777777",
                fontColor: "#777777",
                position: XAxisPosition.Center,
                show: true,
                dateFormat: PulseChartXAxisDateFormat.TimeOnly
            },
            yAxis: {
                color: "#777777",
                fontColor: "#777777",
                show: true
            },
            playback: {
                autoplay: false,
                playSpeed: 5,
                pauseDuration: 10,
                autoplayPauseDuration: 0,
                color: "#777",
            },
            runnerCounter: {
                show: true,
                label: "",
                position: RunnerCounterPosition.TopRight,
                fontSize: 13,
                fontColor: "#777777"
            },
            formatStringProperty: PulseChart.Properties["general"]["formatString"]
        };

        private static MaxWidthOfYAxis: number = 50;
        private static PopupTextPadding: number = 3;
        private static XAxisTickSpace: number = 15;
        private static XAxisTickHeight: number = 16;
        private static MinimumTicksToRotate:  number = 3;
        private static AxisTickRotateAngle: number = -35;

        public data: PulseChartData;
        public margin: IMargin;
        public viewport: IViewport;
        public size: IViewport;

        private svg: D3.Selection;
        private chart: D3.Selection;
        private dots: D3.Selection;
        private yAxis: D3.Selection;
        private gaps: D3.Selection;

        private animationDot: D3.Selection;
        private lineX: D3.Svg.Line;
        private selectionManager: SelectionManager;
        private animator: IGenericAnimator;
        private animationHandler: PulseAnimator;
        private behavior: IInteractiveBehavior;
        private colors: IDataColorPalette;
        private host: IVisualHostServices;

        private static DefaultMargin: IMargin = {
            top: 120,
            bottom: 100,
            right: 45,
            left: 45,
        };

        private static DefaultViewport: IViewport = {
            width: 50,
            height: 50
        };

        private static DefaultTooltipSettings: TooltipSettings = {
            dataPointColor: "#808181",
            marginTop: 20,
            timeHeight: 15,
        };

        private static MinGapWidth = <[number]>_.object(<any>[[
            PulseChartXAxisDateFormat.DateOnly, 60 * 1000 * 24], [
            PulseChartXAxisDateFormat.TimeOnly, 60 * 1000],
            ], undefined);

        //private static MaxCountOfTicksOnYAxis: number = 10;

        private lastSelectedPoint: SelectionId;

        private static Chart: ClassAndSelector = createClassAndSelector('chart');
        private static Line: ClassAndSelector  = createClassAndSelector('line');
        private static LineContainer: ClassAndSelector = createClassAndSelector('lineContainer');
        private static LineNode: ClassAndSelector = createClassAndSelector('lineNode');
        //private static Axis: ClassAndSelector = createClassAndSelector('axis');
        private static XAxisNode: ClassAndSelector = createClassAndSelector('xAxisNode');
        private static Dot: ClassAndSelector  = createClassAndSelector('dot');
        private static DotsContainer: ClassAndSelector  = createClassAndSelector('dotsContainer');
        private static Tooltip: ClassAndSelector = createClassAndSelector('Tooltip');
        private static TooltipRect: ClassAndSelector = createClassAndSelector('tooltipRect');
        private static TooltipTriangle: ClassAndSelector = createClassAndSelector('tooltipTriangle');
        private static Gaps: ClassAndSelector = createClassAndSelector("gaps");
        private static Gap: ClassAndSelector = createClassAndSelector("gap");
        private static GapNode: ClassAndSelector = createClassAndSelector("gapNode");
        private static TooltipLine: ClassAndSelector = createClassAndSelector('tooltipLine');
        private static TooltipTime: ClassAndSelector = createClassAndSelector('tooltipTime');
        private static TooltipTimeRect: ClassAndSelector = createClassAndSelector('tooltipTimeRect');
        private static TooltipTitle: ClassAndSelector = createClassAndSelector('tooltipTitle');
        private static TooltipDescription: ClassAndSelector = createClassAndSelector('tooltipDescription');
        private static TooltipContainer: ClassAndSelector = createClassAndSelector('tooltipContainer');

        private static AnimationDot: ClassAndSelector = createClassAndSelector('animationDot');

        private rootSelection: D3.UpdateSelection;
        private animationSelection: D3.UpdateSelection;

        public constructor(options?: PulseChartConstructorOptions) {
            if (options) {
                if (options.svg) {
                    this.svg = options.svg;
                }
                if (options.animator) {
                    //this.animator = options.animator;
                }
                if (options.behavior) {
                    this.behavior = options.behavior;
                }
            } else {
                this.behavior = new PulseBehavior([new ColumnChartWebBehavior()]);
            }

            this.margin = PulseChart.DefaultMargin;
        }

        private static getCategoricalColumnOfRole(dataView: DataView, roleName: string): DataViewCategoryColumn | DataViewValueColumn {
          var filterFunc = (cols: DataViewCategoricalColumn[]) => cols.filter((x) => x.source && x.source.roles && x.source.roles[roleName])[0];
          return filterFunc(dataView.categorical.categories) || filterFunc(dataView.categorical.values);
        }

        public static converter(dataView: DataView, colors: IDataColorPalette, interactivityService?: IInteractivityService): PulseChartData {
            if (!dataView
                || !dataView.categorical
                || !dataView.categorical.values
                || !dataView.categorical.values[0]
                || !dataView.categorical.values[0].values
                || !dataView.categorical.categories) {
                    return null;
            }

            var columns: PulseChartDataRoles<DataViewCategoricalColumn> = <any>_.mapValues(PulseChart.RoleNames, (x,i) => PulseChart.getCategoricalColumnOfRole(dataView, i));
            var timeStampColumn = <DataViewCategoryColumn>columns.Timestamp;

            if (!timeStampColumn) {
                // console.error("dataView.categorical.categories[categoryMeasureIndex] not found");
                return null;
            }

            // var isScalar: boolean = CartesianChart.getIsScalar(
            //     dataView.metadata ? dataView.metadata.objects : null,
            //     PulseChart.Properties["general"]["formatString"],
            //     ValueType.fromDescriptor({ text: true }));

            var isScalar: boolean = !(timeStampColumn.source && timeStampColumn.source.type && timeStampColumn.source.type.dateTime);
            var settings: PulseChartSettings = PulseChart.parseSettings(dataView, colors, columns);

            var categoryValues: any[] = timeStampColumn.values;

            if (!categoryValues || _.isEmpty(dataView.categorical.values)) {
                return null;
            }

            var minCategoryValue = Math.min.apply(null, categoryValues), maxCategoryValue = Math.max.apply(null, categoryValues);
            settings.xAxis.dateFormat =
                (maxCategoryValue - minCategoryValue < (24 * 60 * 60 * 1000)
                    && new Date(maxCategoryValue).getDate() === new Date(minCategoryValue).getDate())
                    ? PulseChartXAxisDateFormat.TimeOnly
                    : PulseChartXAxisDateFormat.DateOnly;

            settings.xAxis.formatterOptions = { value: new Date(minCategoryValue), value2: new Date(maxCategoryValue) };

            if (isScalar) {
                settings.xAxis.formatterOptions.format = ValueFormatter.getFormatString(timeStampColumn.source,
                    PulseChart.DefaultSettings.formatStringProperty);
            } else {
                settings.xAxis.formatterOptions.format = PulseChart.GetDateTimeFormatString(settings.xAxis.dateFormat, timeStampColumn.source.format);
            }

            var widthOfXAxisLabel = 70;
            var widthOfTooltipValueLabel = isScalar ? 60 : PulseChart.GetFullWidthOfDateFormat(timeStampColumn.source.format, PulseChart.GetPopupValueTextProperties()) + 3;
            var heightOfTooltipDescriptionTextLine = TextMeasurementService.measureSvgTextHeight(PulseChart.GetPopupDescriptionTextProperties("lj", settings.popup.fontSize));
            var runnerCounterFormatString = columns.RunnerCounter && visuals.valueFormatter.getFormatString(columns.RunnerCounter.source, settings.formatStringProperty);
            settings.popup.width = Math.max(widthOfTooltipValueLabel + 20, settings.popup.width);

            var minSize: number = PulseChart.DefaultSettings.dots.minSize;
            var maxSize: number = PulseChart.DefaultSettings.dots.maxSize;
            if (settings.dots) {
                    minSize = settings.dots.minSize;
                    maxSize = settings.dots.maxSize;
                }

            var eventSizeScale: D3.Scale.LinearScale = <D3.Scale.LinearScale> PulseChart.createScale(
                true,
                columns.EventSize ? [d3.min(columns.EventSize.values), d3.max(columns.EventSize.values)] : [0, 0],
                minSize,
                maxSize);

            var xAxisCardProperties: DataViewObject = CartesianHelper.getCategoryAxisProperties(dataView.metadata);
            isScalar = CartesianHelper.isScalar(isScalar, xAxisCardProperties);
            var categorical = ColumnUtil.applyUserMinMax(isScalar, dataView.categorical, xAxisCardProperties);

            var categoryType: ValueType = AxisHelper.getCategoryValueType(timeStampColumn.source, isScalar);
            var isDateTime = AxisHelper.isDateTime(categoryType);
            //var categoryValues: any[] = category.values;
            var series: PulseChartSeries[] = [];
            var seriesLen = timeStampColumn.values ? timeStampColumn.values.length : 0;
            var hasDynamicSeries = !!(timeStampColumn.values && timeStampColumn.source);

            var defaultLabelSettings: LineChartDataLabelsSettings = dataLabelUtils.getDefaultLineChartLabelSettings();

            var defaultSeriesColor: string;

            if (dataView.metadata && dataView.metadata.objects) {
                var objects = dataView.metadata.objects;
                defaultSeriesColor = DataViewObjects.getFillColor(objects, lineChartProps.dataPoint.defaultColor);

                //var labelsObj = <DataLabelObject>objects['labels'];
                //dataLabelUtils.updateLabelSettingsFromLabelsObject(labelsObj, defaultLabelSettings);
            }

            //var colorHelper = new ColorHelper(colors, lineChartProps.dataPoint.fill, defaultSeriesColor);

            var grouped: DataViewValueColumnGroup[];
            if (dataView.categorical.values) {
                grouped = dataView.categorical.values.grouped();
                //console.log("grouped", grouped);
            }

            var valueMeasureIndex = 0;

            if (valueMeasureIndex < 0) {
                console.error("valueMeasureIndex < 0");
            }

            seriesLen = 1;
            var seriesIndex: number = 0;

            var dataPoints: PulseChartDataPoint[] = [];
            var groupedIdentity = grouped[seriesIndex];

            var color = settings.series.fill;
            var width: number = settings.series.width;
            var seriesLabelSettings: LineChartDataLabelsSettings;

            if (!hasDynamicSeries) {
                var labelsSeriesGroup = grouped && grouped.length > 0 && grouped[0].values ? grouped[0].values[seriesIndex] : null;
                var labelObjects = (labelsSeriesGroup && labelsSeriesGroup.source && labelsSeriesGroup.source.objects) ? <DataLabelObject>labelsSeriesGroup.source.objects['labels'] : null;
                if (labelObjects) {
                    //seriesLabelSettings = Prototype.inherit(defaultLabelSettings);
                    //dataLabelUtils.updateLabelSettingsFromLabelsObject(labelObjects, seriesLabelSettings);
                }
            }

            var dataPointLabelSettings = (seriesLabelSettings) ? seriesLabelSettings : defaultLabelSettings;
            var gapWidths = PulseChart.getGapWidths(categoryValues);
            var maxGapWidth = Math.max.apply(null, gapWidths);

            for (var categoryIndex = 0, seriesCategoryIndex = 0, len = timeStampColumn.values.length; categoryIndex < len; categoryIndex++ , seriesCategoryIndex++) {
                var categoryValue = categoryValues[categoryIndex];
                var value = AxisHelper.normalizeNonFiniteNumber(timeStampColumn.values[categoryIndex]);
                var runnerCounterValue = columns.RunnerCounter && columns.RunnerCounter.values && columns.RunnerCounter.values[categoryIndex];

                var identity = SelectionIdBuilder.builder()
                    .withCategory(timeStampColumn, categoryIndex)
                    .createSelectionId();

                var key = identity.getKey(),
                    minGapWidth = PulseChart.MinGapWidth[settings.xAxis.dateFormat],
                    gapWidth: number = gapWidths[categoryIndex],
                    isGap: boolean = settings.gaps.show && gapWidth > 0 && gapWidth > (minGapWidth + (100 - settings.gaps.visibleGapsPercentage) * (maxGapWidth - minGapWidth) / 100);

                if (isGap && dataPoints.length > 0) {
                    series.push({
                        displayName: grouped[seriesIndex].name,
                        key: key,
                        lineIndex: seriesIndex,
                        color: color,
                        xCol: timeStampColumn.source,
                        yCol: timeStampColumn.source,
                        data: dataPoints,
                        identity: identity,
                        selected: false,
                        labelSettings: seriesLabelSettings,
                        width: width,
                        widthOfGap: gapWidth
                    });

                    seriesCategoryIndex = 0;
                    dataPoints = [];
                }

                // When Scalar, skip null categories and null values so we draw connected lines and never draw isolated dots.
                if (isScalar && (categoryValue === null || value === null)) {
                    continue;
                }

                var categorical: DataViewCategorical = dataView.categorical;
                var y0_group = groupedIdentity.values[valueMeasureIndex];
                //console.log('y0_group', y0_group);
                //var y1_group = groupedIdentity.values[valueMeasureIndex];

                var y0 = y0_group.values[categoryIndex];
                //var y1 = y1_group.values[categoryIndex];
                ////console.log('y0', y0);

                if (y0 === null) {
                    y0_group = grouped[1] && grouped[1].values[valueMeasureIndex];
                    y0 = y0_group && y0_group.values && y0_group.values[categoryIndex] || 0;
                }

                var popupInfo: PulseChartTooltipData = null;
                var eventSize = (columns.EventSize && columns.EventSize.values && columns.EventSize.values[categoryIndex]) || 0;

                if ((columns.EventTitle && columns.EventTitle.values && columns.EventTitle.values[categoryIndex]) ||
                    (columns.EventDescription && columns.EventDescription.values && columns.EventDescription.values[categoryIndex])) {
                    var formattedValue = categoryValue;

                    if (isDateTime && categoryValue) {
                        formattedValue = valueFormatter.create({ format: timeStampColumn.source.format }).format(categoryValue);
                    }

                    popupInfo = {
                        value: formattedValue,
                        title: columns.EventTitle && columns.EventTitle.values && columns.EventTitle.values[categoryIndex],
                        description: columns.EventDescription && columns.EventDescription.values && columns.EventDescription.values[categoryIndex],
                        size: eventSize,
                    };
                }

                var categoryValue = isDateTime && categoryValue ? categoryValue : categoryValue;

                var dataPoint: PulseChartDataPoint = {
                    categoryValue: categoryValue,
                    value: value,
                    categoryIndex: categoryIndex,
                    seriesIndex: seriesIndex,
                    tooltipInfo: null,//tooltipInfo,
                    popupInfo: popupInfo,
                    selected: false,
                    identity: identity,
                    key: JSON.stringify({ ser: key, catIdx: categoryIndex }),
                    labelFill: dataPointLabelSettings.labelColor,
                    labelSettings: dataPointLabelSettings,
                    x: categoryValue,
                    y: y0,
                    pointColor: color,
                    groupIndex: PulseChart.getGroupIndex(categoryIndex, grouped),
                    eventSize: eventSizeScale(eventSize),
                    runnerCounterValue: runnerCounterValue,
                    runnerCounterFormatString: runnerCounterFormatString,
                };

                dataPoints.push(dataPoint);
            }

            if (interactivityService) {
                interactivityService.applySelectionStateToData(dataPoints);
            }

            if (dataPoints.length > 0) {
                series.push({
                    displayName: grouped[seriesIndex].name,
                    key: key,
                    lineIndex: seriesIndex,
                    color: color,
                    xCol: timeStampColumn.source,
                    yCol: timeStampColumn.source,
                    data: dataPoints,
                    identity: identity,
                    selected: false,
                    labelSettings: seriesLabelSettings,
                    width: width,
                    widthOfGap: 0
                });
            }
            // }

            xAxisCardProperties = CartesianHelper.getCategoryAxisProperties(dataView.metadata);
            var valueAxisProperties = CartesianHelper.getValueAxisProperties(dataView.metadata);

            //var values: DataViewValueColumns = categorical.values;
            var values = dataView.categorical.categories;

            // Convert to DataViewMetadataColumn
            var valuesMetadataArray: powerbi.DataViewMetadataColumn[] = [];
            if (values) {
                for (var i = 0; i < values.length; i++) {

                    if (values[i] && values[i].source && values[i].source.displayName) {
                        valuesMetadataArray.push({ displayName: values[i].source.displayName });
                    }
                }
            }

            var axesLabels = converterHelper.createAxesLabels(xAxisCardProperties, valueAxisProperties, timeStampColumn.source, valuesMetadataArray);
            if (interactivityService) {
                interactivityService.applySelectionStateToData(series);
            }

            return {
                columns: columns,
                series: series,
                isScalar: isScalar,
                dataLabelsSettings: defaultLabelSettings,
                axesLabels: { x: axesLabels.xAxisLabel, y: axesLabels.yAxisLabel },
                hasDynamicSeries: hasDynamicSeries,
                categoryMetadata: timeStampColumn.source,
                categories: categoryValues,
                settings: settings,
                grouped: grouped,
                widthOfXAxisLabel: widthOfXAxisLabel,
                widthOfTooltipValueLabel: widthOfTooltipValueLabel,
                heightOfTooltipDescriptionTextLine: heightOfTooltipDescriptionTextLine
            };
        }

        private static getGroupIndex(index: number, grouped: DataViewValueColumnGroup[]): number {
            for (var i = 0; i < grouped.length; i++) {
                if (grouped[i].values && grouped[i].values[0] &&
                    grouped[i].values[0].values[index] !== undefined &&
                    grouped[i].values[0].values[index] !== null) {
                        return i;
                    }
            }

            return 0;
        }

        private static getGapWidths(values: Date[] | number[]): number[] {
            var result: number[] = [];
            for(var i = 0, prevVal = 0, length = values.length; i < length; i++) {
                if (!prevVal || !values[i]) {
                    result.push(0);
                } else  {
                    result.push(<number>values[i] - prevVal);
                }

                prevVal = <number>values[i];
            }

            return result;
        }

        private static createScale(isScalar: boolean, domain: (number | Date)[], minX: number, maxX: number): D3.Scale.GenericScale<D3.Scale.LinearScale | D3.Scale.TimeScale> {
            var scale: D3.Scale.GenericScale<D3.Scale.LinearScale | D3.Scale.TimeScale>;

            if (isScalar) {
                scale = d3.scale.linear();
            } else {
                scale = d3.time.scale();
            }

            return scale
                .domain(domain)
                .range([minX, maxX]);
        }

        public init(options: VisualInitOptions): void {
            (<any>powerbi.formattingService).initialize();//Fixes the framework bug: "Cannot read property 'getFormatString' of undefined".
            this.host  = options.host;
            this.selectionManager = new SelectionManager({ hostServices: this.host });
            var svg: D3.Selection = this.svg = d3.select(options.element.get(0))
                .append('svg')
                .classed('pulseChart', true);

            this.gaps = svg.append('g').classed(PulseChart.Gaps.class, true);
            this.yAxis = svg.append('g').attr('class', 'y axis');
            this.chart = svg.append('g').attr('class', PulseChart.Chart.class);
            this.dots = svg.append('g').attr('class', 'dots');
            this.animationDot = this.dots.append('circle').classed(PulseChart.AnimationDot.class, true).attr('display', 'none');

            this.animationHandler = new PulseAnimator(this, svg);

            var style: IVisualStyle = options.style;

            this.colors = style && style.colorPalette
                ? style.colorPalette.dataColors
                : new DataColorPalette();
        }

        public update(options: VisualUpdateOptions): void {

            if (!options || !options.dataViews || !options.dataViews[0]) {
                this.clearAll();
                return;
            }

            this.viewport = $.extend({}, options.viewport);
            var dataView: DataView = options.dataViews[0];

            this.data = PulseChart.converter(dataView, this.colors);
            if (!this.validateData(this.data)) {
                this.clearAll();
                return;
            }

            this.setSize();

            this.calculateAxesProperties();
            this.render(true);
        }

        private validateData(data: PulseChartData): boolean {
            if (!data) {
                return false;
            }

            if (data.categories.some(x => !(x instanceof Date || $.isNumeric(x)))) {
                return false;
            }

            return true;
        }

        private setSize(): void {
            var height: number,
                width: number,
                marginBottom: number,
                marginLeft: number;

            marginBottom = this.data.widthOfXAxisLabel * Math.abs(Math.sin(PulseChart.AxisTickRotateAngle * Math.PI / 180)) + 10;

            if (this.data && this.data.settings && this.data.settings.popup && !this.data.settings.popup.alwaysOnTop) {
                marginBottom = Math.max(this.margin.bottom, marginBottom);
            }

            if (this.data &&
                this.data.settings &&
                this.data.settings.yAxis &&
                this.data.settings.yAxis.show) {
                    marginLeft = this.margin.left;
                } else {
                    marginLeft = 10;
                }

            height = this.viewport.height - this.margin.top - marginBottom;
            width = this.viewport.width - marginLeft - this.margin.right - PulseChart.MaxWidthOfYAxis;

            height = Math.max(height, PulseChart.DefaultViewport.height);
            width  = Math.max(width, PulseChart.DefaultViewport.width);

            this.size = {
                height: height,
                width: width
            };

            this.updateElements();
        }

        private updateElements(): void {
            this.svg.attr({
                'height': this.viewport.height,
                'width': this.viewport.width
            });

            this.gaps.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top + (this.size.height / 2)));
            this.chart.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top));

            this.yAxis.attr('transform', SVGUtil.translate(this.size.width + this.margin.left, this.margin.top));

            this.dots.attr('transform', SVGUtil.translate(this.margin.left, this.margin.top));
        }

        public calculateAxesProperties() {
            this.data.xScale = this.getXAxisScale();
            this.data.yScales = this.getYAxisScales();
            this.data.commonYScale = this.getCommonYAxisScale(this.data.yScales);

            this.data.yAxis = this.createAxisY();

            var xAxisProperties: PulseChartXAxisProperties[] = this.createAxisX(
                this.data.isScalar,
                this.data.series,
                <D3.Scale.LinearScale> this.data.xScale,
                $.extend({}, this.data.settings.xAxis.formatterOptions),
                this.data.settings.xAxis.dateFormat);

            this.data.series.forEach((series: PulseChartSeries, index: number) => {
                series.xAxisProperties = xAxisProperties[index];
            });
        }

        private getXAxisScale(): D3.Scale.GenericScale<D3.Scale.TimeScale | D3.Scale.LinearScale> {
            var data: PulseChartData = this.data;

            return PulseChart.createScale(
                data.isScalar,
                [data.categories[0], data.categories[data.categories.length - 1]],
                0,
                this.size.width);
        }

        private getCommonYAxisScale(scales: D3.Scale.LinearScale[]): D3.Scale.LinearScale {
            var domain: number[] = [];

            scales.forEach((scale: D3.Scale.LinearScale) => domain = domain.concat(scale.domain()));

            return <D3.Scale.LinearScale> PulseChart.createScale(
                true,
                [d3.max(domain), d3.min(domain)],
                0,
                this.size.height);
        }

        private getYAxisScales(): D3.Scale.LinearScale[] {
            var data: PulseChartData = this.data,
                stepOfHeight: number = this.size.height / data.grouped.length;

            return <D3.Scale.LinearScale[]> data.grouped.map((group: DataViewValueColumnGroup, index: number) => {
                var values: number[] = group.values[0].values.filter((value: any) => {
                    if (value !== null && value !== undefined) {
                        return true;
                    }

                    return false;
                });

                var minValue: number = Number.MAX_VALUE,
                    maxValue: number = -Number.MAX_VALUE;

                values.forEach((value: number) => {
                    if (value < minValue) {
                        minValue = value;
                    }

                    if (value > maxValue) {
                        maxValue = value;
                    }
                });

                return PulseChart.createScale(true, [maxValue, minValue], stepOfHeight * index, stepOfHeight * (index + 1));
            });
        }

        private createAxisY(show: boolean = true): D3.Svg.Axis {
            var scale: D3.Scale.GenericScale<D3.Scale.LinearScale | D3.Scale.OrdinalScale> = this.data.commonYScale;

            var ticks: number = Math.max(2, Math.round(this.size.height / 40));
            var yAxis: D3.Svg.Axis = d3.svg.axis()
                .scale(scale)
                .ticks(Math.round(ticks))
                .outerTickSize(0);
            return yAxis;
        }
        /*
        private createAxisYWithCategories(show: boolean = true): D3.Svg.Axis {
            var formatter: IValueFormatter,
                data: PulseChartData = this.data,
                scale: D3.Scale.GenericScale<D3.Scale.LinearScale | D3.Scale.OrdinalScale> = this.data.commonYScale,
                categoryDomain: string[] = [];

            data.grouped.forEach((group: DataViewValueColumnGroup) => {
                if (!group.name) {
                    return;
                }

                if (!categoryDomain.some((categoryDomainValue: string) => categoryDomainValue === group.name)) {
                    categoryDomain.push(group.name);
                }
            });

            if (categoryDomain.length > 0) {
                scale = d3.scale.ordinal()
                    .rangePoints([0, this.size.height])
                    .domain(categoryDomain);
            }

            formatter = valueFormatter.create({
                value: scale.domain()[0],
                value2: scale.domain()[1]
            });

            var yAxis = d3.svg.axis().scale(scale);

            return yAxis
                .tickFormat((value: any) => {
                    return TextMeasurementService.getTailoredTextOrDefault(
                        PulseChart.GetAxisTextProperties(formatter.format(value)),
                        PulseChart.MaxWidthOfYAxis);
                })
                .ticks(PulseChart.MaxCountOfTicksOnYAxis);
        }
        */

        private createAxisX(
            isScalar: boolean,
            series: PulseChartSeries[],
            originalScale: D3.Scale.GenericScale<D3.Scale.TimeScale | D3.Scale.LinearScale>,
            formatterOptions: ValueFormatterOptions,
            dateFormat: PulseChartXAxisDateFormat): PulseChartXAxisProperties[] {

            var xAxisProperties: PulseChartXAxisProperties[] = series.map((seriesElement: PulseChartSeries) => {
                var dataPoints: PulseChartDataPoint[] = seriesElement.data,
                    minValue: number | Date = dataPoints[0].categoryValue,
                    maxValue: number | Date = dataPoints[dataPoints.length - 1].categoryValue,
                    minX: number = originalScale(dataPoints[0].categoryValue),
                    maxX: number = originalScale(dataPoints[dataPoints.length - 1].categoryValue);

                var scale: D3.Scale.GenericScale<D3.Scale.TimeScale | D3.Scale.LinearScale> = PulseChart.createScale(isScalar, [minValue, maxValue], minX, maxX);
                var values: (Date | number)[] = isScalar
                    ? d3.range(<number>minValue, <number>maxValue)
                    : (dateFormat === PulseChartXAxisDateFormat.TimeOnly ? d3.time.minute : d3.time.day).range(<Date>minValue, <Date>maxValue);

                return <PulseChartXAxisProperties> {
                    values: values,
                    scale: scale,
                    rotate: false
                };
            });

            this.resolveIntersections(xAxisProperties);

            formatterOptions.tickCount = xAxisProperties.length && xAxisProperties.map(x => x.values.length).reduce((a,b) => a + b);
            xAxisProperties.forEach((properties: PulseChartXAxisProperties) => {
                var values: (Date | number)[] = properties.values.filter((value: Date | number) => value !== null);

                var formatter = valueFormatter.create(formatterOptions);
                properties.axis = d3.svg.axis()
                    .scale(properties.scale)
                    .tickValues(values)
                    .tickFormat((value: Date) => {
                        return formatter.format(value);
                    })
                    .outerTickSize(0);
            });

            return xAxisProperties;
        }

        private resolveIntersections(xAxisProperties: PulseChartXAxisProperties[]): void {
            var rotate = this.isRotatedXAxisTicks(xAxisProperties);

            xAxisProperties.forEach(xAxisProperty => {
                xAxisProperty.rotate = rotate;
                if(!xAxisProperty.values.length) {
                    return;
                }

                var tickWidth = rotate
                    ? PulseChart.XAxisTickHeight * (rotate ? Math.abs(Math.sin(PulseChart.AxisTickRotateAngle * Math.PI / 180)) : 0)
                    : this.data.widthOfXAxisLabel;
                var tickSpace = PulseChart.XAxisTickSpace;
                var scaledValues = xAxisProperty.values.map(xAxisProperty.scale);
                var maxValue: number = Math.max.apply(null, scaledValues);
                var minValue: number = Math.min.apply(null, scaledValues);
                var width = maxValue - minValue;

                if(width < tickWidth) {
                    xAxisProperty.values = [];
                    return;
                }

                var maxTicks = Math.ceil((width + tickSpace - tickWidth) / (tickWidth + tickSpace));
                if(rotate) {
                    maxTicks = Math.min(PulseChart.MinimumTicksToRotate, maxTicks);
                }

                xAxisProperty.values = xAxisProperty.values
                    .filter((x,i) => scaledValues[i] > minValue + tickWidth/2 && scaledValues[i] < maxValue - tickWidth / 2);

                if(!xAxisProperty.values.length) {
                    return;
                }

                var visibleTicksScale = d3.scale.linear().domain([0, maxTicks - 1]).range([0, xAxisProperty.values.length - 1]);

                xAxisProperty.values = d3.range(maxTicks).map(x => xAxisProperty.values[Math.ceil(visibleTicksScale(x))]);
            });
        }

        private isRotatedXAxisTicks(xAxisProperties: PulseChartXAxisProperties[]): boolean {
            return this.data.settings.xAxis.position === XAxisPosition.Bottom && xAxisProperties.some(xAxisProperty => {
                if(!xAxisProperty.values.length) {
                    return false;
                }

                var tickWidth = this.data.widthOfXAxisLabel;
                var scaledValues = xAxisProperty.values.map(xAxisProperty.scale);
                var maxValue: number = Math.max.apply(null, scaledValues);
                var minValue: number = Math.min.apply(null, scaledValues);
                var width = maxValue - minValue;
                var maxTicks = Math.ceil((width + PulseChart.XAxisTickSpace - tickWidth) / (tickWidth + PulseChart.XAxisTickSpace));
                return maxTicks < PulseChart.MinimumTicksToRotate;
            });
        }

        private isAutoPlay(): boolean {
            return this.data &&
                this.data.settings &&
                this.data.settings.playback &&
                this.data.settings.playback.autoplay;
        }

        public render(suppressAnimations: boolean): CartesianVisualRenderResult {
            var duration = AnimatorCommon.GetAnimationDuration(this.animator, suppressAnimations);
            var result: CartesianVisualRenderResult;
            var data = this.data;
            this.lastSelectedPoint = null;

            var xScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>data.xScale,
                yScales: D3.Scale.LinearScale[] = <D3.Scale.LinearScale[]>data.yScales;

            this.lineX = d3.svg.line()
                .x((d: PulseChartDataPoint) => {
                    return xScale(d.categoryValue);
                })
                .y((d: PulseChartDataPoint) => {
                    return yScales[d.groupIndex](d.y);
                });

            if (this.data &&
                this.data.settings &&
                this.data.settings.playback &&
                this.data.settings.playback.color) {
                    this.animationHandler.setControlsColor(this.data.settings.playback.color);
                }
            this.animationHandler.render(this.isAutoPlay());
            this.animationHandler.setRunnerCounterValue();

            this.renderAxes(data, duration);
            this.renderGaps(data, duration);

            return result;
        }

        private renderAxes(data: PulseChartData, duration: number): void {
            this.renderXAxis(data, duration);
            this.renderYAxis(data, duration);
        }

        private renderXAxis(data: PulseChartData, duration: number): void {
            var axisNodeSelection: D3.Selection,
                axisNodeUpdateSelection: D3.UpdateSelection,
                ticksSelection: D3.Selection,
                axisBoxUpdateSelection: D3.UpdateSelection,
                color: string = PulseChart.DefaultSettings.xAxis.color,
                fontColor: string = PulseChart.DefaultSettings.xAxis.fontColor;

            if (this.data && this.data.settings && this.data.settings.xAxis) {
                color = this.data.settings.xAxis.color;
                fontColor = this.data.settings.xAxis.fontColor;
            }

            axisNodeSelection = this.rootSelection.selectAll(PulseChart.XAxisNode.selector);
            axisNodeUpdateSelection = axisNodeSelection.data(data.series);

            axisNodeUpdateSelection
                .enter()
                .insert("g", "g." + PulseChart.TooltipContainer.class)
                .classed(PulseChart.XAxisNode.class, true)

            axisNodeUpdateSelection
                .call((selection: D3.Selection) => {
                    selection.forEach((selectionElement: Element, index: number) => {
                        d3.select(selectionElement[0])
                            .transition()
                            .duration(duration)
                            .call(data.series[index].xAxisProperties.axis.orient('bottom'));
                    });
                });

            axisNodeUpdateSelection
                .exit()
                .remove();

            axisBoxUpdateSelection = axisNodeUpdateSelection
                .selectAll(".tick")
                .selectAll(".axisBox")
                .data([[]]);

            axisBoxUpdateSelection
                .enter()
                .insert("rect", "text")
                .classed("axisBox", true);

            axisBoxUpdateSelection
                .style('display', this.data.settings.xAxis.position === XAxisPosition.Center ? 'inherit' : 'none');;

            var tickRectY = this.data.settings.xAxis.position === XAxisPosition.Center ? -11 : 0;
            axisBoxUpdateSelection.attr({
                    x: -(this.data.widthOfXAxisLabel / 2),
                    y: tickRectY + "px",
                    width: this.data.widthOfXAxisLabel,
                    height: PulseChart.XAxisTickHeight + "px"
                });

            axisBoxUpdateSelection
                .exit()
                .remove();

            axisNodeUpdateSelection
                .style('stroke', this.data.settings.xAxis.position === XAxisPosition.Center ? color : "none")
                .style('display', this.data.settings.xAxis.show ? 'inherit' : 'none');

            axisNodeUpdateSelection.call(selection => {
                var rotate = selection.datum().xAxisProperties.rotate;
                var rotateCoeff = rotate ? Math.abs(Math.sin(PulseChart.AxisTickRotateAngle * Math.PI / 180)) : 0;
                var dy = tickRectY + 3;
                selection.selectAll("text")
                    .attr('transform', function() {
                        return `translate(0, ${(dy + 9 + ($(this).width()/2) * rotateCoeff)}) rotate(${rotate ? PulseChart.AxisTickRotateAngle : 0})`;
                    })
                    .style('fill', fontColor)
                    .style('stroke', "none")
                    .attr('dy', -9);
            });

            axisNodeUpdateSelection.selectAll(".domain")
                .style('stroke', color);

            axisNodeUpdateSelection.selectAll(".domain").forEach((element: Element) => {
                $(element).insertBefore($(element).parent().children().first());
            });

            var xAxisTop: number = this.size.height;
            switch(this.data.settings.xAxis.position) {
                case XAxisPosition.Center:
                    xAxisTop = xAxisTop/2;
                    break;
                case XAxisPosition.Bottom:
                    break;
            }

            axisNodeUpdateSelection.attr('transform', SVGUtil.translate(0, xAxisTop));
        }

        private renderYAxis(data: PulseChartData, duration: number): void {
            var yAxis: D3.Svg.Axis = data.yAxis,
                isShow: boolean = false,
                color: string = PulseChart.DefaultSettings.yAxis.color,
                fontColor: string = PulseChart.DefaultSettings.yAxis.fontColor;;

            yAxis.orient('right');

            if (this.data &&
                this.data.settings &&
                this.data.settings.yAxis &&
                this.data.settings.yAxis.show) {
                    isShow = true;
                }

            if (this.data &&
                this.data.settings &&
                this.data.settings.yAxis &&
                this.data.settings.yAxis) {
                    color = this.data.settings.yAxis.color;
                    fontColor = this.data.settings.yAxis.fontColor;
                }

            this.yAxis
                .transition()
                .duration(duration)
                .call(yAxis)
                .attr('display', isShow ? 'inline' : 'none');

             this.yAxis.selectAll('.domain, path, line').style('stroke', color);
             this.yAxis.selectAll('text').style('fill', fontColor);
        }

        public renderChart(): void {
            var data: PulseChartData = this.data;
            var series: PulseChartSeries[] = this.data.series;
            var sm: SelectionManager = this.selectionManager;

            var selection: D3.UpdateSelection = this.rootSelection = this.chart.selectAll(PulseChart.LineNode.selector).data(series);

            var lineNode = selection
                .enter()
                .append('g')
                .classed(PulseChart.LineNode.class, true);

            lineNode
                .append('g')
                .classed(PulseChart.LineContainer.class, true);

            lineNode
                .append('g')
                .classed(PulseChart.DotsContainer.class, true);

            lineNode
                .append('g')
                .classed(PulseChart.TooltipContainer.class, true);

            if (this.animationHandler.isAnimated()) {
                this.showAnimationDot();

                if (sm.hasSelection()) {
                    this.drawTooltips(data, sm.getSelectionIds());
                }
            } else {
                this.hideAnimationDot();
                this.drawTooltips(data);
            }

            this.drawDots(data);
            this.drawLines(data);

            selection
                .exit()
                .remove();
        }

        private drawLinesStatic(limit: number, isAnimated: boolean): void {
             var node: ClassAndSelector = PulseChart.Line,
                 nodeParent: ClassAndSelector = PulseChart.LineContainer,
                 rootSelection: D3.UpdateSelection = this.rootSelection;

             var selection: D3.UpdateSelection = rootSelection.filter((d, index) => {
                if (isAnimated) {
                    return index < limit;
                }
                return true;
            }).select(nodeParent.selector).selectAll(node.selector).data(d => [d]);

            selection
                .enter()
                .append('path')
                .classed(node.class, true);

            selection
                .style({
                    'fill': "none",
                    'stroke': (d: PulseChartSeries) => d.color,
                    'stroke-width': (d: PulseChartSeries) => `${d.width}px`
                });

           selection.attr('d', d => this.lineX(d.data));
           selection
                .exit()
                .remove();
        }

        private drawLinesStaticBeforeAnimation(limit: number): void {
             var node: ClassAndSelector = PulseChart.Line,
                 nodeParent: ClassAndSelector = PulseChart.LineContainer,
                 rootSelection: D3.UpdateSelection = this.rootSelection;

             var selection: D3.UpdateSelection = this.animationSelection = rootSelection.filter((d, index) => {
                return index === limit;
            }).select(nodeParent.selector).selectAll(node.selector).data((d: PulseChartSeries) => [d]);

            selection
                .enter()
                .append('path')
                .classed(node.class, true);

            selection
                .style({
                    'fill': "none",
                    'stroke': (d: PulseChartSeries) => d.color,
                    'stroke-width': (d: PulseChartSeries) => `${d.width}px`
                });

            selection
                .attr('d', (d: PulseChartSeries) => {
                    var position: PulseChartAnimationPosition = this.animationHandler.getPosition();
                    var flooredStart = Math.floor(position.index);

                    if (flooredStart === 0) {
                        this.moveAnimationDot(d.data[0]);
                        return this.lineX([]);
                    } else {
                        var dataReduced: PulseChartDataPoint[] = d.data.slice(0, flooredStart + 1);
                        this.moveAnimationDot(dataReduced[dataReduced.length - 1]);
                        return this.lineX(dataReduced);
                    }
                 });

           selection
                .exit()
                .remove();
        }

        private moveAnimationDot(d: PulseChartDataPoint): void {
            var xScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>this.data.xScale,
                yScales: D3.Scale.LinearScale[] = <D3.Scale.LinearScale[]>this.data.yScales;

            this.animationDot
                .attr("cx", xScale(d.x))
                .attr("cy", yScales[d.groupIndex](d.y));
        }

        private getAnimationDuration(): number {
            if (this.data &&
                this.data.settings &&
                this.data.settings.playback &&
                this.data.settings.playback.playSpeed) {
                    return 1000 / this.data.settings.playback.playSpeed;
                }
            return 300;
        }

        /*
        public drawLinesStaticWithInterpolation() {
            var selection: D3.UpdateSelection = this.animationSelection;
            var start: number = this.animationHandler.getCurrentIndex();
            var flooredStart: number = Math.floor(start);

            selection
                .transition()
                .ease("linear")
                .attrTween('d', (d: PulseChartSeries) => this.getInterpolationLine(d.data, flooredStart));
        }*/

        public playAnimation() {
            var selection: D3.UpdateSelection = this.animationSelection;
            var duration: number = this.getAnimationDuration();
            var position: PulseChartAnimationPosition = this.animationHandler.getPosition();
            var flooredStart: number = Math.floor(position.index);

            //this.clearSelection();
            this.showAnimationDot();

            selection
                .transition()
                .duration(duration)
                .ease("linear")
                .attrTween('d', (d: PulseChartSeries) => this.getInterpolation(d.data, flooredStart))
                .each("end", (d: PulseChartSeries) => {
                    var position: PulseChartAnimationPosition = this.animationHandler.getPosition();
                    this.handleSelection(d.data[position.index]);
                    //console.log('end transition', d.data[position.index]);
                });
        }

        public pauseAnimation(): void {

            if (!this.animationSelection) {
                return;
            }

            this.hideAnimationDot();

            this.animationSelection
                .transition()
                .duration(0);
        }

        public stopAnimation() {
            this.pauseAnimation();
        }

        public findNextPoint(position: PulseChartAnimationPosition): PulseChartAnimationPosition {
            for (var i: number = position.series; i < this.data.series.length; i++) {
                var series: PulseChartSeries = this.data.series[i];

                for (var j: number = (i === position.series) ? Math.floor(position.index + 1) : 0; j < series.data.length; j++) {
                    if (series.data[j] && series.data[j].popupInfo) {
                        this.handleSelection(series.data[j]);
                        return {
                            series: i,
                            index: j
                        };
                    }
                }
            }

            return null;
        }

        public findPrevPoint(position: PulseChartAnimationPosition): PulseChartAnimationPosition {
            for (var i: number = position.series; i >= 0; i--) {
                var series: PulseChartSeries = this.data.series[i];

                for (var j: number = (i === position.series) ? Math.ceil(position.index - 1) : series.data.length; j >= 0; j--) {
                    if (series.data[j] && series.data[j].popupInfo) {
                        this.handleSelection(series.data[j]);
                        return {
                            series: i,
                            index: j
                        };
                    }
                }
            }

            return null;
        }

        public isAnimationSeriesLast(position: PulseChartAnimationPosition): boolean {
            return (position.series >= (this.data.series.length - 1));
        }

        public isAnimationIndexLast(position: PulseChartAnimationPosition): boolean {
            var series: PulseChartSeries = this.data.series[position.series];
            return (position.index >= (series.data.length - 1));
        }

        private drawLines(data: PulseChartData): void {
            var position: PulseChartAnimationPosition = this.animationHandler.getPosition(),
                positionSeries: number = position.series,
                isAnimated: boolean = this.animationHandler.isAnimated();

            this.drawLinesStatic(positionSeries, isAnimated);

            if (isAnimated) {
                this.drawLinesStaticBeforeAnimation(positionSeries);
                /*this.drawLinesStaticWithInterpolation();*/
            }
        }

        private showAnimationDot(): void {

            if (!this.animationHandler.isPlaying()) {
                return;
            }
            var size: number = PulseChart.DefaultSettings.dots.size;

           if (this.data &&
                this.data.settings &&
                this.data.settings.dots &&
                this.data.settings.dots.size) {
                    size = this.data.settings.dots.size;
                }

            this.animationDot
                .attr('display', 'inline')
                .attr("fill", this.data.settings.dots.color)
                .style("opacity", this.getDotTransparency())
                .attr("r", size);
        }

        private hideAnimationDot() {
            this.animationDot.attr('display', 'none');
        }

        private getInterpolation(data: PulseChartDataPoint[], start: number) {
            var xScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>this.data.xScale,
                yScales: D3.Scale.LinearScale[] = <D3.Scale.LinearScale[]>this.data.yScales;
            var stop: number = start + 1;

            if (stop >= data.length) {
                this.animationHandler.playNext();
                return;
            }

            this.showAnimationDot();

            var lineFunction: D3.Svg.Line = d3.svg.line()
                .x(d => d.x)
                .y(d => d.y)
                .interpolate("linear");

            var interpolatedLine = data.slice(0, start + 1).map((d: PulseChartDataPoint): PulseChartPointXY => {
                    return {
                        x: xScale(d.x),
                        y: yScales[d.groupIndex](d.y)
                    };
            });

            var x0: number = xScale(data[start].x);
            var x1: number = xScale(data[stop].x);

            var y0: number = yScales[data[start].groupIndex](data[start].y);
            var y1: number = yScales[data[stop].groupIndex](data[stop].y);

            var interpolateIndex: D3.Scale.LinearScale = d3.scale.linear()
                .domain([0, 1])
                .range([start, stop]);

            var interpolateX: D3.Scale.LinearScale = d3.scale.linear()
                .domain([0, 1])
                .range([x0, x1]);

            var interpolateY: D3.Scale.LinearScale = d3.scale.linear()
                .domain([0, 1])
                .range([y0, y1]);

            this.animationHandler.setRunnerCounterValue(data[start]);

            return (t: number) => {
                if (!this.animationHandler.isPlaying()) {
                    return lineFunction(interpolatedLine);
                }

                var x: number = interpolateX(t);
                var y: number = interpolateY(t);

                this.animationDot
                        .attr("cx", x)
                        .attr("cy", y);

                interpolatedLine.push({ "x": x, "y": y });

                var position: PulseChartAnimationPosition = this.animationHandler.getPosition();
                var index: number = interpolateIndex(t);
                this.animationHandler.setPosition({
                    series: position.series,
                    index: index,
                });

                return lineFunction(interpolatedLine);
            };
        }

        public clearSelection(): void {
            var sm: SelectionManager = this.selectionManager;
            sm.clear();

            this.chart.selectAll(PulseChart.Tooltip.selector).remove();
        }

        private handleSelection(d: PulseChartDataPoint): void {
            var sm: SelectionManager = this.selectionManager;
            //this.clearSelection();

            if ((!d || !d.popupInfo) && (this.animationHandler.isPlaying()))  {

                this.animationHandler.pause();
                this.animationHandler.play();
                return;
            }

            this.animationHandler.pause();

            sm.select(d.identity).then((selectionIds: SelectionId[]) => {
                this.setSelection(selectionIds);

                setTimeout(() => {

                    if (this.animationHandler.isPaused()) {
                        this.clearSelection();
                        this.animationHandler.play();
                    }
                }, this.getPauseDuration());

            });
        }

        private getPauseDuration() {
            if (this.data &&
                this.data.settings &&
                this.data.settings.playback) {
                return this.data.settings.playback.pauseDuration * 1000;
            }
            return PulseChart.DefaultSettings.playback.pauseDuration * 1000;
        }

        private getDotTransparency(): number {
            if (this.data &&
                this.data.settings &&
                this.data.settings.dots) {
                    return this.data.settings.dots.transparency / 100;
                }
            return 1;
        }

        private drawDots(data: PulseChartData): void {
            var xScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>data.xScale,
                yScales: D3.Scale.LinearScale[] = <D3.Scale.LinearScale[]>data.yScales,
                node: ClassAndSelector = PulseChart.Dot,
                nodeParent: ClassAndSelector = PulseChart.DotsContainer,
                rootSelection: D3.UpdateSelection = this.rootSelection,
                sm: SelectionManager = this.selectionManager,
                dotColor: string = this.data.settings.dots.color,
                dotSize: number = this.data.settings.dots.size,
                dotTransparency: number = this.getDotTransparency(),
                isAnimated: boolean = this.animationHandler.isAnimated(),
                position: PulseChartAnimationPosition = this.animationHandler.getPosition();

           var selection: D3.UpdateSelection = rootSelection.filter((d, index) => !isAnimated || index <= position.series)
                .select(nodeParent.selector)
                .selectAll(node.selector)
                .data((d: PulseChartSeries, seriesIndex: number) => {
                    return _.filter(d.data, (value: PulseChartDataPoint, valueIndex: number): boolean => {
                        if (isAnimated && (seriesIndex === position.series) && (valueIndex > position.index)) {
                            return false;
                        }
                        return (!!value.popupInfo);
                    });
                });

            selection
                .enter()
                .append("circle")
                .classed(node.class, true);

            selection
                .attr("cx", (d: PulseChartDataPoint) => xScale(d.categoryValue))
                .attr("cy", (d: PulseChartDataPoint) => yScales[d.groupIndex](d.y))
                .attr("r", (d: PulseChartDataPoint) => d.eventSize || dotSize)
                .style("fill", dotColor)
                .style("opacity", dotTransparency)
                .style("cursor", "pointer")
                /*.on("mouseover", function(d) {
                    d3.select(this)
                        .attr("r", (d.eventSize || dotSize) * 1.1);
                })
                .on("mouseout", function(d) {
                    d3.select(this)
                        .attr("r", d.eventSize || dotSize);
                })*/
                .on("click", (d: PulseChartDataPoint) => {
                    d3.event.stopPropagation();
                    sm.select(d.identity, d3.event.ctrlKey)
                        .then((selectionIds: SelectionId[]) => this.setSelection(selectionIds));
                });

            selection
                .exit()
                .remove();
        }

        private renderGaps(data: PulseChartData, duration: number): void {
            var gaps: IRect[],
                gapsSelection: D3.UpdateSelection,
                gapsEnterSelection: D3.Selection,
                gapNodeSelection: D3.UpdateSelection,
                series: PulseChartSeries[] = data.series,
                isScalar: boolean = data.isScalar,
                xScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>data.xScale;

            gaps = [{
                left: -4.5,
                top: -5,
                height: 10,
                width: 3
            }, {
                left: 1.5,
                top: -5,
                height: 10,
                width: 3
            }];

            gapsSelection = this.gaps.selectAll(PulseChart.Gap.selector)
                .data(series.slice(0, series.length - 1));

            gapsEnterSelection = gapsSelection
                .enter()
                .append("g");

            gapsSelection
                .attr("transform", (seriesElement: PulseChartSeries, index: number) => {
                    var x: number,
                        middleOfGap: number = seriesElement.widthOfGap / 2,
                        categoryValue: number | Date = seriesElement.data[seriesElement.data.length - 1].categoryValue;

                    if (isScalar) {
                        x = xScale(middleOfGap + <number>categoryValue);
                    } else {
                        x = xScale(new Date(middleOfGap + ((<Date>categoryValue).getTime())));
                    }

                    return SVGUtil.translate(x, 0);
                });

            gapNodeSelection = gapsSelection.selectAll(PulseChart.GapNode.selector)
                .data(gaps);

            gapNodeSelection
                .enter()
                .append("rect")
                .attr({
                    x: (gap: IRect) => gap.left,
                    y: (gap: IRect) => gap.top,
                    height: (gap: IRect) => gap.height,
                    width: (gap: IRect) => gap.width
                })
                .classed(PulseChart.GapNode.class, true);

            gapsEnterSelection.classed(PulseChart.Gap.class, true);

            gapsSelection
                .exit()
                .remove();

            gapNodeSelection
                .exit()
                .remove();
        }

        private setSelection(selectionIds?: SelectionId[]): void {
            this.drawDots(this.data);
            this.drawTooltips(this.data, selectionIds);
        }

        private isPopupShow(d: PulseChartDataPoint, selectionIds?: SelectionId[]): boolean {
            var data = this.data;

            if (!d.popupInfo) {
                return false;
            }

            if (data &&
                data.settings &&
                data.settings.popup &&
                (data.settings.popup.showType === PulseChartPopupShow.Hide)) {
                    return false;
                }

            if (selectionIds) {
                return SelectionManager.containsSelection(selectionIds, d.identity);
            }

            if (data &&
                data.settings &&
                data.settings.popup &&
                (data.settings.popup.showType === (<any>PulseChartPopupShow).Always)) {//Remove "<any>" if "PulseChartPopupShow.Always" will be defined.
                    return true;
                }

            return false;
        }

        private drawTooltips(data: PulseChartData, selectionIds?: SelectionId[]) {
            var xScale: D3.Scale.LinearScale = <D3.Scale.LinearScale>data.xScale,
                yScales: D3.Scale.LinearScale[] = <D3.Scale.LinearScale[]>data.yScales,
                node: ClassAndSelector = PulseChart.Tooltip,
                nodeParent: ClassAndSelector = PulseChart.TooltipContainer;

            var rootSelection: D3.UpdateSelection = this.rootSelection;

            var line: D3.Svg.Line = d3.svg.line()
                .x(d => d.x)
                .y(d => d.y);

            var marginTop: number = PulseChart.DefaultTooltipSettings.marginTop;
            var width: number = this.data.settings.popup.width;
            var height: number = this.data.settings.popup.height;

            var topShift: number = 20;
            var tooltipShiftY = (y: number, groupIndex: number) => this.isHigherMiddle(y, groupIndex) ? (-1 * marginTop + topShift) : this.size.height + marginTop;

            var tooltipRoot: D3.UpdateSelection = rootSelection.select(nodeParent.selector).selectAll(node.selector)
                .data(d => {
                    return _.filter(d.data, (value: PulseChartDataPoint) => this.isPopupShow(value, selectionIds));
                });

            tooltipRoot
                .enter()
                .append("g")
                .classed(node.class, true);

            tooltipRoot
                .attr("transform", (d: PulseChartDataPoint) => {
                    var x: number = xScale(d.x) - width / 2;
                    var y: number = tooltipShiftY(d.y, d.groupIndex);
                    d.popupInfo.offsetX = Math.min(this.viewport.width - this.margin.right - width, Math.max(-this.margin.left, x)) - x;
                    return SVGUtil.translate(x + d.popupInfo.offsetX, y);
                });

            var tooltipRect = tooltipRoot.selectAll(PulseChart.TooltipRect.selector).data(d => [d]);
            tooltipRect.enter().append("path").classed(PulseChart.TooltipRect.class, true);
            tooltipRect
                .attr("display", (d: PulseChartDataPoint) => d.popupInfo ? "inherit" : "none")
                .style('fill', this.data.settings.popup.color)
                .attr('d', (d: PulseChartDataPoint) => {
                    var path = [
                        {
                            "x": -2,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * marginTop) : 0,
                        },
                        {
                            "x": -2,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * (marginTop + height)) : height,
                        },
                        {
                            "x": width - 2,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * (marginTop + height)) : height,
                        },
                        {
                            "x": width - 2,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * marginTop) : 0,
                        }
                    ];
                    return line(path);
                });

            var tooltipTriangle = tooltipRoot.selectAll(PulseChart.TooltipTriangle.selector).data(d => [d]);
            tooltipTriangle.enter().append("path").classed(PulseChart.TooltipTriangle.class, true);
            tooltipTriangle
                .style('fill', this.data.settings.popup.color)
                .attr('d', (d: PulseChartDataPoint) => {
                    var path = [
                        {
                            "x": width / 2 - 5 - d.popupInfo.offsetX,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * marginTop) : 0,
                        },
                        {
                            "x": width / 2 - d.popupInfo.offsetX,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * (marginTop - 5)) : -5,
                        },
                        {
                            "x": width / 2 + 5 - d.popupInfo.offsetX,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * marginTop) : 0,
                        },
                    ];
                    return line(path);
                })
                .style('stroke-width', "1px");

            var tooltipLine = tooltipRoot.selectAll(PulseChart.TooltipLine.selector).data(d => [d]);
            tooltipLine.enter().append("path").classed(PulseChart.TooltipLine.class, true);
            tooltipLine
                .style('fill', this.data.settings.popup.color)
                .style('stroke', this.data.settings.popup.color)
                .style('stroke-width', "1px")
                .attr('d', (d: PulseChartDataPoint) => {
                    var path = [
                        {
                            "x": width/2 - d.popupInfo.offsetX,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ?
                                yScales[d.groupIndex](d.y) + tooltipShiftY(d.y, d.groupIndex) - d.eventSize :
                                yScales[d.groupIndex](d.y) - tooltipShiftY(d.y, d.groupIndex) + d.eventSize,
                        },
                        {
                            "x": width/2 - d.popupInfo.offsetX,
                            "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * marginTop) : 0, //end
                        }];
                    return line(path);
                });

            var isShowTime: boolean = this.data.settings.popup.showTime;
            var isShowTitle: boolean = this.data.settings.popup.showTitle;

            if (isShowTime) {
                var timeRect = tooltipRoot.selectAll(PulseChart.TooltipTimeRect.selector).data(d => [d]);
                var timeDisplayStyle = { "display": isShowTime ? "" : "none" };
                timeRect.enter().append("path").classed(PulseChart.TooltipTimeRect.class, true);
                timeRect
                    .style("fill", this.data.settings.popup.timeFill)
                    .style(timeDisplayStyle)
                    .attr('d', (d: PulseChartDataPoint) => {
                        var path = [
                            {
                                "x": width - this.data.widthOfTooltipValueLabel - 2,
                                "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * (marginTop + height)) : 0,
                            },
                            {
                                "x": width - this.data.widthOfTooltipValueLabel  -2,
                                "y": this.isHigherMiddle(d.y, d.groupIndex)
                                    ? (-1 * (marginTop + height - PulseChart.DefaultTooltipSettings.timeHeight))
                                    : PulseChart.DefaultTooltipSettings.timeHeight,
                            },
                            {
                                "x": width - 2,
                                "y": this.isHigherMiddle(d.y, d.groupIndex)
                                    ? (-1 * (marginTop + height - PulseChart.DefaultTooltipSettings.timeHeight))
                                    : PulseChart.DefaultTooltipSettings.timeHeight,
                            },
                            {
                                "x": width - 2,
                                "y": this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * (marginTop + height)) : 0,
                            }
                        ];
                        return line(path);
                    });

                var time = tooltipRoot.selectAll(PulseChart.TooltipTime.selector).data(d => [d]);
                time.enter().append("text").classed(PulseChart.TooltipTime.class, true);
                time
                    .style(PulseChart.ConvertTextPropertiesToStyle(PulseChart.GetPopupValueTextProperties()))
                    .style(timeDisplayStyle)
                    .style("fill", this.data.settings.popup.timeColor)
                    .attr("x", (d: PulseChartDataPoint) => width - this.data.widthOfTooltipValueLabel)
                    .attr("y", (d: PulseChartDataPoint) => this.isHigherMiddle(d.y, d.groupIndex)
                        ? (-1 * (marginTop + height - PulseChart.DefaultTooltipSettings.timeHeight  + 3))
                        : PulseChart.DefaultTooltipSettings.timeHeight - 3)
                    .text((d: PulseChartDataPoint) => d.popupInfo.value);
            }

            if (isShowTitle) {
                var title = tooltipRoot.selectAll(PulseChart.TooltipTitle.selector).data(d => [d]);
                title.enter().append("text").classed(PulseChart.TooltipTitle.class, true);
                title
                    .style(PulseChart.ConvertTextPropertiesToStyle(PulseChart.GetPopupTitleTextProperties()))
                    .style("fill", this.data.settings.popup.fontColor)
                    //.attr("stroke", "white")
                    .attr("x", (d: PulseChartDataPoint) => PulseChart.PopupTextPadding)
                    .attr("y", (d: PulseChartDataPoint) => (this.isHigherMiddle(d.y, d.groupIndex) ? (-1 * (marginTop + height - 12)) : 12) + PulseChart.PopupTextPadding)
                    .text((d: PulseChartDataPoint) => {
                        if (!d.popupInfo) {
                            return "";
                        }

                        return TextMeasurementService.getTailoredTextOrDefault(PulseChart.GetPopupTitleTextProperties(d.popupInfo.title),
                            width - 2 - (isShowTime ? this.data.widthOfTooltipValueLabel : 0) - PulseChart.PopupTextPadding * 2);
                    });
            }

            var getDescriptionDimenstions = (d: PulseChartDataPoint): PulseChartElementDimensions => {
                var shiftY: number = PulseChart.PopupTextPadding + this.data.settings.popup.fontSize;

                var descriptionYOffset: number = shiftY + PulseChart.DefaultTooltipSettings.timeHeight;
                if (d.popupInfo) {
                    shiftY = ((isShowTitle && d.popupInfo.title) || (isShowTime && d.popupInfo.value)) ? descriptionYOffset: shiftY;
                }

                return {
                    y: this.isHigherMiddle(d.y, d.groupIndex)
                                    ? (-1 * (marginTop + height - shiftY))
                                    : shiftY,
                    x: PulseChart.PopupTextPadding,
                    width: width - PulseChart.PopupTextPadding,
                    height: height - shiftY,
                };
            };

            var description = tooltipRoot.selectAll(PulseChart.TooltipDescription.selector).data(d => [d]);
            description.enter().append("text").classed(PulseChart.TooltipDescription.class, true);
            description
                .style(PulseChart.ConvertTextPropertiesToStyle(PulseChart.GetPopupDescriptionTextProperties(null, this.data.settings.popup.fontSize)))
                .style("fill", this.data.settings.popup.fontColor)
                .text((d: PulseChartDataPoint) => d.popupInfo && d.popupInfo.description)
                //.call(d => d.forEach(x => x[0] &&
                //    TextMeasurementService.wordBreak(x[0], width - 2 - PulseChart.PopupTextPadding * 2, height - PulseChart.DefaultTooltipSettings.timeHeight - PulseChart.PopupTextPadding * 2)))
                //    TextMeasurementService.wordBreak(x[0], width - 2 - PulseChart.PopupTextPadding * 2, height - PulseChart.DefaultTooltipSettings.timeHeight - PulseChart.PopupTextPadding * 2)))
                .attr("y", function(d: PulseChartDataPoint) {
                    var descriptionDimenstions: PulseChartElementDimensions = getDescriptionDimenstions(d);
                    var el: SVGTextElement = <any>d3.select(this)[0][0];
                    TextMeasurementService.wordBreak(el, descriptionDimenstions.width, descriptionDimenstions.height);
                    return 0;
                })
                .attr("transform", function(d: PulseChartDataPoint) {
                    var descriptionDimenstions: PulseChartElementDimensions = getDescriptionDimenstions(d);
                    return SVGUtil.translate(0, descriptionDimenstions.y);
                });
            description.selectAll("tspan").attr("x", PulseChart.PopupTextPadding);

            tooltipRoot
                .exit()
                .remove();
        }

        private isHigherMiddle(value: number, groupIndex: number): boolean {
            if (this.data.settings.popup.alwaysOnTop) {
                return true;
            }

            if (this.data.yScales.length > 1) {
                return groupIndex === 0;
            }

            var domain: number[] = this.data.commonYScale.domain(),
                minValue: number = d3.min(domain),
                middleValue = Math.abs((d3.max(domain) - minValue) / 2);

            middleValue = middleValue === 0
                ? middleValue
                : minValue + middleValue;

            return value >= middleValue;
        }

        private static getObjectsFromDataView(dataView: DataView): DataViewObjects {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.objects) {
                return null;
            }

            return dataView.metadata.objects;
        }

        private static parseSettings(dataView: DataView, colors: IDataColorPalette, columns: PulseChartDataRoles<DataViewCategoricalColumn>): PulseChartSettings {
            var settings: PulseChartSettings = <PulseChartSettings>{},
                objects: DataViewObjects = PulseChart.getObjectsFromDataView(dataView);

            settings.xAxis = this.getAxisXSettings(objects, colors);
            settings.yAxis = this.getAxisYSettings(objects, colors);
            settings.popup = this.getPopupSettings(objects, colors);
            settings.dots = this.getDotsSettings(objects, colors);

            settings.series = this.getSeriesSettings(objects, colors);
            settings.gaps = this.getGapsSettings(objects);
            settings.playback = this.getPlaybackSettings(objects, colors);
            settings.runnerCounter = this.getRunnerCounterSettings(objects, colors, columns);

            return settings;
        }

        private static getPopupSettings(objects: DataViewObjects, colors: IDataColorPalette): PulseChartPopupSettings {
            var alwaysOnTop: boolean =  DataViewObjects.getValue<boolean>(
                objects,
                PulseChart.Properties["popup"]["alwaysOnTop"],
                PulseChart.DefaultSettings.popup.alwaysOnTop);

            var showType = DataViewObjects.getValue<PulseChartPopupShow>(
                objects,
                PulseChart.Properties["popup"]["showType"],
                PulseChart.DefaultSettings.popup.showType);

            var width = Math.max(1, Math.min(999999, DataViewObjects.getValue<number>(
                objects,
                PulseChart.Properties["popup"]["width"],
                PulseChart.DefaultSettings.popup.width)));

            var height: number = Math.max(1, Math.min(200, DataViewObjects.getValue<number>(
                objects,
                PulseChart.Properties["popup"]["height"],
                PulseChart.DefaultSettings.popup.height)));

            var colorHelper = new ColorHelper(
                colors,
                PulseChart.Properties["popup"]["color"],
                PulseChart.DefaultSettings.popup.color);

            var color = colorHelper.getColorForMeasure(objects, "");

            var fontSize = parseInt(DataViewObjects.getValue<any>(
                objects,
                PulseChart.Properties["popup"]["fontSize"],
                PulseChart.DefaultSettings.popup.fontSize), 10);

            var fontColorHelper = new ColorHelper(
                colors,
                PulseChart.Properties["popup"]["fontColor"],
                PulseChart.DefaultSettings.popup.fontColor);

            var fontColor = fontColorHelper.getColorForMeasure(objects, "");

            var showTime =  DataViewObjects.getValue<boolean>(
                objects,
                PulseChart.Properties["popup"]["showTime"],
                PulseChart.DefaultSettings.popup.showTime);

            var showTitle =  DataViewObjects.getValue<boolean>(
                objects,
                PulseChart.Properties["popup"]["showTitle"],
                PulseChart.DefaultSettings.popup.showTitle);

            var timeColorHelper = new ColorHelper(
                colors,
                PulseChart.Properties["popup"]["timeColor"],
                PulseChart.DefaultSettings.popup.timeColor);

            var timeColor = timeColorHelper.getColorForMeasure(objects, "");

            var timeFillHelper = new ColorHelper(
                colors,
                PulseChart.Properties["popup"]["timeFill"],
                PulseChart.DefaultSettings.popup.timeFill);

            var timeFill = timeFillHelper.getColorForMeasure(objects, "");
            return {
                alwaysOnTop: alwaysOnTop,
                showType: showType,
                width: width,
                height: height,
                color: color,
                fontSize: fontSize,
                fontColor: fontColor,
                showTime: showTime,
                showTitle: showTitle,
                timeColor: timeColor,
                timeFill: timeFill,
            };
        }

        private static getDotsSettings(objects: DataViewObjects, colors: IDataColorPalette): PulseChartDotsSettings {
            var properties = PulseChart.Properties["dots"],
                defaultSettings: PulseChartDotsSettings = PulseChart.DefaultSettings.dots;

            var colorHelper = new ColorHelper(
                colors,
                properties["color"],
                defaultSettings.color);

            var color = colorHelper.getColorForMeasure(objects, "");

            var minSize: number = DataViewObjects.getValue<number>(
                objects,
                properties["minSize"],
                defaultSettings.minSize);

            var maxSize: number = DataViewObjects.getValue<number>(
                objects,
                properties["maxSize"],
                defaultSettings.maxSize);

            if (maxSize < minSize) {
                maxSize = minSize;
            }

            var size: number = DataViewObjects.getValue<number>(
                objects,
                properties["size"],
                defaultSettings.size);

            if (size < minSize) {
                size = minSize;
            }

            if (size > maxSize) {
                size = maxSize;
            }

            var transparency: number = Math.max(0, Math.min(100, DataViewObjects.getValue<number>(
                objects,
                properties["transparency"],
                defaultSettings.transparency)));

            return {
                color: color,
                size: size,
                minSize: minSize,
                maxSize: maxSize,
                transparency: transparency,
            };
        }

        private static getSeriesSettings(objects: DataViewObjects, colors: IDataColorPalette): PulseChartSeriesSetting {
            var width = DataViewObjects.getValue<number>(
                objects,
                PulseChart.Properties["series"]["width"],
                PulseChart.DefaultSettings.series.width);

            var colorHelper = new ColorHelper(
                colors,
                PulseChart.Properties["series"]["fill"],
                PulseChart.DefaultSettings.series.fill);

            var fill = colorHelper.getColorForMeasure(objects, "");

            var showByDefault = DataViewObjects.getValue<boolean>(
                objects,
                PulseChart.Properties["series"]["showByDefault"],
                PulseChart.DefaultSettings.series.showByDefault);

            return {
                width,
                fill,
                showByDefault
            };
        }

        private static getGapsSettings(objects: DataViewObjects): PulseChartGapsSettings {
            var show =  DataViewObjects.getValue<boolean>(
                objects,
                PulseChart.Properties["gaps"]["show"],
                PulseChart.DefaultSettings.gaps.show);

            var visibleGapsPercentage = Math.max(1, Math.min(100, DataViewObjects.getValue<number>(
                objects,
                PulseChart.Properties["gaps"]["transparency"],
                PulseChart.DefaultSettings.gaps.visibleGapsPercentage)));
            return {
                show: show,
                visibleGapsPercentage: visibleGapsPercentage
            };
        }

        private static getAxisXSettings(objects: DataViewObjects, colors: IDataColorPalette): PulseChartXAxisSettings {
            var properties = PulseChart.Properties["xAxis"],
            defaultSettings: PulseChartXAxisSettings = PulseChart.DefaultSettings.xAxis;

            var colorHelper = new ColorHelper(colors,
                properties["color"],
                defaultSettings.color);

            var color = colorHelper.getColorForMeasure(objects, "");

            var fontColorHelper = new ColorHelper(colors,
                properties["fontColor"],
                defaultSettings.fontColor);

            var fontColor = fontColorHelper.getColorForMeasure(objects, "");

            var show = DataViewObjects.getValue<boolean>(
                objects,
                properties["show"],
                defaultSettings.show);

            var position = DataViewObjects.getValue<XAxisPosition>(
                objects,
                properties["position"],
                defaultSettings.position);

            /*var dateFormat = DataViewObjects.getValue<PulseChartXAxisDateFormat>(
                objects,
                PulseChart.Properties["xAxis"]["dateFormat"],
                PulseChart.DefaultSettings.xAxis.dateFormat);*/

            return {
                color: color,
                //dateFormat: dateFormat,
                fontColor: fontColor,
                position: position,
                show: show,
            };
        }

        private static getAxisYSettings(objects: DataViewObjects, colors: IDataColorPalette): PulseChartYAxisSettings {
            var properties = PulseChart.Properties["yAxis"],
                defaultSettings: PulseChartYAxisSettings = PulseChart.DefaultSettings.yAxis;

            var colorHelper = new ColorHelper(
                colors,
                properties["color"],
                defaultSettings.color);

            var color = colorHelper.getColorForMeasure(objects, "");

            var fontColorHelper = new ColorHelper(
                colors,
                properties["fontColor"],
                defaultSettings.fontColor);

            var fontColor = fontColorHelper.getColorForMeasure(objects, "");

            var show = DataViewObjects.getValue<boolean>(
                objects,
                properties["show"],
                defaultSettings.show);

            return {
                color: color,
                fontColor: fontColor,
                show: show,
            };
        }

        private static getPlaybackSettings(objects: DataViewObjects, colors: IDataColorPalette): PulseChartPlaybackSettings {
            var playbackSettings: PulseChartPlaybackSettings = <PulseChartPlaybackSettings> {};
            var properties = PulseChart.Properties["playback"],
                defaultSettings: PulseChartPlaybackSettings = PulseChart.DefaultSettings.playback;

            playbackSettings.autoplay = DataViewObjects.getValue<boolean>(
                objects,
                properties["autoplay"],
                defaultSettings.autoplay);

            playbackSettings.playSpeed = DataViewObjects.getValue<number>(
                objects,
                properties["playSpeed"],
                defaultSettings.playSpeed);

            playbackSettings.pauseDuration = DataViewObjects.getValue<number>(
                objects,
                properties["pauseDuration"],
                defaultSettings.pauseDuration);

            playbackSettings.autoplayPauseDuration = DataViewObjects.getValue<number>(
                objects,
                properties["autoplayPauseDuration"],
                defaultSettings.autoplayPauseDuration);

            var colorHelper = new ColorHelper(
                colors,
                properties["color"],
                defaultSettings.color);

            playbackSettings.color = colorHelper.getColorForMeasure(objects, "");

            return playbackSettings;
        }

        private static getRunnerCounterSettings(objects: DataViewObjects, colors: IDataColorPalette, columns: PulseChartDataRoles<DataViewCategoricalColumn>): PulseChartRunnerCounterSettings {
            var show: boolean =  DataViewObjects.getValue<boolean>(
                objects,
                PulseChart.Properties["runnerCounter"]["show"],
                PulseChart.DefaultSettings.runnerCounter.show);

            var label: string = DataViewObjects.getValue<string>(
                objects,
                PulseChart.Properties["runnerCounter"]["label"],
                columns.RunnerCounter && columns.RunnerCounter.source && columns.RunnerCounter.source.displayName
                    || PulseChart.DefaultSettings.runnerCounter.label);

            var position = DataViewObjects.getValue<RunnerCounterPosition>(
                objects,
                PulseChart.Properties["runnerCounter"]["position"],
                PulseChart.DefaultSettings.runnerCounter.position);

            var fontSize = parseInt(DataViewObjects.getValue<any>(
                objects,
                PulseChart.Properties["runnerCounter"]["fontSize"],
                PulseChart.DefaultSettings.runnerCounter.fontSize), 10);

            var fontColor = new ColorHelper(
                colors,
                PulseChart.Properties["runnerCounter"]["fontColor"],
                PulseChart.DefaultSettings.runnerCounter.fontColor)
                .getColorForMeasure(objects, "");

            return {
                show: show,
                label: label,
                position: position,
                fontSize: fontSize,
                fontColor: fontColor
            };
        }

        private clearAll(): void {
            this.gaps.selectAll(PulseChart.Gap.selector).remove();

            if (this.animationHandler) {
                this.animationHandler.hide();
            }

            this.yAxis.selectAll("*").remove();

            this.clearChart();
        }

        public clearChart(): void {
           this.clearSelection();
           this.hideAnimationDot();
           this.chart.selectAll(PulseChart.Line.selector).remove();
           this.chart.selectAll(PulseChart.Dot.selector).remove();
           this.chart.selectAll(PulseChart.Tooltip.selector).remove();
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            var enumeration = new ObjectEnumerationBuilder(),
                settings: PulseChartSettings;

            settings = this.data.settings;

            switch (options.objectName) {
                case "popup": {
                    this.readPopupInstance(enumeration);
                    break;
                }
                case "dots": {
                    this.readDotsInstance(enumeration);
                    break;
                }
                case "xAxis": {
                    this.xAxisInstance(enumeration);
                    break;
                }
                case "yAxis": {
                    this.yAxisInstance(enumeration);
                    break;
                }
                case "series": {
                    this.readSeriesInstance(enumeration);
                    break;
                }
                case "gaps": {
                    this.readGapsInstance(enumeration);
                    break;
                }
                case "playback": {
                    this.readPlaybackInstance(enumeration);
                    break;
                }
                case "runnerCounter": {
                    this.readRunnerCounterInstance(enumeration);
                    break;
                }
            }

            return enumeration.complete();
        }

        private readPopupInstance(enumeration: ObjectEnumerationBuilder): void {
            var popupSettings: PulseChartPopupSettings = this.data.settings.popup;

            if (!popupSettings) {
                popupSettings = PulseChart.DefaultSettings.popup;
            }

            var popup: VisualObjectInstance = {
                objectName: "popup",
                displayName: "popup",
                selector: null,
                properties: {
                    alwaysOnTop: popupSettings.alwaysOnTop,
                    showType: popupSettings.showType,
                    width: popupSettings.width,
                    height: popupSettings.height,
                    color: popupSettings.color,
                    fontColor: popupSettings.fontColor,
                    fontSize: popupSettings.fontSize,
                    showTime: popupSettings.showTime,
                    showTitle: popupSettings.showTitle,
                    timeColor: popupSettings.timeColor,
                    timeFill: popupSettings.timeFill,
                }
            };

            enumeration.pushInstance(popup);
        }

        private readDotsInstance(enumeration: ObjectEnumerationBuilder): void {
            var settings: PulseChartDotsSettings = this.data.settings.dots;

            if (!settings) {
                settings = PulseChart.DefaultSettings.dots;
            }

            var instance: VisualObjectInstance = {
                objectName: "dots",
                displayName: "Dots",
                selector: null,
                properties: {
                    color: settings.color,
                    size: settings.size,
                    minSize: settings.minSize,
                    maxSize: settings.maxSize,
                    transparency: settings.transparency,
                }
            };

            enumeration.pushInstance(instance);
        }

        private xAxisInstance(enumeration: ObjectEnumerationBuilder): void {
            var xAxisSettings: PulseChartXAxisSettings =
                this.data.settings.xAxis || PulseChart.DefaultSettings.xAxis;

            enumeration.pushInstance({
                objectName: "xAxis",
                displayName: "xAxis",
                selector: null,
                properties: {
                    color: xAxisSettings.color,
                    fontColor: xAxisSettings.fontColor,
                    show: xAxisSettings.show,
                    position: xAxisSettings.position,
                    //dateFormat: xAxisSettings.dateFormat
                }
            });
        }

        private yAxisInstance(enumeration: ObjectEnumerationBuilder): void {
            var yAxisSettings: PulseChartYAxisSettings =
                this.data.settings.yAxis || PulseChart.DefaultSettings.yAxis;

            enumeration.pushInstance({
                objectName: "yAxis",
                displayName: "yAxis",
                selector: null,
                properties: {
                    color: yAxisSettings.color,
                    fontColor: yAxisSettings.fontColor,
                    show: yAxisSettings.show
                }
            });
        }

        private readSeriesInstance(enumeration: ObjectEnumerationBuilder): void {
            var seriesSettings: PulseChartSeriesSetting =
                this.data.settings.series || PulseChart.DefaultSettings.series;

            var series: VisualObjectInstance = {
                objectName: "series",
                displayName: "series",
                selector: null,
                properties: {
                    fill: seriesSettings.fill,
                    width: seriesSettings.width,
                    showByDefault: seriesSettings.showByDefault
                }
            };

            enumeration.pushInstance(series);
        }

        private readGapsInstance(enumeration: ObjectEnumerationBuilder): void {
            var gapsSettings: PulseChartGapsSettings =
                this.data.settings.gaps || PulseChart.DefaultSettings.gaps;

            var gaps: VisualObjectInstance = {
                objectName: "gaps",
                selector: null,
                properties: {
                    show: gapsSettings.show,
                    transparency: gapsSettings.visibleGapsPercentage //visibleGapsPercentage
                }
            };

            enumeration.pushInstance(gaps);
        }

        private readPlaybackInstance(enumeration: ObjectEnumerationBuilder): void {
            var playbackSettings: PulseChartPlaybackSettings =
                this.data.settings.playback || PulseChart.DefaultSettings.playback;

            enumeration.pushInstance({
                objectName: "playback",
                displayName: "playback",
                selector: null,
                properties: {
                    autoplay: playbackSettings.autoplay,
                    playSpeed: playbackSettings.playSpeed,
                    pauseDuration: playbackSettings.pauseDuration,
                    autoplayPauseDuration: playbackSettings.autoplayPauseDuration,
                    color: playbackSettings.color,
                }
            });
        }

        private readRunnerCounterInstance(enumeration: ObjectEnumerationBuilder): void {
            var runnerCounterSettings: PulseChartRunnerCounterSettings =
                this.data.settings.runnerCounter || PulseChart.DefaultSettings.runnerCounter;

            if(this.data.columns.RunnerCounter) {
                enumeration.pushInstance({
                    objectName: "runnerCounter",
                    selector: null,
                    properties: {
                        show: runnerCounterSettings.show,
                        label: runnerCounterSettings.label,
                        position: runnerCounterSettings.position,
                        fontSize: runnerCounterSettings.fontSize,
                        fontColor: runnerCounterSettings.fontColor
                    }
                });
            }
        }
    }

    enum PulseAnimatorStates {
        Ready,
        Play,
        Paused,
        Stopped,
    }

    export class PulseAnimator {
        private chart: PulseChart;
        private svg: D3.Selection;
        private animationPlay: D3.Selection;
        private animationPause: D3.Selection;
        private animationReset: D3.Selection;
        private animationToEnd: D3.Selection;
        private animationPrev: D3.Selection;
        private animationNext: D3.Selection;
        private runnerCounter: D3.Selection;
        private runnerCounterText: D3.Selection;

        private static AnimationPlay: ClassAndSelector = createClassAndSelector('animationPlay');
        private static AnimationPause: ClassAndSelector = createClassAndSelector('animationPause');
        private static AnimationReset: ClassAndSelector = createClassAndSelector('animationReset');
        private static AnimationToEnd: ClassAndSelector = createClassAndSelector('animationToEnd');
        private static AnimationPrev: ClassAndSelector = createClassAndSelector('animationPrev');
        private static AnimationNext: ClassAndSelector = createClassAndSelector('animationNext');
        private static RunnerCounter: ClassAndSelector = createClassAndSelector('runnerCounter');
        private animatorState: PulseAnimatorStates;

        private position: PulseChartAnimationPosition;

        private static animationMinSeries: number = 0;
        private static animationMinIndex: number = 0;

        private container: D3.Selection;

        private currentDataPoint: PulseChartDataPoint;
        private runnerCounterValue: any;
        private runnerCounterTopLeftPosition: number = 120;
        private get runnerCounterPosition(): RunnerCounterPosition {
            return this.chart.data.settings.runnerCounter.position;
        }
        private get maxTextWidthOfRunnerCounterValue(): number {
            var top = this.runnerCounterPosition === RunnerCounterPosition.TopLeft || this.runnerCounterPosition === RunnerCounterPosition.TopRight;
            return this.chart.viewport.width - (top ? this.runnerCounterTopLeftPosition : 0);
        }

        private color: string;

        private static ControlsDuration = 250;
        private static DimmedOpacity = 0.25;
        private static DefaultOpacity = 1;
        private static DefaultControlsColor = "#777";

        constructor(chart: PulseChart, svg: D3.Selection) {
            this.chart = chart;
            this.svg = svg;

            this.setDefaultValues();

            var container = this.container = this.svg.append('g');

            this.animationPlay = container.append('g').classed(PulseAnimator.AnimationPlay.class, true);
            this.animationPlay
                .append("circle")
                .attr("cx", 12)
                .attr("cy", 12)
                .attr("r", 10)
                .attr("fill", "transparent");

            this.animationPlay
                .append("path")
                .attr("d", "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z");

            this.animationPause = container.append('g').classed(PulseAnimator.AnimationPause.class, true);
            this.animationPause
                .append("circle")
                .attr("cx", 12)
                .attr("cy", 12)
                .attr("r", 10)
                .attr("fill", "transparent");

            this.animationPause
                .append("path")
                .attr("d", "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17h-3v-10h3v10zm5-10h-3v10h3v-10z");

            this.animationReset = container.append('g').classed(PulseAnimator.AnimationReset.class, true);
            this.animationReset
                .append("circle")
                .attr("cx", 12)
                .attr("cy", 12)
                .attr("r", 10)
                .attr("fill", "transparent");

            this.animationReset
                .append("path")
                .attr("d", "M22 12c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm-22 0c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm13 0l5-4v8l-5-4zm-5 0l5-4v8l-5-4zm-2 4h2v-8h-2v8z");

            /* Prev */
            this.animationPrev = container.append('g').classed(PulseAnimator.AnimationPrev.class, true);
            this.animationPrev
                .append("circle")
                .attr("cx", 12)
                .attr("cy", 12)
                .attr("r", 10)
                .attr("fill", "transparent");

            this.animationPrev
                .append("path")
                .attr("d", "M9.5 12l7.5-4.5v9l-7.5-4.5zm-4.5 0l6.5 4v-1.634l-3.943-2.366 3.943-2.366v-1.634l-6.5 4zm17 0c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm-22 0c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12z");

            /* Next */
            this.animationNext = container.append('g').classed(PulseAnimator.AnimationNext.class, true);
            this.animationNext
                .append("circle")
                .attr("cx", 12)
                .attr("cy", 12)
                .attr("r", 10)
                .attr("fill", "transparent");

            this.animationNext
                .append("path")
                .attr("d", "M7 16.5v-9l7.5 4.5-7.5 4.5zm5.5-8.5v1.634l3.943 2.366-3.943 2.366v1.634l6.5-4-6.5-4zm-.5-6c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z")
                .attr("rotate", 180);

            /* ToEnd */
            this.animationToEnd = container.append('g').classed(PulseAnimator.AnimationToEnd.class, true);
            this.animationToEnd
                .append("circle")
                .attr("cx", 12)
                .attr("cy", 12)
                .attr("r", 10)
                .attr("fill", "transparent");

            this.animationToEnd
                .append("path")
                .attr("d", "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-6 16v-8l5 4-5 4zm5 0v-8l5 4-5 4zm7-8h-2v8h2v-8z");

            this.runnerCounter = container.append('g').classed(PulseAnimator.RunnerCounter.class, true);
            this.runnerCounterText = this.runnerCounter.append('text');
            this.runnerCounterText.style('alignment-baseline', "hanging");
            this.setControlsColor(PulseAnimator.DefaultControlsColor);
        }

        private setDefaultValues() {
            this.setPosition({
                series: PulseAnimator.animationMinSeries,
                index: PulseAnimator.animationMinIndex
            });

            this.animatorState = PulseAnimatorStates.Ready;

            this.runnerCounterValue = null;
        }

        public render(isAutoPlay: boolean): void {
            this.renderControls();

            if (this.animatorState === PulseAnimatorStates.Play) {
                this.play();
            } else if (isAutoPlay && (this.animatorState === PulseAnimatorStates.Ready)) {
                this.play();
            } else {
                this.chart.renderChart();
            }
        }

        public setControlsColor(color: string): void {
            this.color = color;
        }

        private renderControls(): void {
            this.show();

            this.animationPlay
                .attr("fill", this.color)
                .attr('transform', SVGUtil.translate(0, 0))
                .on("click", () => !this.isPlaying() && void this.play());

            this.animationPause
                .attr("fill", this.color)
                .attr('transform', SVGUtil.translate(30, 0))
                .on("click", () => this.stop());

            this.animationReset
                .attr("fill", this.color)
                .attr('transform', SVGUtil.translate(60, 0))
                .on("click", () => this.reset());

            this.animationPrev
                .attr("fill", this.color)
                .attr('transform', SVGUtil.translate(90, 0))
                .on("click", () => this.prev());

            this.animationNext
                .attr("fill", this.color)
                .attr('transform', SVGUtil.translate(120, 0))
                .on("click", () => this.next());

            this.animationToEnd
                .attr("fill", this.color)
                .attr('transform', SVGUtil.translate(150, 0))
                .on("click", () => this.isAnimated() && void this.toEnd());

            this.runnerCounter
                .attr('fill', this.color)
                .attr('transform',
                    SVGUtil.translate(this.runnerCounterPosition === RunnerCounterPosition.TopLeft ? this.runnerCounterTopLeftPosition : this.chart.viewport.width, 3));
            this.runnerCounterText
                .style('text-anchor', this.runnerCounterPosition === RunnerCounterPosition.TopLeft ? "start" : "end" );

            this.runnerCounterText.style(PulseChart.ConvertTextPropertiesToStyle(
                PulseChart.GetRunnerCounterTextProperties(null, this.chart.data.settings.runnerCounter.fontSize)));
            this.runnerCounterText.style('fill', this.chart.data.settings.runnerCounter.fontColor);
            this.drawCounterValue();
        }

        private static setControlVisiblity(element: D3.Selection, isVisible:  boolean, isDisabled: boolean = false):  void {
            element
                //.transition()
                //.duration(PulseAnimator.ControlsDuration)
                .style('opacity', isVisible ? PulseAnimator.DefaultOpacity : PulseAnimator.DimmedOpacity);
            if (isVisible) {
                element.attr('display', "inline");
            } else if (isDisabled) {
                element.attr('display', "none");
            }
        }

        private disableControls(): void {
            PulseAnimator.setControlVisiblity(this.animationReset, true);
            PulseAnimator.setControlVisiblity(this.animationToEnd, true);

            switch (this.animatorState) {
                case PulseAnimatorStates.Play:
                    PulseAnimator.setControlVisiblity(this.animationPlay, false);

                    PulseAnimator.setControlVisiblity(this.animationPrev, true);
                    PulseAnimator.setControlVisiblity(this.animationNext, true);

                    PulseAnimator.setControlVisiblity(this.animationPause, true);
                    PulseAnimator.setControlVisiblity(this.runnerCounter, this.chart.data.settings && this.chart.data.settings.runnerCounter.show, true);
                    break;
                case PulseAnimatorStates.Paused:
                    PulseAnimator.setControlVisiblity(this.animationPlay, true);
                    PulseAnimator.setControlVisiblity(this.animationPause, true);

                    PulseAnimator.setControlVisiblity(this.animationPrev, true);
                    PulseAnimator.setControlVisiblity(this.animationNext, true);

                    PulseAnimator.setControlVisiblity(this.runnerCounter,  this.chart.data.settings && this.chart.data.settings.runnerCounter.show, true);
                    break;
                case PulseAnimatorStates.Stopped:
                    PulseAnimator.setControlVisiblity(this.animationPlay, true);

                    PulseAnimator.setControlVisiblity(this.animationPrev, true);
                    PulseAnimator.setControlVisiblity(this.animationNext, true);

                    PulseAnimator.setControlVisiblity(this.runnerCounter,  this.chart.data.settings && this.chart.data.settings.runnerCounter.show, true);

                    PulseAnimator.setControlVisiblity(this.animationPause, false);
                    break;
                case PulseAnimatorStates.Ready:
                    PulseAnimator.setControlVisiblity(this.animationPlay, true);

                    PulseAnimator.setControlVisiblity(this.animationPrev, false);
                    PulseAnimator.setControlVisiblity(this.animationNext, false);

                    PulseAnimator.setControlVisiblity(this.animationPause, false);
                    PulseAnimator.setControlVisiblity(this.runnerCounter, false, true);
                    break;
                default:
                    PulseAnimator.setControlVisiblity(this.animationPlay, true);

                    PulseAnimator.setControlVisiblity(this.animationPrev, false);
                    PulseAnimator.setControlVisiblity(this.animationNext, false);

                    PulseAnimator.setControlVisiblity(this.animationPause, false);
                    PulseAnimator.setControlVisiblity(this.runnerCounter, false, true);
                    break;
             }
        }

        public hide(): void {
            if (this.isAnimated()) {
                this.reset();
            }
            this.container.style('display', 'none');
        }

        public show(): void {
            this.disableControls();
            this.container.style('display', 'inline');
        }

        public setRunnerCounterValue(dataPoint?: PulseChartDataPoint): void {
            if(dataPoint) {
                this.currentDataPoint = dataPoint;
            }

            var runnerCounterValue: string = (this.currentDataPoint && this.currentDataPoint.runnerCounterValue != null)
                ? this.currentDataPoint.runnerCounterValue
                : "";

            if(this.currentDataPoint && this.currentDataPoint.runnerCounterFormatString) {
                var runnerCounterformatter = visuals.valueFormatter.create({ format: this.currentDataPoint.runnerCounterFormatString });
                runnerCounterValue = runnerCounterformatter.format(runnerCounterValue);
            }

            this.runnerCounterValue = this.chart.data.settings.runnerCounter.label + " " + runnerCounterValue;
            this.drawCounterValue();
        }

        private drawCounterValue(): void {
            var progressText = `${this.runnerCounterValue}`;
            this.runnerCounterText.text(progressText);
            TextMeasurementService.svgEllipsis(<any>this.runnerCounterText.node(), this.maxTextWidthOfRunnerCounterValue);
        }

        public isAnimated(): boolean {
            return (this.animatorState === PulseAnimatorStates.Paused) ||
                    (this.animatorState === PulseAnimatorStates.Play) ||
                    (this.animatorState === PulseAnimatorStates.Stopped);
        }

        public isPlaying(): boolean {
            return this.animatorState === PulseAnimatorStates.Play;
        }

        public isPaused(): boolean {
            return this.animatorState === PulseAnimatorStates.Paused;
        }

        public isStopped(): boolean {
            return this.animatorState === PulseAnimatorStates.Stopped;
        }

        public play(): void {
            if (this.animatorState === PulseAnimatorStates.Play) {
                return;
            }

            if (this.animatorState === PulseAnimatorStates.Ready) {
                this.chart.clearChart();
            }

            if (this.chart.isAnimationIndexLast(this.getPosition())) {
                this.playNext();
                return;
            }

            this.animatorState = PulseAnimatorStates.Play;
            this.chart.renderChart();
            this.chart.playAnimation();
            this.disableControls();
        }

        public playNext(): void {
            this.pause();
            var position: PulseChartAnimationPosition = this.getPosition();

            if (this.chart.isAnimationSeriesLast(position)) {
                this.setDefaultValues();
                this.chart.clearSelection();
            } else {
                this.setPosition({
                    series: position.series + 1,
                    index: PulseAnimator.animationMinIndex,
                });
                this.play();
            }
        }

        public pause(): void {
            if (this.animatorState === PulseAnimatorStates.Play) {
                this.animatorState = PulseAnimatorStates.Paused;
                this.chart.pauseAnimation();
            }
            this.disableControls();
        }

        private reset(): void {
            this.chart.stopAnimation();
            this.chart.clearSelection();
            this.chart.clearChart();

            this.setDefaultValues();
            this.animatorState = PulseAnimatorStates.Stopped;

            this.disableControls();
        }

        private next(): void {
            if (!this.isAnimated()) {
                return;
            }

            this.stop();
            var newIndex: PulseChartAnimationPosition = this.chart.findNextPoint(this.getPosition());
            if (newIndex) {
                this.setPosition(newIndex);
                this.chart.renderChart();
            } else {
                this.toEnd();
            }
        }

        private prev(): void {
            if (!this.isAnimated()) {
                return;
            }

            this.stop();
            var newIndex: PulseChartAnimationPosition = this.chart.findPrevPoint(this.getPosition());
            if (newIndex) {
                this.setPosition(newIndex);
                this.chart.renderChart();
            } else {
                this.reset();
            }
        }

        private toEnd(): void {
            this.chart.stopAnimation();
            this.chart.clearSelection();
            this.chart.clearChart();

            this.setDefaultValues();

            this.disableControls();

            this.chart.renderChart();

        }

        public stop(): void {
            if (!this.isAnimated()) {
                return;
            }

            this.chart.stopAnimation();
            this.animatorState = PulseAnimatorStates.Stopped;

            this.disableControls();
        }

        public setPosition(position: PulseChartAnimationPosition): void {
            this.position = position;
        }

        public getPosition(): PulseChartAnimationPosition {
            return this.position;
        }
    }

    export class PulseBehavior implements IInteractiveBehavior {
        private behaviors: IInteractiveBehavior[];

        constructor(behaviors: IInteractiveBehavior[]) {
            this.behaviors = behaviors;
        }

        public bindEvents(options: PulseBehaviorOptions, selectionHandler: ISelectionHandler): void {
            var behaviors = this.behaviors;
            for (var i: number = 0, ilen: number = behaviors.length; i < ilen; i++) {
                behaviors[i].bindEvents(options.layerOptions[i], selectionHandler);
            }

            options.clearCatcher.on('click', () => {
                selectionHandler.handleClearSelection();
            });
        }

        public renderSelection(hasSelection: boolean) {
            for (var i: number = 0; i < this.behaviors.length; i++) {
                this.behaviors[i].renderSelection(hasSelection);
            }
        }
    }

    export class PulseDataWrapper {
        private data: CartesianData;
        private isScalar: boolean;

        public constructor(columnChartData: CartesianData, isScalar: boolean) {
            this.data = columnChartData;
            this.isScalar = isScalar;
        }

        public lookupXValue(index: number, type: ValueType): any {
            debug.assertValue(this.data, 'this.data');

            var isDateTime: boolean = AxisHelper.isDateTime(type);
            if (isDateTime && this.isScalar) {
                return new Date(index);
            }

            var data = this.data;
            if (type.text) {
                debug.assert(index < data.categories.length, 'category index out of range');
                return data.categories[index];
            }
            else {
                var firstSeries = data.series[0];
                if (firstSeries) {
                    var seriesValues = firstSeries.data;
                    if (seriesValues) {
                        if (this.data.hasHighlights) {
                            index = index * 2;
                        }
                        var dataPoint = seriesValues[index];
                        if (dataPoint) {
                            if (isDateTime) {
                                return new Date(dataPoint.categoryValue);
                            }
                            return dataPoint.categoryValue;
                        }
                    }
                }
            }

            return index;
        }
    }
}
