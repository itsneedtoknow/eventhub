import { Link } from "react-router";
import type { IEvent } from "../types/event";
import { Button } from "./Button";
import styles from "./EventCard.module.css";
interface IEventProps {
  item: IEvent;
  onClick: (item: IEvent) => void;
}
export function EventCard({ item, onClick }: IEventProps) {
  const isFavorite = item.isFav === true;
  function favClickHandler(e: React.MouseEvent) {
    e.preventDefault();
    onClick(item);
  }
  if (!item) {
    return null;
  }
  return (
    <>
      <article className={styles.card} key={item.id}>
        <Link to={`events/${item.id}`} className={styles.imageContainer}>
          {item.img && (
            <img
              src={item.img}
              alt={item.title}
              className={styles.image}
              loading="lazy"
            />
          )}
          {!item.img && (
            <img
              src="https://mechanic-market32.ru/upload/iblock/38f/oespg16je9348uaf79suvf85youbhpaq.jpg"
              alt={item.title}
              className={styles.image}
              loading="lazy"
            />
          )}
          <span className={styles.ageLimit}>{item.ageLimit}+</span>

          <Button
            type="button"
            className={`${styles.favBtn} ${isFavorite ? styles.activeFav : ""}`}
            title={`${isFavorite ? "Убрать из избранного" : "Добавить в избранное"}`}
            children={
              <svg
                xmlns="http://w3.org"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            }
            onClick={favClickHandler}
          />
        </Link>

        <div className={styles.content}>
          <Link to={`events/${item.id}`} className={styles.category}>
            {item.category.text}
          </Link>
          <Link to={`events/${item.id}`}>
            <h3 className={styles.title}>{item.title}</h3>
          </Link>
          <p className={styles.description}>{item.description}</p>

          {/* Нижняя часть с датой, местом и ценой */}
          <div className={styles.footer}>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                📅 {item.date} ({item.duration})
              </div>
              <div className={styles.infoItem}>📍 {item.place.text}</div>
            </div>
            <div className={styles.price}>
              {!item.price ||
              Object.keys(item.price).length === 0 ||
              item.price.minPrice === 0
                ? "Бесплатно"
                : `${item.price.minPrice} BYN`}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
