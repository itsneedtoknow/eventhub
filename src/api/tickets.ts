const TICKETS_URL = "http://localhost:3000/tickets";
const EVENT_URL = "http://localhost:3000/events/";
export async function fetchTickets() {
  const ticketData = await fetch(TICKETS_URL);

  if (!ticketData.ok) {
    throw new Error("Ошибка сети");
  }
  const tickets = await ticketData.json();
  return tickets;
}
export async function fetchEventByID(id: number) {
  const ticketEventData = await fetch(`${EVENT_URL}${id}`);

  if (!ticketEventData.ok) {
    throw new Error("Ошибка сети");
  }
  const ticketEvent = await ticketEventData.json();
  return ticketEvent;
}
export async function changeTicketCancelStatus(
  id: number,
  isCancelled: boolean,
) {
  const ticketToChange = await fetch(`${TICKETS_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isCancelled }),
  });
  if (!ticketToChange.ok) throw new Error("Ошибка при PATCH запросе");

  return ticketToChange.json();
}
