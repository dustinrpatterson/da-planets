let dataAdapter = require('./data-adapter'),
  uuid = dataAdapter.uuid,
  schemator = dataAdapter.schemator,
  DS = dataAdapter.DS;
formatQuery = dataAdapter.formatQuery;

let Star = DS.defineResource({
  name: 'star',
  endpoint: 'stars',
  filepath: __dirname + '/../data/stars.db',
  relations: {
    belongsTo: {
      galaxy: {
        localField: 'galaxy',
        localKey: 'galaxyId',
        parent: true
      }
    },
    hasMany: {
      planet: {
        localField: "planets",
        foreignKey: "starId"
      },
      moon: {
        localField: 'moons',
        foreignKey: 'starId'
      },
      creature: [{
        localField: 'creatures',
        //many to many relationship. (notice foriegn keys(s))
        foreignKeys: 'galaxyIds'
      }, {
        localField: "knownCreatures",
        localKeys: "creatureIds"
      }]
    }
  }
})


function colorDescription(temp) {
  if (temp >= 7500) {
    color = "blue"
  } else if (temp < 7500 && temp >= 6000) {
    color = "blue to white"
  } else if (temp < 6000 && temp >= 5000) {
    color = "white to yellow"
  } else if (temp < 5000 && temp >= 3500) {
    color = "orange to red"
  } else if (temp < 3500) {
    color = "red"
  }
  return color;
}
function create(star, cb) {

  function starColorDescription(temp) {
    if (temp >= 7500) {
      color = 'blue';
    }
    else if (temp >= 6000 && temp < 7500) {
      color = 'blue to white';
    }
    else if (temp >= 5000 && temp < 6000) {
      color = 'white to yellow';
    }
    else if (temp >= 3500 && temp < 5000) {
      color = 'orange to red';
    }
    else {
      color = 'red';
    }
    return color
  }
  Star.create({
    id: uuid.v4(),
    name: star.name,
    temp: star.temp + 'k',
    color: starColorDescription(star.temp),
    galaxyId: star.galaxyId
  })
    .then(cb).catch(cb)
}

function getAll(query, cb) {
  //Use the Resource Model to get all Galaxies
  Star.findAll({}).then(cb).catch(cb)
}

function getById(id, query, cb) {
  // use the Resource Model to get a single star by its id
  Star.find(id, formatQuery(query)).then(cb).catch(cb)
}

module.exports = {
  create,
  getAll,
  getById
}

