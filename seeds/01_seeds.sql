INSERT INTO users (
  name,
  email,
  password
)
VALUES 
(
    'Luke', 
    'ocaen1@yahoo.com', 
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u' 
  ),
  (
    'Sunny',
    'sunny1@gmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  ),
  (
    'Catjerine',
    'Cathrine2#3@mail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'
  );


INSERT INTO properties (
  owner_id
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  street,
  parking_space,
  number_of_bathrooms,
  number_of_bedrooms,
  country,
  city,
  province,
  post_code,
  active
)
VALUES
(
  1,
  'Inglewood',
  'description',
  'https://www.pexels.com/photo/blue-and-gray-concrete-house-with-attic-during-twilight-186077/',
  'fkfd',
  10,
  'El Camino',
  2,
  3,
  4,
  'The US',
  'El Mino',
  'El Casa',
  25647,
  true
),
(
  2,
  'Melninha',
  'description',
  'https://www.pexels.com/photo/sun-piercing-of-brown-concrete-house-near-sea-1732414/',
  'no',
  50,
  'Great Govermnent',
  2,
  4,
  6,
  'Italy',
  'Spjaghetti',
  'Bologna',
  70214,
  true
),
(
  3,
  'Great Escape',
  'description',
  'https://www.pexels.com/photo/architecture-building-buy-buyer-221540/',
  'no',
  100,
  'New Hampton',
  4,
  5,
  5,
  'Patriot',
  'Al Mackel',
  'Pino',
  '2345E3',
  true
);


INSERT INTO reservations (
  guest_id,
  property_id,
  start_date,
  end_date
)
VALUES
(
  1,
  1,
 '20170315',
 '20200530' 
)
(
  2,
  2,
  '20190520',
  '20210424'
)
(
  3,
  3,
  '20180424',
  '20240119' 
);

INSERT INTO property_reviews (
  guest_id,
  reservation_id,
  property_id,
  rating,
  message
)
VALUES (
  1,
  1,
  1,
  8,
  'message'
)
( 
  2,
  2,
  2,
  9,
  'message'
)
(
  3,
  3,
  3,
  7,
  'message'
);