const Sequelize = require('sequelize');

const db = new Sequelize('HackBnB', 'root', '');

// Listing model
const Listing = db.define('Listing', {
  listingId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  lat: { type: Sequelize.STRING },
  lng: { type: Sequelize.STRING },
  distanceToHackReactor: { type: Sequelize.STRING },
  price: { type: Sequelize.STRING },
  bathrooms: { type: Sequelize.STRING },
  private: { type: Sequelize.BOOLEAN },
  ownerName: { type: Sequelize.STRING },
  ownerEmail: { type: Sequelize.STRING },
  pictures: { type: Sequelize.TEXT },
  description: { type: Sequelize.TEXT },
}, {
  timestamps: false,
});

db.sync().then(() => console.log('done creating tables'))
  .catch((err) => console.log('error syncing database ==>', err));

module.exports.Listing = Listing;
