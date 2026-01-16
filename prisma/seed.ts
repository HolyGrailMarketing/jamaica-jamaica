// This will be full file content rewritten
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PARISH_COORDS: Record<string, { lat: number; lng: number }> = {
    'Kingston': { lat: 17.9714, lng: -76.7920 },
    'St. Andrew': { lat: 18.0179, lng: -76.7897 },
    'St. Thomas': { lat: 17.9300, lng: -76.3600 },
    'Portland': { lat: 18.1500, lng: -76.4500 },
    'St. Mary': { lat: 18.2700, lng: -76.9000 },
    'St. Ann': { lat: 18.4300, lng: -77.2000 },
    'Trelawny': { lat: 18.4000, lng: -77.6000 },
    'St. James': { lat: 18.4700, lng: -77.9200 },
    'Hanover': { lat: 18.4000, lng: -78.1300 },
    'Westmoreland': { lat: 18.2500, lng: -78.1500 },
    'St. Elizabeth': { lat: 18.0500, lng: -77.8500 },
    'Manchester': { lat: 18.0400, lng: -77.5000 },
    'Clarendon': { lat: 17.9500, lng: -77.2000 },
    'St. Catherine': { lat: 18.0400, lng: -77.0000 },
};

const IMAGES = {
    stays: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
    ],
    tours: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
        'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
    ],
    restaurants: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    ],
};

const STAYS = [
    { title: 'Blue Mountain Eco Lodge', parish: 'Portland', locationText: 'Nestled in the Blue Mountains', description: 'Experience sustainable luxury in the heart of Jamaica\'s famous Blue Mountains. Wake up to misty peaks and the aroma of world-renowned coffee.', rating: 4.9, reviewsCount: 127, priceFrom: 250, amenities: ['WiFi', 'Mountain View', 'Coffee Tours', 'Hiking Trails', 'Organic Breakfast', 'Fireplace'], rules: ['No smoking', 'Check-in after 3pm', 'Check-out by 11am'], featured: true },
    { title: 'Negril Beach Villa', parish: 'Westmoreland', locationText: 'Seven Mile Beach, Negril', description: 'Private beachfront villa with stunning sunset views. Direct beach access, private pool, and full staff including chef.', rating: 4.8, reviewsCount: 89, priceFrom: 450, amenities: ['Private Pool', 'Beach Access', 'Chef Service', 'WiFi', 'AC', 'Kayaks'], rules: ['No parties', 'No pets', 'Maximum 8 guests'], featured: true },
    { title: 'Kingston Urban Loft', parish: 'Kingston', locationText: 'New Kingston Business District', description: 'Modern loft apartment in the heart of Kingston. Walking distance to restaurants, nightlife, and cultural attractions.', rating: 4.6, reviewsCount: 64, priceFrom: 120, amenities: ['WiFi', 'AC', 'Gym Access', 'Parking', 'Smart TV', 'Full Kitchen'], rules: ['No smoking', 'No parties'], featured: false },
    { title: 'Ocho Rios Garden Cottage', parish: 'St. Ann', locationText: 'Minutes from Dunn\'s River Falls', description: 'Charming cottage surrounded by tropical gardens. A peaceful retreat with easy access to Jamaica\'s most famous waterfall.', rating: 4.7, reviewsCount: 156, priceFrom: 95, amenities: ['Garden', 'WiFi', 'Kitchen', 'Free Parking', 'BBQ Grill', 'Hammock'], rules: ['Pet friendly', 'Children welcome'], featured: true },
    { title: 'Port Antonio Seaside Escape', parish: 'Portland', locationText: 'Overlooking the Caribbean Sea', description: 'Romantic getaway with panoramic ocean views. Private balcony, outdoor shower, and steps from a secluded beach.', rating: 4.9, reviewsCount: 42, priceFrom: 180, amenities: ['Ocean View', 'Private Beach Access', 'Outdoor Shower', 'Breakfast Included', 'WiFi'], rules: ['Adults only', 'No pets'], featured: false },
    { title: 'Montego Bay Resort Suite', parish: 'St. James', locationText: 'Hip Strip, Montego Bay', description: 'Luxury resort suite with all-inclusive options. Pool, spa, multiple restaurants, and nightlife at your doorstep.', rating: 4.5, reviewsCount: 234, priceFrom: 320, amenities: ['All-Inclusive Available', 'Pool', 'Spa', 'Beach Club', 'WiFi', 'Room Service'], rules: ['Dress code for restaurants'], featured: true },
    { title: 'Treasure Beach Boutique Stay', parish: 'St. Elizabeth', locationText: 'Jake\'s Treasure Beach', description: 'Bohemian-style boutique accommodation in the laid-back fishing village of Treasure Beach.', rating: 4.8, reviewsCount: 78, priceFrom: 165, amenities: ['Restaurant', 'Bar', 'Beach', 'WiFi', 'Yoga Classes', 'Bike Rental'], rules: ['Eco-friendly practices'], featured: false },
];

