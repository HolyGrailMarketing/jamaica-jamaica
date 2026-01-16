# Jamaica Jamaica

A functional MVP web app for browsing Jamaican listings (stays, tours, restaurants), with booking requests and favorites management.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma + PostgreSQL (Neon)** for persistence
- **Zod** for validation

## Quick Start

```bash
# Install dependencies
npm install

# Set up database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:migrate` | Create and apply Prisma migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm run db:reset` | Reset database and reseed |

## Features

### Home Page (`/`)
- 360-style immersive hero with hover interaction
- Featured sections for Stays, Tours, Restaurants
- Search functionality

### Browse (`/browse`)
- Filter by category, parish, price range, rating
- Sort by recommended, rating, price
- Pagination

### Listing Details (`/listing/[id]`)
- Image gallery
- Full listing details with amenities/rules/included
- Favorite toggle
- Booking CTA

### Booking Flow (`/booking/[listingId]`)
- Category-adaptive form (stay vs tour/restaurant)
- Zod validation
- Confirmation page with booking reference

### Favorites (`/favorites`)
- Device-based favorites using cookies
- Persistent across sessions

### Admin (`/admin`)
- CRUD for listings
- Toggle featured status
- Demo only (no auth)

## Database

Uses PostgreSQL via [Neon](https://neon.tech) for scalable, serverless database hosting.

### Setup Neon Database

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy your connection string from the Neon dashboard
4. Add it to your `.env` file as `DATABASE_URL`

### Models
- **Listing**: Stays, Tours, Restaurants
- **BookingRequest**: Booking requests from users
- **Favorite**: User favorites (by device ID)

## Environment Variables

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

**For Vercel deployment:**
1. Go to your Vercel project settings
2. Add `DATABASE_URL` environment variable
3. Paste your Neon connection string

**For local development:**
- Use the Neon connection string in your `.env` file
- Or use a local PostgreSQL database with connection string: `postgresql://user:password@localhost:5432/jamaica_jamaica`

## Production Deployment

```bash
npm run build
npm run start
```

For production, the app uses Neon PostgreSQL which is already configured. Simply set the `DATABASE_URL` environment variable in Vercel with your Neon connection string.

## License

MIT
