const marqueeDiv = document.getElementById('marquee')

class MarqueeMaker {
    constructor(marqueeDiv,) {
        this.marqueeDiv = marqueeDiv
        this.nasdaqFetchResults = []
    }

    async init() {
        await this.nasdaqFetch()
        await this.printMarquee()


    }

    async nasdaqFetch() {

        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/nasdaq_constituent?
    }`)
        // console.log(`this is the response`, response)


        if (!response.ok) {
            console.log(`response not ok:`, response.ok)
        }

        let data = await response.json()
        // console.log(data)

        for (let companyInfo of data) {
            const companySymbolForStock = companyInfo.symbol
            const companyCurrentPriceFetch = await companyFetchforPrice(companySymbolForStock)
            // console.log(`companyCurrentPriceFetch`, companyCurrentPriceFetch)
            this.nasdaqFetchResults.push(companyCurrentPriceFetch)
            // console.log(`nasdaq Array`, this.nasdaqFetchResults)




        }
        async function companyFetchforPrice(companySymbolForStock) {
            let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbolForStock}`)
            // console.log(companySymbolForStock)
            let data = await response.json()
            // console.log('hola esta es la data', data)
            return data
        }
    }

    async printMarquee() {
        // console.log(`hola`)
        this.marqueeUl = document.createElement('ul')
        this.marqueeUl.classList.add('marquee-content')
        this.marqueeDiv.appendChild(this.marqueeUl)

        for (let companyInfo of this.nasdaqFetchResults) {
            const comapnysymbol = companyInfo.symbol
            const companyCurrentPrice = companyInfo.profile.price
            this.marqueeUl.innerHTML += `<li><b>${comapnysymbol}<b><span>$${companyCurrentPrice}</span></li>`

        }

    }

}

// const marqueeDiv = document.getElementById('marquee')

// class MarqueeMaker {
//     constructor(marqueeDiv) {
//         this.marqueeDiv = marqueeDiv
//     }
//     nasdaqFetch = async () => {

//         const marqueeUl = document.createElement('ul')
//         marqueeUl.classList.add('marquee-content')
//         this.marqueeDiv.appendChild(marqueeUl)
//         // console.log(this.marqueeDiv)

//         let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/nasdaq_constituent?
//     }`)
//         // console.log('fetch paso', response)

//         if (!response.ok) {
//             console.log(`response not ok:`, response.ok)
//         }

//         let data = await response.json()
//         // console.log(`esta es la data`, data)

//         const companySymbolExtract = data

//         for (let companyInfo of companySymbolExtract) {
//             const companySymbolForStock = companyInfo.symbol
//             // console.log('aray indi?', companySymbolForStock)


//             const stockPriceUpdate = await companyStockPriceFetch(companySymbolForStock);
//             const stockPriceUpdate2 = stockPriceUpdate.profile.price
//             // console.log(`indi stock price? 123`, stockPriceUpdate2)

//             marqueeUl.innerHTML += `<li><b>${companySymbolForStock}<b><span>$${stockPriceUpdate2}</span></li>`

//             async function companyStockPriceFetch(companySymbolForStock) {
//                 let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbolForStock}`)
//                 // console.log(companySymbolForStock)
//                 let data = await response.json()
//                 // console.log('esta es la data', data)
//                 // console.log('hola')
//                 return data
//             }
//         }

//     }

// }

// const marqueMakerTop = new MarqueeMaker(marqueeDiv)
// marqueMakerTop.nasdaqFetch();