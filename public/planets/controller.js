function UniverseController(){

    var universeService = new UniverseService()

    function updateGalaxy(arr){
        console.log(arr)
        var galaxyElem = $('#galaxy')
        var galaxyTemplate =""
        for (var i = 0; i < arr.length; i++) {
            var singleGalaxy = arr[i];

            if (singleGalaxy.stars){
              galaxyTemplate += `
            <div class="card">
                <h1>${"Galaxy Name: " + singleGalaxy.name}</h1>
                <h3>${"Galaxy id " + singleGalaxy.id}</h3>
                <h4>${singleGalaxy.stars[0].name}</h4>
            </div>
            `
            }
            else{
            galaxyTemplate += `
            <div class="card">
                <h1>${"Galaxy Name: " + singleGalaxy.name}</h1>
                <h3>${"Galaxy id " + singleGalaxy.id}</h3>
            </div>
            `
            }
        }
        galaxyElem.empty().append(galaxyTemplate);
    }


    
    universeService.getApiGalaxyData(updateGalaxy)
}

UniverseController()