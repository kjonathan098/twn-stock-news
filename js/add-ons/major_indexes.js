const majorIndexFetch = async () => {
    try {

        const response = await fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index')
        // console.log('response majorIndex paso?', response)

        data = await response.json()
        console.log('majorIndex data?', data)
        console.log(typeof (data))

    } catch (e) { console.log('major Index Fetch error', e) }
}
majorIndexFetch()


