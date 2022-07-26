
async function fetchCompanies(userInput) {
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`)
    const data = await response.json()
    // console.log(data)
    let companiesFullData = []
    for (let companySymbol of data) {
        let companySymbolExract = companySymbol.symbol
        const companyResultsInfo = await companyExtraInfoFunc(companySymbolExract)
        // console.log(`companyResultsInfo`, companyResultsInfo)
        companiesFullData.push(companyResultsInfo)

    }
    return companiesFullData
}


class SearchForm {
    constructor(inputMasterBox) {
        this.inputMasterBox = inputMasterBox

        this.form = document.createElement('form')
        this.form.id = 'formSearchBar'

        this.inputText = document.createElement('input')
        this.inputText.id = `inputMainPage`
        this.inputText.type = `text`
        this.inputText.placeholder = `Search`

        this.inputButton = document.createElement('input')
        this.inputButton.type = `submit`
        this.inputButton.value = `search`
        this.inputButton.id = `searchBtn`

        this.loader = document.createElement('div')
        this.loader.className = `spinner-grow`
        this.loader.id = `loader`
        this.loader.role = `status`

        this.form.appendChild(this.loader)
        this.form.appendChild(this.inputText)
        this.form.appendChild(this.inputButton)

        this.inputMasterBox.appendChild(this.form)

        const onSubmitEvent = (event) => {
            event.preventDefault()
            this.doSearch()
        }
        // will execute when submit
        this.form.addEventListener(`submit`, onSubmitEvent)

    }

    // setCallback receive a function to be called after doSearch.
    // Params:
    //   callback: [function] to be called when a search is executed after retrieve companies info.
    setCallback(callback) {
        this.onSearchCallback = callback;
    }

    async doSearch() {
        this.loader.style.display = "block"
        const userInput = this.inputText.value
        const fetchedCompaniesArray = await fetchCompanies(userInput)
        // console.log(fetchedCompaniesArray)
        // Fetch companies finished, so we execute the given callback.
        this.onSearchCallback(fetchedCompaniesArray)
        this.loader.style.display = "none"
    }



}

// console.log('hola sasdf')


