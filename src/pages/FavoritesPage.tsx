import { fetchSearchQuery } from "../api/events";
import { BASE_URL } from "./Home";
export function FavoritesPage() {
  const favURL = `${BASE_URL}?isFav=true`;
  const favLimit = 4;
  //const pageParam = 1;
  const favoriteItems = ({ pageParam = 1 }) => {
    fetchSearchQuery({ pageParam }, "", favURL, favLimit);
  };
  console.log(favoriteItems);
  return (
    <>
      <h1>Favorites</h1>
    </>
  );
}
