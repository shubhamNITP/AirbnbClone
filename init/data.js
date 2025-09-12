const sampleListing = [
    {
        title: 'My new House',
        description: 'A beautiful house in the countryside',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', // house
        price: 250000,
        location: 'Countryside',
        country: 'USA',
    },
    {
        title: 'Beachfront Villa',
        description: 'Luxurious villa with ocean views',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', // beach/villa
        price: 1500000,
        location: 'Malibu',
        country: 'USA',
    },
    {
        title: 'Mountain Cabin',
        description: 'Cozy cabin in the mountains',
        // mountain/cabin
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b', // beautiful mountain cabin
        price: 300000,
        location: 'Aspen',
        country: 'USA',
        },
        {
            title: 'City Apartment',
            description: 'Modern apartment in the city center',
            image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca', // city/apartment
        price: 800000,
        location: 'New York',
        country: 'USA',
    },
    {
        title: 'Countryside Farmhouse',
        description: 'Charming farmhouse with a large garden',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae', // farmhouse/countryside
        price: 400000,
        location: 'Napa Valley',
        country: 'USA',
    }
    ,
    {
        title: 'Lake House Retreat',
        description: 'Peaceful house by the lake with stunning views',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
        price: 600000,
        location: 'Lake Tahoe',
        country: 'USA',
    },
    {
        title: 'Desert Oasis',
        description: 'Unique home in the heart of the desert',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        price: 450000,
        location: 'Phoenix',
        country: 'USA',
    },
    {
        title: 'Historic Townhouse',
        description: 'Elegant townhouse with historic charm',
        image: 'https://images.unsplash.com/photo-1430285561322-7808604715df',
        price: 950000,
        location: 'Boston',
        country: 'USA',
    },
    {
        title: 'Modern Loft',
        description: 'Spacious loft with modern amenities',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
        price: 700000,
        location: 'San Francisco',
        country: 'USA',
    },
    {
        title: 'Suburban Home',
        description: 'Family-friendly home in a quiet suburb',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        price: 350000,
        location: 'Palo Alto',
        country: 'USA',
    },
    {
        title: 'Luxury Penthouse',
        description: 'Stunning penthouse with panoramic city views',
        image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        price: 2000000,
        location: 'Chicago',
        country: 'USA',
    },
    {
        title: 'Rural Cottage',
        description: 'Charming cottage in a rural setting',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',  
        price: 280000,
        location: 'Vermont',
        country: 'USA',
    },
    {
        title: 'Urban Studio',
        description: 'Compact studio in the heart of the city',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
        price: 500000,
        location: 'Seattle',
        country: 'USA',
    },
    {
        title: 'Seaside Cottage',
        description: 'Charming cottage by the sea',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
        price: 600000,
        location: 'Cape Cod',
        country: 'USA',
    },
    {
        title: 'Rustic Barn Conversion',
        description: 'Converted barn with rustic charm',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
        price: 400000,
        location: 'Nashville',
        country: 'USA',
    },
    {
        title: 'Eco-Friendly Home',
        description: 'Sustainable home with green features',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
        price: 550000,
        location: 'Portland',
        country: 'USA',
    },
    {
        title: 'Victorian House',
        description: 'Beautiful Victorian house with original features',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
        price: 750000,
        location: 'Philadelphia',
        country: 'USA',
    },
    {
        title: 'Contemporary Bungalow',
        description: 'Stylish bungalow with modern design',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
        price: 650000,
        location: 'Austin',
        country: 'USA',
    },

    {
        title: 'Chalet in the Alps',
        description: 'Cozy chalet with stunning mountain views',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        price: 1200000,
        location: 'Swiss Alps',
        country: 'Switzerland',
    },
    {
        title: 'Mediterranean Villa',
        description: 'Luxurious villa with Mediterranean architecture',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        price: 1800000,
        location: 'Santorini',
        country: 'Greece',
    },
    {
        title: 'Countryside Cottage',
        description: 'Charming cottage in the English countryside',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', // updated image
        price: 400000,
        location: 'Cotswolds',
        country: 'UK',
    },
    {
        title: 'Modern Beach House',
        description: 'Stylish beach house with ocean views',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
        price: 900000,
        location: 'Bondi Beach',
        country: 'Australia',
    }
]


module.exports = {data : sampleListing};