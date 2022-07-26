async function companyExtraInfoFunc(companySymbolExract) {
    let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${companySymbolExract}`)
    // console.log(companySymbolExract)
    let data = await response.json()
    // console.log('esta es la data', data)
    // console.log('hola')
    return data
}
