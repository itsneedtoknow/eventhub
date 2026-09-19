import { TicketList } from "./TicketList";
import { Tabs } from "../../components/Tabs";
import { fetchTickets } from "../../api/tickets";
import { useQuery } from "@tanstack/react-query";
import { fetchEventByID } from "../../api/tickets";
import { useEffect, useState } from "react";
import type { ITicketWithEvent } from "../../types/ticket";

export function Tickets() {
  const [upcomingEvents, setUpcomingEvents] = useState<ITicketWithEvent[]>([]);
  const [expiredEvents, setExpiredEvents] = useState<ITicketWithEvent[]>([]);
  const [cancelledEvents, setCancelledEvents] = useState<ITicketWithEvent[]>(
    [],
  );

  const {
    data: tickets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });

  useEffect(() => {
    async function checkTicketDates() {
      try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const expiredEventsArray = [];
        const upcomingEventsArray = [];
        const cancelledEventsArray = [];

        for (const ticket of tickets) {
          const ticketEvent = await fetchEventByID(ticket.eventID);
          const ticketEventDate = new Date(ticketEvent.date);
          if (ticketEventDate > currentDate && !ticket.isCancelled) {
            upcomingEventsArray.push(ticket);
          } else if (ticketEventDate < currentDate && !ticket.isCancelled) {
            expiredEventsArray.push(ticket);
          }
          if (ticket.isCancelled) {
            cancelledEventsArray.push(ticket);
          }
        }
        setExpiredEvents(expiredEventsArray);
        setUpcomingEvents(upcomingEventsArray);
        setCancelledEvents(cancelledEventsArray);
      } catch (error) {
        console.error(error);
      }
    }
    checkTicketDates();
  }, [tickets]);
  if (isLoading) return <h2>Загрузка ваших билетов...</h2>;
  if (isError) return <h2 style={{ color: "red" }}>Ошибка загрузки билетов</h2>;

  const ticketTabs = [
    {
      tabName: "Предстоящие",
      tabValue: "upcoming",
      id: 1,
      content: <TicketList tickets={upcomingEvents} />,
    },
    {
      tabName: "Прошедшие",
      tabValue: "expired",
      id: 2,
      content: <TicketList tickets={expiredEvents} />,
    },
    {
      tabName: "Отмененные",
      tabValue: "cancelled",
      id: 3,
      content: <TicketList tickets={cancelledEvents} />,
    },
  ];
  return (
    <div className="tickets">
      <div className="container-wrapper">
        <h1>Мои билеты</h1>
        <Tabs tabs={ticketTabs} />
      </div>
    </div>
  );
}
