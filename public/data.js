var StationsQty  = document.getElementById('StationsQty')
var AvailableStationsQty = document.getElementById('AvailableStationsQty')
var UnavailableStationsQty = document.getElementById('UnavailableStationsQty')
var SearchBtn = document.getElementById('SearchBtn')
var SearchResult = document.getElementById('SearchResult')
var MapResult = document.getElementById('MapResult')
var IDFinderInput = document.getElementById('IDFinderInput')

var Stations, StationInfo

//const StationStatusURL = "https://apitransporte.buenosaires.gob.ar/ecobici/gbfs/stationStatus?client_id=acaba42ea0ae4223856533a37848e261&client_secret=B93D8Dc280a249649608b3Ac0fE8366e"
            
$.getJSON('./stationStatus.json', (data) => {
    Stations = data.data.stations
    var AvailableStations = 0
    var UnavailableStations = 0
    StationsQty.innerText = `Hay ` + Stations.length + ` estaciones`

    Stations.forEach(station => {
        if(station.num_bikes_available > 0){
            AvailableStations++
        }
        else{
            UnavailableStations++;
        }
    })

    AvailableStationsQty.innerText = AvailableStations + ` disponibles`
    UnavailableStationsQty.innerText = UnavailableStations + ` no disponibles`
})

$.getJSON('./stationInformation.json', (data) => {
    StationInfo = data.data.stations
})

var FindByStationID = (() => {
    var TargetStation, TargetStationInfo

    MapResult.innerHTML = `<div class="lds-dual-ring"></div>`

    Stations.forEach((station) => {
        if(station.station_id === IDFinderInput.value)
        {
            TargetStation = station
        }
    })

    StationInfo.forEach((station) => {
        if(station.station_id === IDFinderInput.value)
        {
            TargetStationInfo = station
        }
    })

    if(TargetStation != undefined){
        SearchResult.innerHTML = 
        TargetStationInfo.name + `<br>` +
        `<div class="columns is-gapless">
            <div class="buttons has-addons is-left">
                <a class="button is-left is-rounded" type="text" style="width: 95px" ><b>` + TargetStationInfo.capacity + `</b></a>
                <a class="button is-left is-success is-rounded" type="text" style="width: 95px" ><b>` + TargetStation.num_bikes_available + `</b></a>
                <a class="button is-left is-danger is-rounded" type="text" style="width: 95px" ><b>` + TargetStation.num_docks_disabled + `</b></a>
            </div>
        `
        //console.table(TargetStation)

        MapResult.innerHTML =
        `<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ` + 
        `src="https://www.openstreetmap.org/export/embed.html?bbox=` + TargetStationInfo.lon + `%2C` + TargetStationInfo.lat + `%2C` + TargetStationInfo.lon + `%2C` + TargetStationInfo.lat + `&amp;layer=mapnik&amp;marker=` + TargetStationInfo.lat + `%2C` + TargetStationInfo.lon + `" style="border: 1px solid black"></iframe><br/><small></small>`
    }
    else{
        SearchResult.innerHTML = 
        `No existe la estación con el ID ` + IDFinderInput.value
    }
    
}) 

SearchBtn.addEventListener('click', FindByStationID)