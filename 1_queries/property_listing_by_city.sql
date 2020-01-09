-- SELECT * 
-- FROM properties
-- JOIN property_reviews ON property_id = properties.id
-- WHERE rating >= 4
-- AND city = 'Vancouver'
-- ORDER BY cost_per_night ASC
-- LIMIT 10

SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;