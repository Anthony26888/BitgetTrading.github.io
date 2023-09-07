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
                <td style="color:rgb(241 73 63)">${Number(priceOrder).toFixed(2)}</td>
                <td>${Number(amountOrder).toFixed(6)}</td>
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
                <td style="color:rgb(29 162 180)">${Number(priceOrder).toFixed(2)}</td>
                <td>${Number(amountOrder).toFixed(6)}</td>
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

function showBidAskList(){
    const bidList = document.getElementById("bid-list")
    const askList = document.getElementById("ask-list")
    const binanceApiUrl = 'https://api.binance.com/api/v3/depth';

    const limit = 22;

    // Construct the URL with query parameters
    const apiUrl = `${binanceApiUrl}?symbol=${symbolCoin}&limit=${limit}`;
   
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
                <td style="color:rgb(241 73 63)">${Number(priceOrder).toFixed(2)}</td>
                <td>${Number(amountOrder).toFixed(6)}</td>
                <td>${total.toFixed(4)}</td>
            `
            bidList.appendChild(newTr)
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // ask
    fetch(apiUrl)
    .then((response) => response.json())
    .then(data=> {
        const bids = data.asks
        bids.forEach(value => {
            const priceOrder = value[0]
            const amountOrder = value[1]
            const total = priceOrder*amountOrder;
            newTr = document.createElement("tr")
            newTr.innerHTML=`
                <td style="color:rgb(29 162 180)">${Number(priceOrder).toFixed(2)}</td>
                <td>${Number(amountOrder).toFixed(6)}</td>
                <td>${total.toFixed(4)}</td>
            `
            askList.appendChild(newTr)
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
showBidAskList()