const TOURS = [
    { title: 'Dunn\'s River Falls Climb', parish: 'St. Ann', locationText: 'Ocho Rios', description: 'Climb Jamaica\'s iconic 180-foot waterfall with expert guides. A must-do Jamaican experience!', rating: 4.7, reviewsCount: 892, priceFrom: 75, amenities: ['Guide Included', 'Transport', 'Water Shoes', 'Photo Package'], included: ['Round-trip transport', 'Entry fee', 'Professional guide', 'Water shoes rental'], featured: true },
    { title: 'Blue Mountain Coffee Tour', parish: 'St. Andrew', locationText: 'Blue Mountains', description: 'Visit working coffee plantations and learn the art of Blue Mountain coffee production.', rating: 4.9, reviewsCount: 345, priceFrom: 120, amenities: ['Coffee Tasting', 'Lunch Included', 'Expert Guide', 'Transport'], included: ['Plantation tour', 'Coffee tasting', 'Traditional lunch', 'Souvenir coffee'], featured: true },
    { title: 'Bob Marley Nine Mile Tour', parish: 'St. Ann', locationText: 'Nine Mile Village', description: 'Visit the birthplace and final resting place of reggae legend Bob Marley.', rating: 4.8, reviewsCount: 567, priceFrom: 85, amenities: ['Museum Tour', 'Mausoleum Visit', 'Rastafarian Guide', 'Transport'], included: ['Entry fees', 'Guided tour', 'Transportation', 'Light refreshments'], featured: true },
    { title: 'Luminous Lagoon Night Tour', parish: 'Trelawny', locationText: 'Falmouth', description: 'Witness the magic of bioluminescent waters. Boat tour through the glowing lagoon followed by a swim.', rating: 4.6, reviewsCount: 423, priceFrom: 45, amenities: ['Boat Ride', 'Swimming', 'Night Tour'], included: ['Boat tour', 'Swimming time', 'Guide', 'Life jackets'], featured: false },
    { title: 'Bamboo Rafting on Martha Brae', parish: 'Trelawny', locationText: 'Martha Brae River', description: 'Glide down the scenic Martha Brae River on a handcrafted bamboo raft.', rating: 4.7, reviewsCount: 289, priceFrom: 70, amenities: ['Private Raft', 'Captain Guide', 'Scenic Route'], included: ['30-foot bamboo raft', 'Licensed captain', 'Fruit refreshment'], featured: false },
    { title: 'Appleton Estate Rum Tour', parish: 'St. Elizabeth', locationText: 'Nassau Valley', description: 'Tour Jamaica\'s oldest rum distillery. Learn the 250-year history and enjoy generous tastings.', rating: 4.8, reviewsCount: 678, priceFrom: 55, amenities: ['Rum Tasting', 'Factory Tour', 'History Lesson'], included: ['Distillery tour', 'Rum tasting', 'Souvenir glass', 'Discount on purchases'], featured: true },
];

const RESTAURANTS = [
    { title: 'Scotchies Jerk Centre', parish: 'St. Ann', locationText: 'Ocho Rios', description: 'Authentic open-pit jerk cooking at its finest. Jerk chicken, pork, and fish prepared over pimento wood.', rating: 4.7, reviewsCount: 1234, priceFrom: 15, amenities: ['Outdoor Seating', 'Authentic Jerk', 'Local Favorite'], included: ['Traditional sides', 'Festival bread', 'Fresh juices available'], featured: true },
    { title: 'Miss T\'s Kitchen', parish: 'St. Ann', locationText: 'Ocho Rios Town', description: 'Farm-to-table Jamaican cuisine in a cozy setting with a gourmet twist on traditional dishes.', rating: 4.9, reviewsCount: 456, priceFrom: 35, amenities: ['Farm to Table', 'Organic', 'Vegetarian Options'], included: ['Complimentary sorrel drink', 'Homemade bread'], featured: true },
    { title: 'The Pelican Grill', parish: 'St. James', locationText: 'Montego Bay', description: 'Upscale dining with ocean views. Fresh seafood, steaks, and Caribbean fusion cuisine.', rating: 4.6, reviewsCount: 389, priceFrom: 55, amenities: ['Ocean View', 'Fine Dining', 'Full Bar', 'Dress Code'], included: ['Bread service', 'Amuse-bouche'], featured: false },
    { title: 'Boston Jerk Centre', parish: 'Portland', locationText: 'Boston Bay', description: 'The birthplace of jerk! Multiple vendors serve up the original Boston Bay-style jerk.', rating: 4.8, reviewsCount: 867, priceFrom: 12, amenities: ['Beach Adjacent', 'Multiple Vendors', 'Authentic', 'Casual'], included: ['Breadfruit', 'Festival'], featured: true },
    { title: 'Strawberry Hill', parish: 'St. Andrew', locationText: 'Blue Mountains', description: 'Elegant mountain dining with panoramic views of Kingston. Farm-fresh ingredients, award-winning cuisine.', rating: 4.9, reviewsCount: 234, priceFrom: 75, amenities: ['Mountain Views', 'Sunday Brunch', 'Fine Dining', 'Reservations Required'], included: ['Welcome cocktail', 'Coffee service'], featured: true },
];

