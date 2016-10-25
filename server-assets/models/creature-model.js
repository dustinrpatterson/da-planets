// SAVE ME FOR LAST I GET CRAZY FAST
let dataAdapter = require('./data-adapter'),
    uuid = dataAdapter.uuid,
    schemator = dataAdapter.schemator,
    DS = dataAdapter.DS;
    formatQuery = dataAdapter.formatQuery;

let Creature = DS.defineResource({
    name: 'creature',
    endpoint: 'creatures',
    filepath: __dirname + '/../data/creatures.db',
    relations: {
        hasMany: {
            galaxy:[{
                localField: "galaxies",
                localKeys: "galaxyIds"
            },{
                localField:"knownGalaxies",
                localKeys:"creatureIds"
            }]
        }
    }
})



function create(creature, cb){

    let creatureObj = {
        id: uuid.v4(),
        name: creature.name,
        galaxyIds: {}
    }

    Creature.create(creatureObj).then(cb).catch(cb)
}

function inhabitGalaxy(creatureId, locationId, cb){
    DS.find('galaxy', galaxyId).then(function(galaxy){
        Creature.find(creatureId).then(function(creature){

            creature.galaxyIds[galaxyId] = galaxyId
            galaxy.creatureIds = galaxy.creatureIds || {}
            galaxy.creatureIds[creatureId] = creatureId

            Creature.update(creature.id, creature).then(function(){
                DS.update('galaxy', galaxy.id, galaxy).then(cb).catch(cb)
            }).catch(cb)

        }).catch(cb)
    }).catch(cb)
}


function getAll(query, cb){
    Creature.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb){
    Creature.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  inhabitGalaxy,
  getById
}