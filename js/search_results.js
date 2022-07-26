class RenderResults {
    constructor(resultsDisplayBox) {
        this.resultsDisplayBox = resultsDisplayBox
        this.inputMainPage = document.getElementById("inputMainPage")

        this.renderResults = (results) => {
            // console.log(results)
            this.resultsDisplayBox.innerHTML = ``
            this.resultsDisplayBox.style.display = "none"

            const searchValue = this.inputMainPage.value

            for (let companyInfo of results) {

                // Extracting company info
                const companySymbol = companyInfo.symbol
                const companyImage = companyInfo.profile.image
                const companyName = companyInfo.profile.companyName
                const companyPrice = companyInfo.profile.price
                const companyPercentage = companyInfo.profile.changesPercentage

                // console.log(`working?`, companySymbol, companyPercentage, companyPrice, companyName, companyImage)

                // Putting Info in the Dom

                this.resultsDiv = document.createElement(`div`)
                this.resultsDiv.id = `resultsDiv`

                this.liElement = document.createElement(`li`)
                this.liElement.className = `resultsLi bg-transparent`

                this.image = document.createElement(`img`)
                this.image.id = `companyPhotoDisplay`
                this.image.src = companyImage

                this.spanCompSymbol = document.createElement(`span`)
                this.spanCompSymbol.className = `bg-transparent`
                this.spanCompSymbol.id = `spanCompSymbol`
                this.bElement = document.createElement(`b`)

                let symbolCoincidenceIndex = companySymbol.indexOf(searchValue.toUpperCase())
                if (symbolCoincidenceIndex === -1) {
                    this.bElement.innerHTML = companySymbol
                    console.log(`no symbol coinccidence`, companyName, companySymbol)
                } else {
                    const leftCompanySymbol = companySymbol.substring(0, symbolCoincidenceIndex)
                    const styledCompanySymbol = `<span class="highlight">${searchValue.toUpperCase()}</span>`
                    const rightCompanySymbol = companySymbol.substring(symbolCoincidenceIndex, symbolCoincidenceIndex + companySymbol.length - 1)
                    const indexOfAfterHighlightedText = symbolCoincidenceIndex + companySymbol.length
                    const rightside = companySymbol.substring(indexOfAfterHighlightedText, companySymbol.length)
                    this.bElement.innerHTML = leftCompanySymbol + styledCompanySymbol + rightside

                    console.log(`symbol`, rightside)
                }



                this.spanName = document.createElement(`span`)
                this.spanName.className = `bg-transparent`
                this.spanName.id = `spanName`

                // Caso inicio
                // Input user = "Ama"
                // companyName = "Amazon SA de CV"
                // this.spanName.innerHTML = 
                //      <span class='highlight'>Ama</span>zon SA de CV

                // Caso En medio
                // Input user = "zon"
                // companyName = "Amazon SA de CV"
                // this.spanName.innerHTML = 
                //      Ama<span class='highlight'>zon</span> SA de CV


                // Caso Final
                // Input user = "de CV"
                // companyName = "Amazon SA de CV"
                // this.spanName.innerHTML = 
                //      Amazon SA <span class='highlight'>de CV</span>


                const companyCoincidenceIndex = companyName.indexOf(searchValue)
                // si (companyCoincidenceIndex === -1) implica que no hay coincidencia
                if (companyCoincidenceIndex === -1) {
                    this.spanName.innerHTML = companyName
                } else {
                    const leftCompanyName = companyName.substring(0, companyCoincidenceIndex)
                    const styledCompanyName = `<span class="highlight">${searchValue}</span>`
                    const rightCompanyName = companyName.substring(companyCoincidenceIndex + searchValue.length, companyName.length - 1)
                    this.spanName.innerHTML = leftCompanyName + styledCompanyName + rightCompanyName
                    // this.spanName = "" + "<span class="highlight">Ama</span>" + "zon SA de CV"
                }


                this.spanPrice = document.createElement(`span`)
                this.spanPrice.className = `bg-transparent`
                this.spanPrice.id = `spanPrice`
                this.spanPrice.innerHTML = `<b>$${companyPrice}</b>`


                this.spanPercentageChange = document.createElement(`span`)
                this.spanPercentageChange.id = `spanPercentageChange`
                if (companyPercentage < 0) {
                    this.spanPercentageChange.style.color = 'red'
                } else this.spanPercentageChange.style.color = 'green'

                this.spanPercentageChange.innerHTML = `<b>(${companyPercentage}%)</b>`

                this.aElement = document.createElement(`a`)
                this.aElement.target = `blank`
                this.aElement.href = `/company.html?symbol=${companySymbol}`

                this.aElement.appendChild(this.image)
                this.spanCompSymbol.appendChild(this.bElement)
                this.aElement.appendChild(this.spanCompSymbol)
                this.aElement.appendChild(this.spanName)
                this.aElement.appendChild(this.spanPrice)

                this.aElement.appendChild(this.spanPercentageChange)
                this.resultsDiv.appendChild(this.liElement)
                this.resultsDiv.appendChild(this.aElement)
                this.resultsDisplayBox.appendChild(this.resultsDiv)


            }
            this.resultsDisplayBox.style.display = `block`

        }
    }


    // async results() {


    //     for (let i = 0; i < 4; i++) {
    //         this.resultDiv = document.createElement('div')

    //         this.aElement = document.createElement('a')
    //         this.aElement.target = 'blank'

    //         this.resultDiv = document.createElement('div')
    //         this.resultDiv.id = 'resultsDiv'

    //         this.li = document.createElement('li')
    //         this.li.className = `resultsLi bg-transparent`

    //         this.li.appendChild(this.aElement)
    //         this.resultDiv.appendChild(this.li)
    //         this.resultsDisplayBox.appendChild(this.resultDiv)

    //         this.resultDiv.id = 'resultsDiv'
    //         console.log(`results?`)
    //         this.aElement.href += `https://www.youtube.com/watch?v=PFmuCDHHpwk&t=658s`
    //         this.aElement.innerText += `hello`
    //     }
    // }

}

