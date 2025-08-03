# Project Overview

This project is a collection of developer tools built with React and Vite. The developer is creating these tools for personal use and for fun. The project is not intended to be a production-ready application and may not follow all best practices.

The main technologies used are:

*   **React:** For building the user interface.
*   **Vite:** As the build tool and development server.
*   **React Router:** for routing between the different tools.
*   **Tailwind CSS:** For styling.
*   **Leaflet:** For the GeoJSON visualizer.

The project is structured into several modules, each containing a specific tool:

*   **Codec:** A Base64 encoder/decoder.
*   **GeoJSON:** A tool to visualize GeoJSON data on a map. It features a bidirectional synchronization between the map and a textarea. Any changes made on the map (drawing, editing, deleting features) are reflected in the GeoJSON textarea, and any valid changes in the textarea are reflected on the map. Circles are converted to polygons. The rectangle drawing tool is currently disabled due to rendering bugs.
*   **Timezone:** A timezone converter.

# Building and Running

The project uses `yarn` as the package manager. The following commands are available in the `package.json`:

*   `yarn dev`: Starts the development server.
*   `yarn build`: Builds the project for production.
*   `yarn lint`: Lints the project using ESLint.
*   `yarn preview`: Serves the production build locally.

# Development Conventions

*   The project uses functional components with hooks.
*   Styling is done with Tailwind CSS.
*   The code is not extensively commented, but it is relatively easy to understand.
*   There are no tests in the project.
