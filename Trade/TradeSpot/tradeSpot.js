const symbolCoin = 'BTCUSDT';
const intervalInSeconds = 10 ;


function showPriceCoin(){
    const priceCoin = document.getElementById("infoCoin")
    const infoCoin = document.getElementById("infoCoin2")
    priceCoin.innerHTML="";
    const apiUrl =`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&page=1&sparkline=false&price_change_percentage=24h&locale=en&precision=2`
    fetch(apiUrl)
    .then((response) => response.json())
    .then(data=> {
        data.forEach(value =>{
            const symbol = value.symbol;
            const name = value.name;
            const price = value.current_price;
            const image = value.image;
            const percent = value.price_change_percentage_24h;
            const high24h = value.high_24h;
            const low24h = value.low_24h;
            const volume = value.total_volume;
            const turnover = value.market_cap_change_24h;
            const coinSymbol = 'BTC';
            const coinImageUrl = `https://www.binance.com/images/coins/images/${coinSymbol.toLowerCase()}.png`;
            infoCoin.innerHTML=`
                <img class="mt-3" src="${image}" alt="" style="width: 30px; height:30px">
                <div class="d-flex flex-sm-column p-1">
                    <h5 class="text-light text-uppercase">${symbol}/USDT</h5>
                    <small class="text-capitalize"><i class="fa fa-info-circle" aria-hidden="true"></i>${name}</small>
                </div>
            `
            const newDiv = document.createElement("div")
            newDiv.classList.add("d-flex")
            newDiv.innerHTML=`
                <div class="p-2 d-flex flex-column justify-content-center">
                    <h5 class="text-danger">${price.toLocaleString()}</h5>
                    <span class="text-light" style="font-size: 12px;">≈ $ ${price.toLocaleString()}</span>
                </div>
                <div class="p-2 d-flex flex-column justify-content-center">
                    <small>24h change</small>
                    <small style="color:rgb(29 162 180)">${percent}</small>
                </div>
                <div class="p-2 d-flex flex-column justify-content-center">
                    <small>24h high</small>
                    <small class="text-light">${high24h}</small>
                </div>
                <div class="p-2 d-flex flex-column justify-content-center">
                    <small>24h low</small>
                    <small class="text-light">${low24h}</small>
                </div>
                <div class="p-2 d-flex flex-column justify-content-center">
                    <small>24h Vol (BTC)</small>
                    <small class="text-light">${volume}</small>
                </div>
                <div class="p-2 d-flex flex-column justify-content-center">
                    <small>24h Turnover (USDT)</small>
                    <small class="text-light">${turnover}</small>
                </div>
            `
            priceCoin.appendChild(newDiv)
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
showPriceCoin()
setInterval(showPriceCoin, intervalInSeconds * 1000);

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








function showBidAskList(){
    const askList = document.getElementById("ask-list")
    const bidList = document.getElementById("bid-list")
    const askBook = document.getElementById("ask-book")
    const bidBook = document.getElementById("bid-book")
    const priceBook = document.getElementById("orderPrice")
    const priceBookSmall = document.getElementById("orderPriceSmall")
     // Depth (number of levels)
    const depth = 22; // You can adjust this as needed
    const depthMain = 10;
    // Replace with your own Binance API endpoint
    const apiUrl = `https://api.binance.com/api/v3/depth?symbol=${symbolCoin}&limit=${depth}`;
    const apiUrlMain = `https://api.binance.com/api/v3/depth?symbol=${symbolCoin}&limit=${depthMain}`;
    const apiUrlPrice = `https://api.binance.com/api/v3/ticker/price?symbol=${symbolCoin}`
    //
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Clear the existing rows
            askList.innerHTML = '';
            bidList.innerHTML = '';
            // Insert bid rows
            data.asks.forEach(ask => {
                const row = askList.insertRow();
                const priceBuy = row.insertCell(0);
                const quantityBuy = row.insertCell(1);
                const totalAsk = row.insertCell(2)
                priceBuy.textContent = Number(ask[0]).toLocaleString(2);
                quantityBuy.textContent = Number(ask[1]).toFixed(5);
                totalAsk.textContent = Number(ask[0] * ask[1]).toLocaleString(3);
                
                priceBuy.style.color = 'rgb(29 162 180)'; // Customize the style for asks.
            })


            data.bids.forEach(bid =>{
                const row = bidList.insertRow()
                const priceSell = row.insertCell(0);
                const quantitySell = row.insertCell(1);
                const totalBid = row.insertCell(2);
                priceSell.textContent = Number(bid[0]).toLocaleString(2);
                quantitySell.textContent = Number(bid[1]).toFixed(5)
                totalBid.textContent = Number(bid[0]*bid[1]).toLocaleString(2)
                priceSell.style.color = 'rgb(241 73 63)'
            })
        })
    
    .catch((error) => {
        console.error('Error fetching order book data:', error);
    });

    //Main
    fetch(apiUrlMain)
        .then((response) => response.json())
        .then((data) => {
            // Clear the existing rows
            askBook.innerHTML = '';
            bidBook.innerHTML = '';
            // Insert bid rows
            data.asks.forEach(ask => {
                const row = askBook.insertRow();
                const priceBuy = row.insertCell(0);
                const quantityBuy = row.insertCell(1);
                const totalAsk = row.insertCell(2)
                priceBuy.textContent = Number(ask[0]).toLocaleString(2);
                quantityBuy.textContent = Number(ask[1]).toFixed(5);
                totalAsk.textContent = Number(ask[0] * ask[1]).toLocaleString(3);
                
                priceBuy.style.color = 'rgb(29 162 180)'; // Customize the style for asks.
            })


            data.bids.forEach(bid =>{
                const row = bidBook.insertRow()
                const priceSell = row.insertCell(0);
                const quantitySell = row.insertCell(1);
                const totalBid = row.insertCell(2);
                priceSell.textContent = Number(bid[0]).toLocaleString(2);
                quantitySell.textContent = Number(bid[1]).toFixed(5)
                totalBid.textContent = Number(bid[0]*bid[1]).toLocaleString(2)
                priceSell.style.color = 'rgb(241 73 63)'
            })
        })
    
    .catch((error) => {
        console.error('Error fetching order book data:', error);
    });

    fetch(apiUrlPrice)
        .then((response) => response.json())
        .then((data) => {
            priceBook.innerHTML = '';
            priceBookSmall.innerHTML = '';
            priceBook.textContent = Number(data.price).toLocaleString(2);
            priceBookSmall.textContent = "≈ " + data.price;

        })
}

    // Fetch order book data initially and set up polling
showBidAskList();
setInterval(showBidAskList, 5000); // Refresh every 5 seconds (adjust as needed)