const SAMPLE_REVIEWS = [
    { author: 'Sarah Mitchell', comment: 'Absolutely amazing experience! The views were breathtaking and the service was top notch.', rating: 5 },
    { author: 'James Wilson', comment: 'Great place, would definitely recommend. A bit pricey but worth it.', rating: 4 },
    { author: 'Maria Garcia', comment: 'Had a wonderful time with my family. The kids loved it!', rating: 5 },
    { author: 'David Chen', comment: 'Good experience overall. One star off because it was a bit crowded.', rating: 4 },
    { author: 'Emma Thompson', comment: 'Highlight of our trip to Jamaica! Can\'t wait to come back.', rating: 5 },
    { author: 'Michael Brown', comment: 'Authentic and beautiful. The staff went above and beyond.', rating: 5 },
    { author: 'Lisa Anderson', comment: 'Very clean and organized. Food was delicious too.', rating: 4 },
    { author: 'Robert Taylor', comment: 'A hidden gem. So peaceful and relaxing.', rating: 5 },
];

async function seedReviews(listingId: string) {
    const numReviews = Math.floor(Math.random() * 4) + 2; // 2-5 reviews
    const shuffled = [...SAMPLE_REVIEWS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numReviews);

    for (const review of selected) {
        await prisma.review.create({
            data: {
                listingId,
                authorName: review.author,
                rating: review.rating,
                comment: review.comment,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Random date in past
            },
        });
    }
}

async function main() {
    console.log('🌴 Seeding Jamaica Jamaica database...');

    await prisma.review.deleteMany(); // Clear reviews first
    await prisma.favorite.deleteMany();
    await prisma.bookingRequest.deleteMany();
    await prisma.listing.deleteMany();

    for (let i = 0; i < STAYS.length; i++) {
        const stay = STAYS[i];
        const coords = PARISH_COORDS[stay.parish];
        const listing = await prisma.listing.create({
            data: {
                category: 'STAY',
                title: stay.title,
                parish: stay.parish,
                locationText: stay.locationText,
                description: stay.description,
                rating: stay.rating,
                reviewsCount: stay.reviewsCount,
                priceFrom: stay.priceFrom,
                images: JSON.stringify([IMAGES.stays[i % IMAGES.stays.length]]),
                amenities: JSON.stringify(stay.amenities),
                rules: JSON.stringify(stay.rules),
                lat: coords?.lat,
                lng: coords?.lng,
                featured: stay.featured,
            },
        });
        await seedReviews(listing.id);
    }
    console.log(`✅ Created ${STAYS.length} stays`);

    for (let i = 0; i < TOURS.length; i++) {
        const tour = TOURS[i];
        const coords = PARISH_COORDS[tour.parish];
        const listing = await prisma.listing.create({
            data: {
                category: 'TOUR',
                title: tour.title,
                parish: tour.parish,
                locationText: tour.locationText,
                description: tour.description,
                rating: tour.rating,
                reviewsCount: tour.reviewsCount,
                priceFrom: tour.priceFrom,
                images: JSON.stringify([IMAGES.tours[i % IMAGES.tours.length]]),
                amenities: JSON.stringify(tour.amenities),
                included: JSON.stringify(tour.included),
                lat: coords?.lat,
                lng: coords?.lng,
                featured: tour.featured,
            },
        });
        await seedReviews(listing.id);
    }
    console.log(`✅ Created ${TOURS.length} tours`);

    for (let i = 0; i < RESTAURANTS.length; i++) {
        const restaurant = RESTAURANTS[i];
        const coords = PARISH_COORDS[restaurant.parish];
        const listing = await prisma.listing.create({
            data: {
                category: 'RESTAURANT',
                title: restaurant.title,
                parish: restaurant.parish,
                locationText: restaurant.locationText,
                description: restaurant.description,
                rating: restaurant.rating,
                reviewsCount: restaurant.reviewsCount,
                priceFrom: restaurant.priceFrom,
                images: JSON.stringify([IMAGES.restaurants[i % IMAGES.restaurants.length]]),
                amenities: JSON.stringify(restaurant.amenities),
                included: JSON.stringify(restaurant.included),
                lat: coords?.lat,
                lng: coords?.lng,
                featured: restaurant.featured,
            },
        });
        await seedReviews(listing.id);
    }
    console.log(`✅ Created ${RESTAURANTS.length} restaurants`);

    const total = await prisma.listing.count();
    console.log(`\n🎉 Seeding complete! Total listings: ${total}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
