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
                localKey:'galaxyId'
            }
        },
        hasMany: {
            moon:{
                localField: "moons",
                localKey: "planetId"
            }
        }
    }
})

schemator.defineSchema("planet",{
    id: {
        type: 'string',
        nullable: false
    },
    name: {
        type: "string",
        nullable: false
    },
    starId: {
        type: 'string',
        nullable: false
    },
    galaxyId: {
        type: "string",
        nullable: false
    }
})

function create(planet, cb){

    DS.find('star', planet.starId).then(function(star){
    let planetObj = {
            id: uuid.v4(), 
            name: planet.name, 
            galaxyId: star.galaxyId, 
            starId: planet.starId
    }

    let error = schemator.validateSync("planet", planetObj);
    if(error){
        error.stack  = true
        return cb(error)
    }
    
    Planet.create(planetObj)
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
