import useAuthStore from '../zustand/useAuthStore';

const Loader = ({ children }) => {

  // Retrieve the isLoading value from the auth Zustand store
  const isLoading = useAuthStore(state => state.isLoading);

  // If the auth is ready, show the page
  if(!isLoading) return children;

  // Else, return no JSX
  return null;
}

export default Loader;