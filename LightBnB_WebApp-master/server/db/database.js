// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  return pool.query(
    `
    SELECT * FROM users
    WHERE email = $1;
  `,
    [email]
  )
    .then(res => {
      if (res) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error("query error", err.stack));
};
exports.getUserWithEmail = getUserWithEmail;


/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// }
// exports.getUserWithId = getUserWithId;

const getUserWithId = function (id) {
  return pool
    .query(
      `
    SELECT * FROM users
    WHERE id = $1;
  `,
      [id]
    )
    .then(res => {
      if (res) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error("query error", err.stack));
};
exports.getUserWithId = getUserWithId;



/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = function (user) {
  return pool.query(
    `INSERT INTO users(name, email, password)
  VALUES($1 ,$2, $3)
  RETURNING *;
`,
    [user.name, user.email, user.password]
  )
    .then(res => res.rows)
    .catch(err => console.error("query error", err.stack));
}
exports.addUser = addUser;


/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const query = {
    text: `SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = $1
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT ${limit};`,
    values: [guest_id]
  }
  return pool.query(query)
    .then(res => res.rows)
}

// const getAllReservations = function (guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// 
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = function (options, limit = 10) {
  //1
  const queryParams = [];

  //2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE lower(city) LIKE $${queryParams.length} `;

  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`)
    if (queryParams.length === 1) {
      queryString += `WHERE properties.cost_per_night/100 >= $${queryParams.length} `
    }
    else {
      queryString += `AND properties.cost_per_night/100 >= $${queryParams.length}`
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`)
    if (queryParams.length === 1) {
      queryString += `WHERE properties.cost_per_night/100 <= $${queryParams.length}`
    }
    else {
      queryString += `AND properties.cost_per_night/100 <= $${queryParams.length}`
    }
  }
  // 4
  queryString += `GROUP BY properties.id`
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`)
    queryString += ` HAVING avg(rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  // 5
  console.log(queryString, queryParams);
  
  // 6
  const query = {
    text : queryString,
    values: queryParams
  }

  return pool.query(query)
  .then(res => {
    return res.rows
  })
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,
    cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms,
    country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING * ;`;

  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code
  ];

  return db.query(queryString, values).then(res => res.rows[0]);
};
exports.addProperty = addProperty;