import { EventCard } from "./EventCard";
import { useQueryClient } from "@tanstack/react-query";
import type { IEvent } from "../types/event";
import { UseFavClickHandler } from "../api/events";

interface IEventListProps {
  events: IEvent[];
  debouncedSearchQuery: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
export function EventList({
  events,
  debouncedSearchQuery,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: IEventListProps) {
  const queryClient = useQueryClient();
  return (
    <>
      <div className="events" style={{ marginTop: "20px" }}>
        <div className="container-wrapper">
          <div className="events__list">
            {Array.isArray(events) ? (
              events.map((item: IEvent) => (
                <EventCard
                  key={item.id}
                  item={item}
                  onClick={() => UseFavClickHandler(item, queryClient)}
                />
              ))
            ) : (
              <p>Ожидание данных...</p>
            )}

            {Array.isArray(events) && events.length === 0 && (
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
              events.length > 0 && <p>Вы посмотрели все мероприятия</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
