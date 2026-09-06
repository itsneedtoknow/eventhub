import { useInfiniteQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import { EventList } from "../components/EventList";
import { fetchSearchQuery } from "../api/events";
interface LayoutContextType {
  debouncedSearchQuery: string;
}
interface IHomeProps {
  isOnlyFavorites?: boolean;
}
export const BASE_URL = "http://localhost:3000/events";

export function Home({ isOnlyFavorites = false }: IHomeProps) {
  const { debouncedSearchQuery } = useOutletContext<LayoutContextType>();
  const limit = 4;

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,

    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "events",
      debouncedSearchQuery,
      isOnlyFavorites ? "favorites" : "all",
    ],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchQuery(
        { pageParam },
        debouncedSearchQuery,
        BASE_URL,
        limit,
        isOnlyFavorites,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) {
    return <h2>Загрузка мероприятий...</h2>;
  }

  const allEvents = data ? data.pages.flatMap((item) => item.data) : [];
  if (isError) {
    return <h2 style={{ color: "red" }}>Ошибка загрузки данных</h2>;
  }

  return (
    <>
      <h1>{isOnlyFavorites ? "Избранные мероприятия" : "Все мероприятия"}</h1>

      <EventList
        events={allEvents}
        debouncedSearchQuery={debouncedSearchQuery}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
