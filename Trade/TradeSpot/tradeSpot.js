function showChart(){
    const symbol = "BITGET:BTCUSDT";
    const interval = "D"; // Daily interval
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
            "container_id": "tradingview_chart"
            }
        );
}
showChart();


function showOderBook(){
    const orderBook = document.getElementById("order-book")
    orderBook.innerHTML="";
    // Binance API endpoint for order book data
    const binanceApiUrl = 'https://api.binance.com/api/v3/depth';

    // Define the trading pair you want to retrieve order book data for
    const symbol = 'BTCUSDT'; // Example: BTC to USDT

    // Define the number of levels you want to retrieve (e.g., 5 for top 5 bids and asks)
    const limit = 10;

    // Construct the URL with query parameters
    const apiUrl = `${binanceApiUrl}?symbol=${symbol}&limit=${limit}`;

    // Fetch order book data
    fetch(apiUrl)
    .then((response) => response.json())
    .then(data=> {
        const bids = data.bids
        bids.forEach(value => {
            const priceOrder = value[0]
            const amountOrder = value[1]
            const total = priceOrder*amountOrder;
            console.log(priceOrder)
            newTr = document.createElement("tr")
            newTr.innerHTML=`
                <td style="color:rgb(241 73 63)">${priceOrder}</td>
                <td>${amountOrder}</td>
                <td>${total.toFixed(4)}</td>
            `
            orderBook.appendChild(newTr)
        });
        
       

       
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
showOderBook()