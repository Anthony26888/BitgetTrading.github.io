const symbolCoin = 'BTCUSDT';
const nameCoin = 'bitcoin'
const intervalInSeconds = 10 ;


function showInfoCoin(){
    const infoCoin = document.getElementById("infoCoin")
    const apiUrl =`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`
    fetch(apiUrl)
    .then((response) => response.json())
    .then(data=> {
        infoCoin.innerHTML = ''
        const symbols = data.symbol
        const img = data.image
        const name = data.name
        console.log(data)
        infoCoin.innerHTML=`
            <img class="mt-3" src="https://assets.coingecko.com/coins/images/1/large/${nameCoin}.png" alt="" style="width: 30px; height:30px">
            <div class="d-flex flex-sm-column p-1">
                <h6 class="text-light text-uppercase">${symbols}/USDT</h6>
                <small class="text-capitalize"><i class="fa fa-info-circle" aria-hidden="true"></i>${name}</small>
            </div>     
        `
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
showInfoCoin()

function showPriceCoin(){
    const priceInfo = document.getElementById("price")
    const priceInfoSmall = document.getElementById("priceSmall")
    const percentChange = document.getElementById("24hChange")
    const highPrice = document.getElementById("24hHigh")
    const lowPrice = document.getElementById("24hLow")
    const volPrice = document.getElementById("24hVol")
    const turnOver = document.getElementById("24hTurnOver")
    const apiUrl =`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbolCoin}`
    fetch(apiUrl)
    .then((response) => response.json())
    .then(data=> {   
            const price = data.lastPrice;            
            const percent = data.priceChangePercent;            
            const high24h = data.highPrice;
            const low24h = data.lowPrice;
            const volume = data.volume;
            const totalVol = data.quoteVolume
            priceInfo.textContent = Number(price).toLocaleString()
            priceInfoSmall.textContent = "≈ $ " + Number(price).toLocaleString()
            percentChange.textContent = percent + "%"
            if (percent >0){
                percentChange.style.color="rgb(29 162 180)"
            }else{
                percentChange.style.color="rgb(241 73 63)"
            }
            highPrice.textContent = Number(high24h).toLocaleString()
            lowPrice.textContent = Number(low24h).toLocaleString()
            volPrice.textContent = Number(volume).toLocaleString()
            turnOver.textContent = Number(totalVol).toLocaleString()
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
showPriceCoin()
setInterval(showPriceCoin, 5000)





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
                priceSell.style.color = 'rgb(241 73 63)';
                
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
showBidAskList();
setInterval(showBidAskList, 5000);

function showMarketTrade(){
    const marketTrade = document.getElementById("market-trade")
    const apiUrlMarket = `https://api.binance.com/api/v3/trades?symbol=${symbolCoin}&limit=22`

    fetch(apiUrlMarket)
    .then((response) => response.json())
    .then((data) => {
        marketTrade.innerHTML = '';
        data.forEach(value =>{
            const row = marketTrade.insertRow()
            const timeOrder = row.insertCell(0)
            const price = row.insertCell(1)
            const quantity = row.insertCell(2)
            const time = new Date(value.time)
            const hours = time.getHours()
            const minimutes = time.getMinutes()
            const seconds = time.getSeconds()
            const buyOrSell = value.isBuyerMaker;
            timeOrder.textContent = hours + ":" + minimutes + ":" + seconds 
            price.textContent = Number(value.price).toLocaleString()
            quantity.textContent = Number(value.qty).toFixed(5)
            if (buyOrSell != true){
                price.style.color = 'rgb(241 73 63)'
            }else{
                price.style.color = 'rgb(29 162 180)'
            }
            
        })
      
        
    })
}
showMarketTrade();
setInterval(showMarketTrade, 5000)



