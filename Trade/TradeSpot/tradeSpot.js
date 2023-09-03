function showChart(){
    const symbol = "BINANCE:BTCUSDT";
    const interval = "1D"; // Daily interval
    const theme = "dark";
        // Function to create and configure the TradingView chart
        
        new TradingView.widget(
            {
            "width": 1069,
            "height": 610,
            "symbol": symbol,
            "interval": interval,
            "timezone": "Etc/UTC",
            "theme": theme,
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_17f8f"
            }
        );
}
showChart();