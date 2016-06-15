const sqldb = require('../../db/sqldb');

module.exports = {
  getListings: function getListings(req, res) {
    // req.user.id
    sqldb.Listing.findAll({ where: {} })
    .then((listings) => {
      const response = listings.reduce((accumulator, current) => {
        accumulator[current.listingId] = current;
        return accumulator;
      }, {});
      res.end(JSON.stringify(response));
    })
    .catch((error) => {
      console.error(error);
      res.end('error');
    });
  },

  addListing: function addListing(req, res) {
    sqldb.Listing.create({ userId: req.user.id, address: req.body.address, price: req.body.price,
      bathrooms: req.body.bathrooms, private: JSON.parse(req.body.private),
      ownerEmail: req.body.ownerEmail, ownerName: req.body.ownerName,
      description: req.body.description, pictures: req.body.pictures })
      .then((response) => {
        process.send({ listingId: response.dataValues.listingId });
        res.end(JSON.stringify(response.dataValues));
      })
      .catch((error) => {
        console.error(error);
        res.end('error');
      });
  },

  getListing: function getListing(listingId, callback) {
    sqldb.Listing.findOne({ where: { listingId } })
      .then((listing) => {
        callback(null, listing.dataValues);
      })
      .catch((error) => {
        callback(error);
      });
  },

  updateListing: function updateListing(listingId, lat, lng, distanceToHackReactor, callback) {
    sqldb.Listing.update(
      { lat, lng, distanceToHackReactor },
      { where: { listingId } })
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error);
      });
  },
};


