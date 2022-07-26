const inputMainPage = document.getElementById('inputMainPage')
let loader = document.getElementById('loader')
let resultsDisplayBox = document.getElementById('resultsDisplayBox')
const formSearchBar = document.getElementById('formSearchBar')

async function companyExtraInfoFunc(companySymbol) {
	let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbol}`)
	console.log(companySymbol)
	let data = await response.json()
	// console.log('esta es la data', data)
	// console.log('hola')
	return data
}

formSearchBar.addEventListener('submit', (event) => {
	event.preventDefault()
	resultsDisplayBox.style.display = 'none'
	resultsDisplayBox.innerHTML = ''
	let userInput = inputMainPage.value

	const fetchCompanies = async () => {
		try {
			loader.style.display = 'block'
			let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput}&limit=10&exchange=NASDAQ`)

			// console.log('fetch si paso',)

			if (!response.ok) {
				const errorMessage = document.getElementById('errorMessage')
				errorMessage.innerHTML = 'Company not found'
			}

			let data = await response.json()
			// console.log('esta es la data 123', data)

			for (let companyInfo of data) {
				const companyName = companyInfo.name
				const companySymbol = companyInfo.symbol

				const companyExtraInfo = await companyExtraInfoFunc(companySymbol)
				console.log('company ExtraInfo', companyExtraInfo)

				const companyPrice = companyExtraInfo.profile.price
				const companyPhoto = companyExtraInfo.profile.image
				const priceChanges = companyExtraInfo.profile.changes

				// const priceChangesSpan = document.createElement("p")
				// priceChangesSpan.setAttribute("id", "priceChangesSpan");
				// priceChangesSpan.innerHTML = priceChanges
				console.log(priceChanges)
				const searchResultList = `${companyName} (${companySymbol})`
				// console.log('aqui llego ', searchResultList)

				if (priceChanges < 0) {
					resultsDisplayBox.innerHTML += `<a target="blank" href="/company.html?symbol=${companySymbol}">
                    <div id="resultsDiv">
                        <li'class="resultsLi bg-transparent"><img id="companyPhotoDisplay" src="${companyPhoto}" alt=""><span class="bg-transparent"><b>${companySymbol}</b></span>
                        <span class="bg-transparent">${companyName} $${companyPrice} <span style="color:red">(${priceChanges}%)</span></span></li>
                    </div>`
				} else
					resultsDisplayBox.innerHTML += `<a target="blank" href="/company.html?symbol=${companySymbol}">
                    <div id="resultsDiv">
                        <li'class="resultsLi bg-transparent"><img id="companyPhotoDisplay" src="${companyPhoto}" alt="">
                            <span class="bg-transparent"><b>${companySymbol}</b></span>
                            <span class="bg-transparent">${companyName} $${companyPrice} 
                                <span style="color:green">(${priceChanges}%)</span>
                            </span>
                        </li>
                    </div>`
			}
			resultsDisplayBox.style.display = 'flex'
			loader.style.display = 'none'
		} catch (e) {
			console.log(e.message)
		}
	}
	fetchCompanies()
})
