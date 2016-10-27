function UniverseService(){

this.getApiGalaxyData = function loadGalaxyData(cb){

var apiUrl = "http://dpgalaxy.herokuapp.com/api/"; 
var galaxyApi = "galaxies";
var starApi = "stars";
var planetApi = "planets";
var moonApi = "moons";
var creatureApi = "creatures";
var testApi = 'http://localhost:1582/api/galaxies/?include=stars,planets,moons'

$.getJSON(apiUrl+galaxyApi, function(data){
    galaxyData = data.body;
    console.log('galaxy data is here')
    cb(data)
})

}


}