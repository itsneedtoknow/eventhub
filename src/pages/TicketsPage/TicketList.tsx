import { TicketCard } from "./TicketCard";

import type { ITicket } from "../../types/ticket";
import styles from "./TicketList.module.css";
interface TicketListProps {
  tickets: ITicket[];
}
export function TicketList({ tickets }: TicketListProps) {
  // if (isLoading) return <h2>Загрузка ваших билетов...</h2>;
  // if (isError) return <h2 style={{ color: "red" }}>Ошибка загрузки билетов</h2>;

  return (
    <div className={styles.ticketsWrapper}>
      {tickets.map((ticket: ITicket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
