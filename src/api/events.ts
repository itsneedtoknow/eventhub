import type { IEvent } from "../types/event";
//import { useQueryClient } from "@tanstack/react-query";
export async function UseFavClickHandler(item: IEvent, queryClient) {
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
    .then((data) => console.log(data))
    .catch((err) => console.error("Ошибка при добавлении в фав:", err));
}
