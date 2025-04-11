# Saunter 🌍

Saunter is a SPA application for managing routes. It is built with TypeScript, React, Redux Toolkit, Firebase, Google Maps API, Material UI, and Tailwind CSS. The app allows users to create, view, edit routes, add them to favorites, delete them, and search for routes by keywords.

## ✨ Features

### Route List 📋

- **Sorted Display**: All created routes are displayed, sorted by favorites (favorite routes are shown first).

#### Route Information:

- **Route name**: The name of the route.
- **Short description**: A brief description of the route (up to 160 characters).
- **Route length**: Automatically calculated using Google Maps API.
- **Favorite status**: Toggle routes as favorites.

### Search Functionality:

- **Filter routes by name or full description**: Search functionality to quickly filter routes by name or full description.

#### Special Case Handling:

- **No routes available**: If no routes exist, a message is displayed to inform the user.
- **No search results**: If no search results are found, the app will show a notification with an option to clear the search input.

### Detailed Information 🗺️

- **Full Route Details**:
  - **Route name**: The name of the route.
  - **Full description**: A detailed description of the route.
  - **Route length**: The length of the route, calculated dynamically.
  - **Map visualization**: A map showing the route with markers.

#### Management Buttons:

- **Add to favorites / Remove from favorites**: Toggle favorite status for a route.
- **Delete**: Option to delete the route from the app.

### Mobile Optimization:

- On mobile devices, route details are displayed in a dialog window (Dialog), ensuring a user-friendly experience.

### Adding Routes ➕

- **Create New Routes**:
  - Input fields for entering the route name, short description (limited to 160 characters), and full description.
  - A map for adding markers and building the route.
  - **Automatic route length calculation**: The length of the route is calculated using Google Maps API based on the markers.

### Interactive Map 🗺️

- **Marker Management**:
  - Add markers by clicking on the map.
  - Adjust marker positions by dragging them.

#### Dynamic Updates:

- **Route length** recalculates automatically whenever markers are added or changed.
