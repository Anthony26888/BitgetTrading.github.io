const symbolCoin = 'BTCUSDT';

function showChart(){
    const symbol = `BITGET:${symbolCoin}`
    const interval = "D"; // Daily interval
    const theme = "dark";
        // Function to create and configure the TradingView chart
        
        new TradingView.widget(
            {
                "width": "100%",
                "height":650,
                "fullscreen":true,
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
    const bidBook = document.getElementById("bid-book")
    const askBook = document.getElementById("ask-book")
    const orderPrice = document.getElementById("orderPrice")
    bidBook.innerHTML="";
    askBook.innerHTML="";
    // Binance API endpoint for order book data
    const binanceApiUrl = 'https://api.binance.com/api/v3/depth';

    // Define the trading pair you want to retrieve order book data for
     // Example: BTC to USDT

    // Define the number of levels you want to retrieve (e.g., 5 for top 5 bids and asks)
    const limit = 10;

    // Construct the URL with query parameters
    const apiUrl = `${binanceApiUrl}?symbol=${symbolCoin}&limit=${limit}`;

    const apiPrice = `https://api.binance.com/api/v3/ticker/price?symbol=${symbolCoin}`
    // bid
    fetch(apiUrl)
    .then((response) => response.json())
    .then(data=> {
        const bids = data.bids
        bids.forEach(value => {
            const priceOrder = value[0]
            const amountOrder = value[1]
            const total = priceOrder*amountOrder;
            newTr = document.createElement("tr")
            newTr.innerHTML=`
                <td style="color:rgb(241 73 63)">${priceOrder}</td>
                <td>${amountOrder}</td>
                <td>${total.toFixed(4)}</td>
            `
            bidBook.appendChild(newTr)
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });


    // ask 
    fetch(apiUrl)
    .then((response) => response.json())
    .then(data=> {
        const ask = data.asks
        ask.forEach(value => {
            const priceOrder = value[0]
            const amountOrder = value[1]
            const total = priceOrder*amountOrder;
            newTr = document.createElement("tr")
            newTr.innerHTML=`
                <td style="color:rgb(29 162 180)">${priceOrder}</td>
                <td>${amountOrder}</td>
                <td>${total.toFixed(4)}</td>
            `
            askBook.appendChild(newTr)
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    //price
    fetch(apiPrice)
    .then((response) => response.json())
    .then(data=> {
        const price = data.price
        orderPrice.innerHTML=Number(price).toFixed(2);
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}
showOderBook()