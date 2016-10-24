let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS;
    formatQuery = dataAdapter.formatQuery;

let Moon = DS.defineResource({
    name: 'moon',
    endpoint: 'moons',
    filepath: __dirname + '/../data/moons.db',
    relations: {
        belongsTo: {
            planet: {
                localField: 'planet',
                localKey: 'planetId',
                parent: true
            },
            star: {
                localField: 'star',
                localKey: 'starId',
            },
            galaxy:{
                localField:'galaxy',
                localKey:'galaxyId'
            }
        }
    }
})

function create(moon, cb){

    DS.find('planet', moon.planetId).then(function(planet){
        Moon.create({
            id: uuid.v4(), 
            name: moon.name, 
            galaxyId: planet.galaxyId, 
            starId: planet.starId,
            planetId: moon.planetId})
            .then(cb).catch(cb)
    }).catch(cb)
}

function getAll(query, cb){
    Moon.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb){
    Moon.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById
}
