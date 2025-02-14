# AniInfo - Next.js

This is a [Next.js](https://nextjs.org) project for browsing and consulting anime information, powered by the MyAnimeList Jikan API. This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Browse and search for anime information
- Display detailed anime data, including title, synopsis, episodes, and rating
- Real-time data fetched from the [Jikan API](https://jikan.moe/)
- Responsive design for desktop and mobile

## Getting Started

To get started with this project, follow the steps below:

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DarkZangetsu/AniInfo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd anime-info-viewer
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### API Integration

This project uses the [Jikan API](https://jikan.moe/) to fetch anime data. Ensure you have a stable internet connection to load the information properly.

## Project Structure

- `pages/`: Contains the Next.js page components.
- `components/`: Reusable UI components.

## Learn More

To learn more about Next.js and the Jikan API, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Jikan API Documentation](https://docs.api.jikan.moe/) - Explore the capabilities of the Jikan API.

## Deployment

The easiest way to deploy your Next.js application is through [Vercel](https://vercel.com/):

1. Create a Vercel account and link your GitHub repository.
2. Deploy the project with one click.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more information.

## Contributions

Contributions are welcome! If you encounter any issues or have suggestions for new features, please open an issue or submit a pull request.
