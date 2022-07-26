const stockNews = async () => {
    try {
        const response = await fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock_news?limit=10')
        // console.log('response si paso', response)

        const data = await response.json()
        console.log(`data`, data)

        const topThreeNewsArray = []
        for (let i = 0; i < 3; i++) {

            const newsTittle = data[i].title
            const newsText = data[i].text
            const newsPic = data[i].image
            const newsUrl = data[i].url

            const topThreeNewsObj = {}

            topThreeNewsObj.newsTittle = newsTittle
            topThreeNewsObj.newsText = newsText
            topThreeNewsObj.newsPic = newsPic
            topThreeNewsObj.newsUrl = newsUrl


            // console.log(`object ${i}`, topThreeNewsObj)

            topThreeNewsArray.push(topThreeNewsObj)
            // console.log('array', topThreeNewsArray)


        }

        const mainNews = topThreeNewsArray[0]
        const sideNews1 = topThreeNewsArray[1]
        const sideNews2 = topThreeNewsArray[2]


        // console.log(mainNews.newsTittle)

        document.getElementById('newsTittleContainer').innerHTML = `
        <div class="row">

            <div class="col col-mine">
                <div class="card">
                    <img src="${mainNews.newsPic}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${mainNews.newsTittle}</h5>
                        <p class="card-text">${mainNews.newsText}</p>
                        <a href="${mainNews.newsUrl} " target="blank">
                            <button type="button" class="btn .btn-lg btn-outline-primary">Visit Article</button>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col col-mine">
                <!-- side new 1 begins  -->
                <div class="col col-12 mb-1 d-flex h-50  w-100 justify-content-center col-min-side">
                    <div class="card col-12 w-100 h-100 md-12" style="max-width: 540px;">
                        <div class="row  mb-3 w-100 h-100 g-0">
                            <div class="col  d-flex align-items-center">
                                <img src="${sideNews1.newsPic}" class="img-fluid rounded-start"
                                    alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body h-100 d-flex flex-column justify-content-between">
                                    <h5 class="card-title">${sideNews1.newsTittle}</h5>
                                    <p class="card-text display: inline-block   text-truncate">${sideNews1.newsText}</p>                                        <a href="${sideNews1.newsUrl} " target="blank">
                                        <button type="button" class="btn .btn-lg btn-outline-primary">Visit Article</button>
                                    </a>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- side new 1 ends  -->

                <!-- side new 2 begins  -->
                <div class="col d-flex justify-content-center h-50  w-100 col-min-side">
                    <div class="card mb-3 h-100" style="max-width: 540px;">
                        <div class="row h-100 g-0">
                            <div class="col-md-4 d-flex align-items-center">
                                <img src="${sideNews2.newsPic}" class="img-fluid rounded-start"
                                    alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body h-100 d-flex flex-column justify-content-between">
                                    <h5 class="card-title">${sideNews2.newsTittle}</h5>
                                    <p class="card-text display: inline-block   text-truncate">${sideNews2.newsText}</p>
                                        <a href="${sideNews2.newsUrl} " target="blank">
                                             <button type="button" class="btn .btn-lg btn-outline-primary">Visit Article</button>
                                        </a>                                     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- side new 2 ends  -->

            </div>
        </div> `

    } catch (e) { 'error', console.log(e) }

}
stockNews()

setInterval(() => {
    stockNews()

}, 60 * 3000);
