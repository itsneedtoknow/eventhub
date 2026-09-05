import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import type { IEvent } from "../types/event";
import { EventCard } from "../components/EventCard";
import { UseFavClickHandler } from "../api/events";

interface LayoutContextType {
  debouncedSearchQuery: string;
}
export const BASE_URL = "http://localhost:3000/events";

export function Home() {
  const { debouncedSearchQuery } = useOutletContext<LayoutContextType>();
  const queryClient = useQueryClient();

  const limit = 4;
  async function fetchSearchQuery({ pageParam = 1 }) {
    const cleanSearch = debouncedSearchQuery ? debouncedSearchQuery.trim() : "";
    const paginationSetting = `?_page=${pageParam}&_per_page=${limit}`;

    const searchEndPoint = cleanSearch
      ? `${BASE_URL}${paginationSetting}&title_contains=${debouncedSearchQuery}`
      : `${BASE_URL}${paginationSetting}`;

    const res = await fetch(searchEndPoint);
    if (!res.ok) {
      throw new Error("Ошибка сети");
    }
    return await res.json();
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,

    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["events", debouncedSearchQuery],
    queryFn: fetchSearchQuery,
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
      <h1>Homepage</h1>

      <div className="events" style={{ marginTop: "20px" }}>
        <div className="container-wrapper">
          <div className="events__list">
            {Array.isArray(allEvents) ? (
              allEvents.map((item: IEvent) => (
                <EventCard
                  key={item.id}
                  item={item}
                  onClick={() => UseFavClickHandler(item, queryClient)}
                />
              ))
            ) : (
              <p>Ожидание данных...</p>
            )}

            {Array.isArray(allEvents) && allEvents.length === 0 && (
              <p>Ничего не найдено по запросу «{debouncedSearchQuery}»</p>
            )}
          </div>
          <div style={{ margin: "20px auto", maxWidth: "max-content" }}>
            {hasNextPage ? (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                style={{ padding: "10px 20px", cursor: "pointer" }}
              >
                {isFetchingNextPage ? "Загрузка..." : "Показать ещё"}
              </button>
            ) : (
              allEvents.length > 0 && <p>Вы посмотрели все мероприятия</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
