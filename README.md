# LOESS Soil Map

Welcome to the **LOESS Soil Map** project! This web application is designed for crowdmapping soil issues. Users, particularly gardeners and nature enthusiasts, can add, view, and manage points on a map that highlight soil problems such as erosion, dryness, wetness, or crusting. This project is built using **Next.js 14** and employs cutting-edge tools for optimal performance.

## Features

- **Interactive Map**: Add and view points with details about soil issues.
- **User Profiles**: Manage your contributions and account details.
- **Admin Panel**: Oversee and moderate user activities and map points.
- **Responsive Design**: Accessible on both web and mobile devices.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Git**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/GeoSurveyMap/LOESS-Soil-Map.git
cd LOESS-Soil-Map
```

### 2. Install Dependencies

Install the required packages using npm or yarn:

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Building the Project

To create a production-ready build, use the following command:

```bash
npm run build
# or
yarn build
```

This will generate an optimized build in the `.next` folder.

### Running the Production Build

After building the project, start the production server:

```bash
npm run start
# or
yarn start
```

By default, the application will be accessible at `http://localhost:3000`.

---

## Project Structure

The project is organized as follows:

```
.
├── app
│   ├── _components       # Reusable components for app-specific features
│   ├── api               # API routes for authentication and webhooks
│   ├── map               # Map-related components and logic
│   └── profile           # Components for user profiles
├── components            # Shared components across the application
├── constants             # Global constants
├── context               # React context for managing app state
├── hooks                 # Custom hooks for reusable logic
├── lib                   # Utility functions
├── providers             # Providers for context and third-party libraries
├── public                # Public assets (images, icons, etc.)
├── styles                # Global and component-specific styles
├── types                 # TypeScript types
└── ...                   # Configuration files (Next.js, Tailwind, etc.)
```

---

## Scripts

The following scripts are available in the `package.json` file:

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run lint`: Lint the codebase for issues.

---

## Dependencies

Key dependencies used in this project:

- **Next.js 14**: Framework for building React applications.
- **Leaflet**: Interactive map rendering.
- **React-Leaflet**: React bindings for Leaflet.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Kinde**: Authentication and user management.
- **React Query**: Data fetching and state management.

---

## Contribution

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
