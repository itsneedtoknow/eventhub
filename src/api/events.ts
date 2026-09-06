import type { IEvent } from "../types/event";
import { QueryClient } from "@tanstack/react-query";

export async function UseFavClickHandler(
  item: IEvent,
  queryClient: QueryClient,
) {
  const isFavoriteItem = item.isFav === false ? true : false;

  await fetch(`http://localhost:3000/events/${item.id}`, {
    method: "PATCH",
    body: JSON.stringify({ isFav: isFavoriteItem }),
  })
    .then((response) => {
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["events"] });
      }
      return response.json();
    })
    .catch((err) => console.error("Ошибка при добавлении в фав:", err));
}

export async function fetchSearchQuery(
  { pageParam = 1 },
  query: string,
  url: string,
  limit: number,
  isFav?: boolean,
) {
  const params = new URLSearchParams();
  params.append("_page", pageParam.toString());
  params.append("_per_page", limit.toString());
  if (query && query.trim() !== "") {
    params.append("title_contains", query.trim());
  }
  if (isFav === true) {
    params.append("isFav", "true");
  }
  const searchEndPoint = `${url}?${params.toString()}`;

  const res = await fetch(searchEndPoint);
  if (!res.ok) {
    throw new Error("Ошибка сети");
  }
  return await res.json();
}
