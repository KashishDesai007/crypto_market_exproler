import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

type FavoritesState = {
  ids: string[];
  selectedIds: string[];
};

type FavoritesAction =
  | { type: 'toggle'; id: string }
  | { type: 'clear' }
  | { type: 'hydrate'; ids: string[] }
  | { type: 'select'; id: string }
  | { type: 'deselect'; id: string }
  | { type: 'selectAll'; ids: string[] }
  | { type: 'deselectAll' }
  | { type: 'removeSelected' };

const FavoritesContext = createContext<{
  favorites: FavoritesState;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
  selectFavorite: (id: string) => void;
  deselectFavorite: (id: string) => void;
  selectAllFavorites: (ids: string[]) => void;
  deselectAllFavorites: () => void;
  removeSelectedFavorites: () => void;
}>({ 
  favorites: { ids: [], selectedIds: [] }, 
  toggleFavorite: () => {}, 
  clearFavorites: () => {},
  selectFavorite: () => {},
  deselectFavorite: () => {},
  selectAllFavorites: () => {},
  deselectAllFavorites: () => {},
  removeSelectedFavorites: () => {}
});

function reducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'hydrate':
      return { ids: action.ids, selectedIds: [] };
    case 'toggle': {
      const exists = state.ids.includes(action.id);
      const ids = exists ? state.ids.filter((x) => x !== action.id) : [...state.ids, action.id];
      return { ...state, ids };
    }
    case 'clear':
      return { ids: [], selectedIds: [] };
    case 'select':
      return { ...state, selectedIds: [...state.selectedIds, action.id] };
    case 'deselect':
      return { ...state, selectedIds: state.selectedIds.filter((id) => id !== action.id) };
    case 'selectAll':
      return { ...state, selectedIds: action.ids };
    case 'deselectAll':
      return { ...state, selectedIds: [] };
    case 'removeSelected':
      return { 
        ids: state.ids.filter((id) => !state.selectedIds.includes(id)), 
        selectedIds: [] 
      };
    default:
      return state;
  }
}

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ids: [], selectedIds: [] });

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem('favorites') : null;
    if (raw) {
      try {
        const ids = JSON.parse(raw) as string[];
        dispatch({ type: 'hydrate', ids });
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('favorites', JSON.stringify(state.ids));
    }
  }, [state.ids]);

  const value = useMemo(
    () => ({
      favorites: state,
      toggleFavorite: (id: string) => dispatch({ type: 'toggle', id }),
      clearFavorites: () => dispatch({ type: 'clear' }),
      selectFavorite: (id: string) => dispatch({ type: 'select', id }),
      deselectFavorite: (id: string) => dispatch({ type: 'deselect', id }),
      selectAllFavorites: (ids: string[]) => dispatch({ type: 'selectAll', ids }),
      deselectAllFavorites: () => dispatch({ type: 'deselectAll' }),
      removeSelectedFavorites: () => dispatch({ type: 'removeSelected' })
    }),
    [state]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export function useFavorites() {
  return useContext(FavoritesContext);
}


