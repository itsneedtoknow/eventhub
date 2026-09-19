import { useParams, Link } from "react-router";
import { BASE_URL } from "../HomePage/Home";
import { useEffect, useState } from "react";
import styles from "./Event.module.css";
import { UseFavClickHandler } from "../../api/events";
import { useQueryClient } from "@tanstack/react-query";
import type { IEvent } from "../../types/event";
import { formatDate, formatDuration } from "../../utils/dateFormatter";
import { Tabs } from "../../components/Tabs";
import type { ITabItem } from "../../types/tab";

export function Event() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<IEvent | null>(null);
  //const [activeTab, setActiveTab] = useState<"about" | "location">("about");
  const queryClient = useQueryClient();

  async function detailFavClickHandler() {
    if (!event) return;
    try {
      await UseFavClickHandler(event, queryClient);
      setEvent((prevEvent) => {
        return prevEvent ? { ...prevEvent, isFav: !prevEvent.isFav } : null;
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    } catch (e) {
      console.error("Ошибка при обновлении статуса избранного:", e);
    }
  }
  useEffect(() => {
    if (!id) return;
    async function fetchEventDetails(eventId: number) {
      try {
        const itemData = await fetch(`${BASE_URL}/${eventId}`);
        if (!itemData.ok) {
          throw new Error("Ошибка сети");
        }
        const data = await itemData.json();
        setEvent(data);
      } catch (error) {
        console.error("Не удалось загрузить мероприятие:", error);
      }
    }
    fetchEventDetails(Number(id));
  }, [id]);

  if (!event) {
    return <div className={styles.loading}>Загрузка мероприятия...</div>;
  }
  const formattedDate = formatDate(event.date);
  const formattedDuration = formatDuration(event.durationInMinutes);

  const eventTabs: ITabItem[] = [
    {
      tabName: "О мероприятии",
      tabValue: "about",
      id: 1,
      content: (
        <div className={styles.aboutText}>
          <p>{event?.description}</p>
          <div className={styles.metaInfoRow}>
            {event.ageLimit && <span>👶 Возраст: {event.ageLimit}</span>}
            {formattedDuration && (
              <span>⏱ Длительность: {formattedDuration}</span>
            )}
          </div>
        </div>
      ),
    },

    {
      tabName: "Место проведения",
      tabValue: "place",
      id: 2,
      content: (
        <div className={styles.locationContent}>
          <p>📍 {event.place.text}</p>
          <Link to={event.place.mapLink} target="_blank">
            {event.place.address}
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        Главная / Мероприятия /{" "}
        <span className={styles.currentCrumb}>{event.title}</span>
      </nav>

      <h1 className={styles.mainTitle}>{event.title}</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.imageWrapper}>
            <img
              src={
                event.img ||
                "https://mechanic-market32.ru/upload/iblock/38f/oespg16je9348uaf79suvf85youbhpaq.jpg"
              }
              alt={event.title}
              className={styles.eventImage}
            />
          </div>
          <Tabs tabs={eventTabs} />
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.ticketCard}>
            <div className={styles.infoGroup}>
              <div className={styles.infoIcon}>📅</div>
              <div>
                <div className={styles.infoValue}>{`${formattedDate}`}</div>
                <div className={styles.infoLabel}>{event.time}</div>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <div className={styles.infoValue}>{event.place.text}</div>
              </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Цена</span>
              <span className={styles.priceValue}>
                {Object.keys(event.price).length !== 0 &&
                event.price.minPrice !== 0
                  ? `от ${event.price.minPrice} BYN`
                  : "Бесплатно"}
              </span>
            </div>

            <button className={styles.buyButton}>Купить билет</button>

            <button
              className={`${styles.favoriteButton} ${event.isFav ? styles.favorited : ""}`}
              onClick={detailFavClickHandler}
            >
              {event.isFav ? "❤️ В избранном" : "🤍 В избранное"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
