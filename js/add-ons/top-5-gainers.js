const mostGainer = async () => {
    let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock_market/gainers`)
    // console.log(response)
    let data = await response.json()
    // console.log(data)

    for (let i = 0; i < 4; i++) {
        const compSymbol = data[i].symbol
        const compName = data[i].name
        const compPercentage = data[i].changesPercentage
        const compPrice = data[i].price
        // console.log(compSymbol)

        document.getElementById('gainers').innerHTML += `
    
    <div class="col border-right border-warning bg-white">
            <div class="row d-flex flex-column flex-nowrap" id="gainer-Box">
                <div class="upperRow ">
                    <div class="upperRow-Symbol fw-bold ">${compSymbol}</div>
                    <div class="upperRow-Name text-truncate text-secondary">${compName}</div>
                </div>
                <div class="lowerRow">
                    <div class="lowerRow-Price">$${compPrice}</div>
                    <div class="lowerRow-Percentage text-success"><img src="./images/up-arrow.png" alt="up-arrow"
                            id="upArrow" class="align-top ml-10"
                            style="width: 13px; height: 13px;"><span>${compPercentage}%</span>
                    </div>
                </div>
            </div>
    </div>`
        // console.log(compSymbol, compName, compPercentage, compPrice)
    }
}
mostGainer()
// console.log('hola')