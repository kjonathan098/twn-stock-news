urlParams = new URLSearchParams(window.location.search);
const companySymbol = (urlParams.get('symbol'));
let loader = document.getElementById("loaderCompany")
loader.style.display = "block"



// Fetching company Profile Info

const fetchComProfile = async () => {
    try {
        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`)
        // console.log(companySymbol)


        if (!response.ok) {
            const errorMessage = document.getElementById('errorMessage')
            errorMessage.innerHTML = "Company not found"
        }
        let data = await response.json()
        // console.log('esta es la data', data)

        // company Name

        let compName = data.profile.companyName
        console.log('nombre co  mp', compName)
        document.getElementById('companyTittle').innerHTML = `<h1 class="tittleh1">${compName}</h1>`

        // company Link
        let compLink = data.profile.website
        // console.log('complink:', compLink)


        // Description

        let compDescription = data.profile.description
        document.getElementById('masterInfo').innerHTML = `<div id="companyDescriptionHTML">${compDescription}'<br><br><a href="${compLink}" target=' '>${compName}</a></div>`

        // console.log('compdescr', compDescription)

        //image
        let compImage = data.profile.image
        document.getElementById('logo').innerHTML = `<img id="companyImage" src="${compImage}" alt=""></img>`


        // comp stock price
        let compStockPrice = data.profile.price
        compStockPrice = `Stock Price: $${compStockPrice}`
        document.getElementById('masterCompanyPrice').innerHTML = `<div id="stockPriceDisplay">${compStockPrice}</div>`

        // price percentage changes
        let pricePercentageChange = data.profile.changesPercentage
        let pricePercentageChangetoNum = Number(pricePercentageChange)
        // console.log('numero porcentaje', typeof (pricePercentageChange))


        if (pricePercentageChangetoNum < '0') {

            pricePercentageDisplay = `(${pricePercentageChangetoNum}%)`
            document.getElementById('masterCompanyPrice').innerHTML += `<div id="stockPercentage">${pricePercentageDisplay}</div>`
            document.getElementById("stockPercentage").style.color = "red";

        } else {
            pricePercentageDisplay = `(${pricePercentageChangetoNum}%)`
            document.getElementById('masterCompanyPrice').innerHTML += `<div id="stockPercentage">${pricePercentageDisplay}</div>`
            document.getElementById("stockPercentage").style.color = "green";
        }





    } catch (e) { alert(e) }
}

fetchComProfile()

// Fetching Company stock history 

const fetchCompStockHistoryStockPrice = async () => {
    try {
        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`)
        console.log('fetching?')
        if (!response.ok) {
            // console.log('response Error')
        }

        let data = await response.json()
        console.log('esta es la data', data)
        // console.log('esta es la data 2', data.historical[0].close)

        let stockPriceDailyArray = []
        let stockPriceDateArray = []

        for (let i = 0; i <= 365; i++) {
            stockPriceDailyNumber = data.historical[i].close
            stockPriceDailyArray.push(stockPriceDailyNumber)

            stockPriceDateDaily = data.historical[i].date
            stockPriceDateArray.push(stockPriceDateDaily)




        }
        // console.log(`precio dia:`, stockPriceDailyArray)
        // console.log(`fecha dia:`, stockPriceDateArray)

        // creating graph

        const labels = stockPriceDateArray;

        const dataChart = {
            labels: labels,
            datasets: [{
                label: 'Stock Price Over Last Year',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stockPriceDailyArray
            }]
        };

        const config = {
            type: 'line',
            data: dataChart,
            options: {}
        };

        const myChart = new Chart(
            document.getElementById('myChart'),
            config

        );
        loader.style.display = "none"

    } catch (e) { console.log(e) }


}
fetchCompStockHistoryStockPrice()


// console.log('helper functions activated')

