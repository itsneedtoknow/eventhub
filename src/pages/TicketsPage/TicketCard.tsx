import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./TicketCard.module.css";
import { fetchEventByID } from "../../api/tickets";
import { formatDate } from "../../utils/dateFormatter";
import { Link } from "react-router";
import type { ITicket } from "../../types/ticket";
import { Button } from "../../components/Button";
import { changeTicketCancelStatus } from "../../api/tickets";
import { createPortal } from "react-dom";
import { Modal } from "../../components/Modal";
import { useState } from "react";
interface TicketCardProp {
  ticket: ITicket;
}
export function TicketCard({ ticket }: TicketCardProp) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const {
    data: ticketEvent,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events", ticket.eventID],
    queryFn: () => fetchEventByID(ticket.eventID),
  });

  const mutation = useMutation({
    mutationFn: (ticketID: number) =>
      changeTicketCancelStatus(ticketID, !ticket.isCancelled),
    onSuccess: () => {
      setIsCancelModalOpen(false);
      if (ticket.isCancelled) {
        setIsReorderModalOpen(true);
      } else {
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
      }
    },
    onError: (err) => {
      console.error("Не удалось отменить билет:", err);
    },
  });
  if (isLoading) {
    return <div className={styles.ticket}>Загрузка мероприятия...</div>;
  }

  if (isError || !ticketEvent) {
    return <div className={styles.ticket}>Событие не найдено</div>;
  }

  const ticketDate = formatDate(ticketEvent.date);
  const ticketDateNumber = new Date(ticketEvent.date);
  const now = new Date();
  const isPassed = ticketDateNumber < now;

  function cancelBtnHandler(e: React.MouseEvent) {
    e.preventDefault();
    setIsCancelModalOpen(true);
  }

  function closeCancelModalHandler() {
    setIsCancelModalOpen(false);
  }
  function closeReorderModalHandler() {
    setIsReorderModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["tickets"] });
  }

  return (
    <>
      <article className={styles.ticket}>
        <div className={styles.eventDetails}>
          <div className={styles.ticketImage}>
            <Link to={`../events/${ticketEvent.id}`} relative="route">
              <img src={ticketEvent.img} alt="" />
            </Link>
          </div>
          <div className={styles.eventInfo}>
            <Link to={`../events/${ticketEvent.id}`} relative="route">
              <h3>{ticketEvent.title}</h3>
            </Link>
            <div>{ticketDate}</div>
            <div>{ticketEvent.place.address}</div>
          </div>
        </div>
        {ticket.seat && (
          <div className={styles.ticketInfo}>
            <div>
              {ticket.seat.sector ? `Сектор: ${ticket.seat.sector}` : ""}
            </div>
            <div> {ticket.seat.row ? `Ряд: ${ticket.seat.row}` : ""}</div>
            <div> {ticket.seat.seat ? `Место: ${ticket.seat.row}` : ""}</div>
          </div>
        )}
        <div className={styles.actionButtons}>
          <Link
            className={styles.eventLink}
            to={`../events/${ticketEvent.id}`}
            relative="route"
          >
            Подробнее
          </Link>
          {!ticket.isCancelled && !isPassed && (
            <Button
              children={"Отменить заказ"}
              className={styles.cancelButton}
              onClick={cancelBtnHandler}
              type="button"
              title="Отменить заказ"
            />
          )}
          {ticket.isCancelled && !isPassed && (
            <Button
              children={"Восстановить заказ"}
              className={styles.cancelButton}
              onClick={() => {
                mutation.mutate(ticket.id);
                //reorderSuccess();
              }}
              type="button"
              title="Восстановить заказ"
            />
          )}
        </div>
        {isCancelModalOpen &&
          createPortal(
            <Modal
              children={
                <div>
                  <p>Вы уверены, что хотите отменить билет?</p>
                  <div className={styles.actionButtons}>
                    <Button
                      children={"Да"}
                      onClick={() => mutation.mutate(ticket.id)}
                      type="button"
                      className={`btn`}
                    />
                    <Button
                      children={"Нет"}
                      onClick={() => setIsCancelModalOpen(false)}
                      type="button"
                      className={`btn btn--primary`}
                    />
                  </div>
                </div>
              }
              isOpen={isCancelModalOpen}
              onCloseModal={closeCancelModalHandler}
            />,
            document.body,
          )}
        {isReorderModalOpen &&
          createPortal(
            <Modal
              children={
                <div>
                  <p>Ваш билет будет перенесен в "Предстоящие"</p>
                </div>
              }
              isOpen={isReorderModalOpen}
              onCloseModal={closeReorderModalHandler}
            />,
            document.body,
          )}
        {/* </div> */}
      </article>
    </>
  );
}
