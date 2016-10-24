let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS;
    formatQuery = dataAdapter.formatQuery;

let Planet = DS.defineResource({
    name: 'planet',
    endpoint: 'planets',
    filepath: __dirname + '/../data/planets.db',
    relations: {
        belongsTo: {
            star: {
                localField: 'star',
                localKey: 'starId',
                parent: true
            },
            galaxy:{
                localField:'galaxy',
                localKey:'galaxyId',
            }
        }
    }
})

function create(planet, cb){

    DS.find('star', planet.starId).then(function(star){
        Planet.create({
            id: uuid.v4(), 
            name: planet.name, 
            galaxyId: star.galaxyId, 
            starId: planet.starId})
            .then(cb).catch(cb)
    }).catch(cb)

}

function getAll(query, cb){
    Planet.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb){
    Planet.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById
}
