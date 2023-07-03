fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((response) =>{
        for ( let i in response){

            var template_html = `
        <div class="country" onclick=detail(this.children[1].children[0].textContent) id="${i}" >
            <div class="country-img"><img src="${response[i]['flags']['png']}" alt=""></div>
            <div class="country-text">
                <p class='country-title'>${response[i]["name"]["common"]}</p>
                <p>Population : <span>${response[i]["population"]}</span></p>
                <p class="country-region">Region : <span>${response[i]["region"]}</span></p>
                <p>Capital : <span>${response[i]["capital"]}</span></p>
            </div>
        </div>
        `
         document.querySelector("main").innerHTML += template_html   
        }
    })

var country = document.querySelectorAll(".country")

var body_detail = document.querySelector(".detail")
function detail (name) {
    
    search_bar.value = ""
    name = name.toLowerCase()
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => response.json())
        .then((response) =>{ 
            console.log(response)
            console.log("country selected : ", response[0]["name"]["common"] )
            
        body_detail.style.display = "flex"
            var nativeName = response[0]['name']['nativeName']
            nativeName = Object. keys(nativeName)[0]
            nativeName = response[0]['name']['nativeName'][nativeName]['common']
            var population = response[0]['population']
            var region = response[0]['region']
            var subregion = response[0]['subregion']
            var capital = response[0]['capital'][0]
            var tld = response[0]['tld'][0]
            var currencies = response[0]['currencies']
            currencies = Object. keys(currencies)[0]
            currencies = response[0]['currencies'][currencies]["name"]
            var lang = response[0]["languages"]
            var lang = Object.values(lang).toString();
            document.querySelector(".detail-country img").src = response[0]['flags']['png']
            document.querySelector('.detail-country h1').textContent = response[0]["name"]["common"]
            document.querySelector('.infos p:nth-child(1) span').textContent = nativeName
            document.querySelector('.infos p:nth-child(2) span').textContent = population
            document.querySelector('.infos p:nth-child(3) span').textContent = region
            document.querySelector('.infos p:nth-child(4) span').textContent = subregion
            document.querySelector('.infos p:nth-child(5) span').textContent = capital
            document.querySelector('.infos p:nth-child(6) span').textContent = tld
            document.querySelector('.infos p:nth-child(7) span').textContent = currencies
            document.querySelector('.infos p:nth-child(8) span').textContent = lang
            var border = response[0]["borders"] 
            appborder(border)
        })
    var countries = document.querySelectorAll('.country')
    for(let i =0; i < countries.length ; i++ ){
        countries[i].style.display = "block"
    }
    document.querySelectorAll('.border-btn').forEach( el => el.classList.toggle('clear'))
}


function appborder(border){
    document.querySelector('.content').innerHTML = ""
    var long = border.length
    for( let i = 0; i< long; i++){
        fetch(`https://restcountries.com/v3.1/alpha/${border[i].toLowerCase()}`)
            .then((response)=> response.json())
            .then((response) => {
                var btn = document.createElement('button')
                btn.classList.add("border-btn")
                btn.textContent = response[0]["name"]["common"]
                btn.setAttribute('onclick', 'detail(this.textContent)' )
                console.log(document.querySelector('.content'))

                document.querySelector('.content').appendChild(btn)
            })
    }
}

function back () {
    body_detail.style.display = "none"
}
var darkmode_el = [document.querySelector("nav"), document.querySelector("body"),document.querySelector(".dark-btn"),document.querySelector(".detail"), document.querySelector('.detail-country'), document.querySelector(".search-bar"), document.querySelector('.search-bar :first-child'), document.querySelector('.input-search'), document.querySelector('.dropdown'), document.querySelector('.dropdown-button'), document.querySelector('.dropdown-content'), document.querySelector('.back')]
function darkmode () {
    darkmode_el.forEach( element => element.classList.toggle('clear') )
    document.querySelectorAll(".country").forEach( element => element.classList.toggle("clear") )
    document.querySelectorAll(".country *").forEach( element => element.classList.toggle("clear") )
    document.querySelectorAll('.dropdown-content-button').forEach( element => element.classList.toggle('clear'))
    document.querySelectorAll('.border-btn').forEach( el => el.classList.toggle('clear'))
    document.querySelector(".dark-btn img").classList.toggle("clear-btn")
    
}

var search_bar = document.querySelector('.search-bar input')

search_bar.addEventListener('keyup', ()=>{
    var countries = document.querySelectorAll('.country')
    var country_name = document.querySelectorAll('.country-title')
    var value = search_bar.value
    for(let i = 0; i < country_name.length ; i++ ){
        var x = country_name[i].textContent.toLowerCase()
        if ( x.startsWith(value) === false ){
            countries[i].style.display = "none"
        } else{
            countries[i].style.display = "block"
        }
    }
})


document.querySelector('#filter').addEventListener('click', ()=>{
    document.querySelector('.dropdown-content').classList.toggle('visible')
    document.querySelector('.dropdown>button :last-child').classList.toggle('rotate')
})

function filter(region){
    console.log(region)
    var countries = document.querySelectorAll('.country')
    var country_region = document.querySelectorAll('.country-region span')
    console.log(country_region)
    for(let i = 0; i < country_region.length ; i++ ){
        var x = country_region[i].textContent.toLowerCase()
        if( x != region){
            countries[i].style.display = "none"
        }else{
            countries[i].style.display= "block"
        }
    }
}

document.querySelector("nav h1").addEventListener("click", () =>{
    body_detail.style.display = "none"
    document.querySelectorAll('.country').forEach( el => el.style.display = "block")
})