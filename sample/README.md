# KLineChart Pro Sample Application

This sample application demonstrates how to use KLineChart Pro to create interactive financial charts with drawing tools and technical indicators.

## Features Demonstrated

- **Interactive Charts**: Candlestick charts with zoom, pan, and crosshair
- **Drawing Tools**: Technical analysis overlays (Fibonacci, Gann Box, Elliott Waves, etc.)
- **Technical Indicators**: Moving averages, RSI, MACD, volume, and more
- **Symbol Switching**: Change between different stocks
- **Time Period Selection**: Multiple timeframes (1m, 5m, 15m, 1H, 1D)
- **Theme Support**: Light and dark themes
- **Real-time Simulation**: Mock real-time data updates
- **Responsive Design**: Works on different screen sizes

## Running the Sample

### Prerequisites

1. Build the KLineChart Pro library:
   ```bash
   cd /path/to/klinechart/pro
   npm install
   npm run build
   ```

2. Open the sample in a web browser:
   ```bash
   cd sample
   npm install
   npm start
   # Opens at http://localhost:4000
   ```

   Or using Python:
   ```bash
   cd sample
   python -m http.server 4000
   # Opens at http://localhost:4000
   ```

### File Structure

```
sample/
├── index.html          # Main sample application
└── README.md          # This file
```

## How It Works

### Mock Datafeed

The sample includes a `MockDatafeed` class that simulates financial data without requiring external APIs:

- **Historical Data**: Generates 500 data points of mock OHLCV data
- **Symbol Search**: Returns predefined stock symbols
- **Real-time Updates**: Simulates live price updates every 5 seconds

### Chart Initialization

```javascript
const chart = new klinechartspro.KLineChartPro({
    container: document.getElementById('chart-container'),
    symbol: symbolInfo,
    period: { multiplier: 15, timespan: 'minute', text: '15m' },
    theme: 'light',
    datafeed: datafeed
});
```

### Interactive Features

- **Drawing Tools**: Click the drawing bar icons to add technical analysis overlays
- **Indicators**: Use the indicator button to add technical indicators
- **Settings**: Customize chart appearance through the settings modal
- **Screenshot**: Export chart images
- **Fullscreen**: Toggle fullscreen mode

## API Usage Examples

### Changing Symbols
```javascript
chart.setSymbol({
    ticker: 'AAPL',
    name: 'Apple Inc.',
    shortName: 'AAPL',
    exchange: 'NASDAQ'
});
```

### Changing Periods
```javascript
chart.setPeriod({
    multiplier: 1,
    timespan: 'hour',
    text: '1H'
});
```

### Changing Themes
```javascript
chart.setTheme('dark');
```

### Adding Indicators
```javascript
// Indicators are managed through the UI
// Programmatically, you would use the klinecharts API
chart.chart.createIndicator({
    name: 'RSI',
    paneId: 'candle_pane'
});
```

## Customization

The sample can be easily customized by:

1. **Modifying the MockDatafeed**: Add more symbols or change data generation logic
2. **Changing Default Settings**: Modify the chart initialization options
3. **Adding More Controls**: Extend the UI controls for additional features
4. **Styling**: Customize the CSS for different appearances

## Production Usage

For production applications:

1. Replace `MockDatafeed` with a real data provider (Polygon.io, Alpha Vantage, etc.)
2. Implement proper error handling and loading states
3. Add authentication for data APIs
4. Configure proper CORS settings
5. Optimize bundle size by tree-shaking unused features

## Browser Support

- Chrome 61+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

This sample is part of KLineChart Pro and is available under the Apache License V2.