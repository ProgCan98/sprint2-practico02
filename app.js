const mongoose = require('mongoose');

// Se establece una ruta entre la aplicacion y el cluster mongodb, mongoose facilita la interaccion de una manera mas segura y organizada
mongoose
  .connect(
    'mongodb+srv://Grupo17:grupo17@cursadanodejs.ls9ii.mongodb.net/Node-js'
  )
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Defie un schema para los superHeroes
const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
  },
  { collection: 'Grupo-XX' }
);

// Inserta un nuevo superHeroe
const SuperHero = mongoose.model('SuperHero', superheroSchema);

async function insertSuperHero() {
  const hero = new SuperHero({
    nombreSuperHeroe: 'Spiderman',
    nombreReal: 'Peter Parker',
    edad: 25,
    planetaOrigen: 'Tierra',
    debilidad: 'Radioactiva',
    poderes: ['Trepar paredes', 'Sentido aracnido', 'Super fuerza', 'Agilidad'],
    aliados: ['Ironman'],
    enemigos: ['Duende Verde'],
    creador: 'Martin',
  });
  await hero.save();
  console.log('Superhéroe insertado:', hero);
}
insertSuperHero();

// actualiza un superHeroe existente
async function updateSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.updateOne(
    { nombreSuperHeroe: nombreSuperHeroe },
    { Sset: { edad: 26 } }
  );
}
console.log('Resultado de la actualización:', result);

updateSuperHero('Spiderman');

// Elimina un superHeroe de la colección
async function deleteSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.deleteOne({
    nombreSuperHeroe: nombreSuperHeroe,
  });
  console.log('Superhéroe eliminado:', result);
}
deleteSuperHero('Spiderman');

// Función que busca todos los superHeroes cuyo planeta de origen sea "Tierra"
async function findSuperHeroes() {
  const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
  console.log('Superheroes encontrados:', heroes);
}
findSuperHeroes();
