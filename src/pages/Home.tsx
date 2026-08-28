import { useInfiniteQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import type { IEvent } from "../types/event";

interface LayoutContextType {
  debouncedSearchQuery: string;
}
const BASE_URL = "http://localhost:3000/events";

export function Home() {
  const { debouncedSearchQuery } = useOutletContext<LayoutContextType>();

  const limit = 6;
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

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["events", debouncedSearchQuery, page],
  //   queryFn: () => fetchSearchQuery(debouncedSearchQuery, page),
  // });
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

      <div style={{ marginTop: "20px" }}>
        {Array.isArray(allEvents) ? (
          allEvents.map((item: IEvent) => <p key={item.id}>{item.title}</p>)
        ) : (
          <p>Ожидание данных...</p>
        )}

        {Array.isArray(allEvents) && allEvents.length === 0 && (
          <p>Ничего не найдено по запросу «{debouncedSearchQuery}»</p>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
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
    </>
  );
}
