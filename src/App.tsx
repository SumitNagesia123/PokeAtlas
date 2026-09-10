import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokemonDetail from './pages/PokemonDetail';
import Types from './pages/Types';
import TypeDetail from './pages/TypeDetail';
import Generations from './pages/Generations';
import GenerationDetail from './pages/GenerationDetail';
import Compare from './pages/Compare';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'pokedex', element: <Pokedex /> },
      { path: 'pokemon/:name', element: <PokemonDetail /> },
      { path: 'types', element: <Types /> },
      { path: 'types/:typeName', element: <TypeDetail /> },
      { path: 'generations', element: <Generations /> },
      { path: 'generations/:generationId', element: <GenerationDetail /> },
      { path: 'compare', element: <Compare /> },
      { path: 'favorites', element: <Favorites /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
