# PokéAtlas 🎮

A modern, responsive Pokémon discovery platform built with React, TypeScript, and Tailwind CSS. Explore Pokémon, their stats, abilities, evolutions, and more using the PokéAPI.

## 🌟 Features

- **Pokédex Browser** — Browse all Pokémon with pagination and search
- **Individual Pokémon Profiles** — Detailed stats, abilities, evolution chains, and moves
- **Type Explorer** — Browse all 18 Pokémon types with effectiveness tables (super effective, weak against, resistant, immune)
- **Generation Browser** — Explore Pokémon by generation with region information
- **Comparison Tool** — Compare 2-4 Pokémon side-by-side with stats visualization
- **Favorites System** — Save your favorite Pokémon with persistent localStorage
- **Dark/Light Mode** — Toggle between themes with persistent user preference
- **Responsive Design** — Beautiful on mobile, tablet, and desktop
- **Fast Performance** — API caching, lazy loading, skeleton loaders

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/SumitNagesia123/PokeAtlas.git
cd PokeAtlas
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview  # Preview the production build
```

## 📁 Project Structure

```
pokeatlas/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components (routes)
│   ├── layouts/         # Layout wrappers
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer (PokéAPI)
│   ├── context/         # React Context (Theme, Favorites)
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions and constants
│   ├── App.tsx          # Main app router
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Data Source:** [PokéAPI](https://pokeapi.co)

## 📖 Pages

- **Home** (`/`) — Hero section, featured Pokémon, type explorer, statistics
- **Pokédex** (`/pokedex`) — Browse all Pokémon with pagination
- **Pokémon Detail** (`/pokemon/:name`) — Individual Pokémon profile with full details
- **Types** (`/types`) — All 18 Pokémon types
- **Type Detail** (`/types/:typeName`) — Type-specific information and effectiveness
- **Generations** (`/generations`) — Browse by generation and region
- **Compare** (`/compare`) — Compare up to 4 Pokémon
- **Favorites** (`/favorites`) — View saved Pokémon

## 🎨 Design Features

- **Modern UI** — Clean, card-based interface with type-specific colors
- **Smooth Animations** — Fade-in, float, scale, and stat-bar animations
- **Dark Mode** — Full dark theme support with accessible colors
- **Responsive** — Mobile-first design that scales to any screen size
- **Glassmorphism** — Subtle glass effects on cards and overlays
- **Type-Specific Colors** — Each Pokémon type has its own color scheme

## 🔧 Development

### Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint (if configured)

### API Caching

The app implements a 5-minute cache for API requests to reduce server load and improve performance. The cache is stored in memory and automatically expires old entries.

### Favorites Persistence

Favorite Pokémon are saved to the browser's localStorage and persist across sessions.

### Theme Persistence

The user's theme preference (dark/light) is saved to localStorage and restored on app load.

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🐛 Known Limitations

- Some Pokémon may not have all data available from the API
- Evolution chains are fetched but simplified display
- Move details require additional API calls (consider lazy loading)

## 🚀 Future Improvements

- [ ] Advanced search with multiple filters
- [ ] Pokémon move learning methods and TMs
- [ ] Abilities detailed descriptions
- [ ] Location information
- [ ] Team builder tool
- [ ] User authentication and cloud sync
- [ ] PWA support for offline usage

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **Data Source:** [PokéAPI](https://pokeapi.co) — A RESTful API for Pokémon data
- **Pokémon:** © The Pokémon Company / Game Freak / Nintendo
- **Design Inspiration:** Modern web design patterns and principles

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Made with ❤️ by PokéAtlas**
