import { NavLink } from "react-router";
import styles from "./Navigation.module.css";
import type { ReactNode } from "react";

interface INavItem {
  link: string;
  value: ReactNode;
  title?: string;
  classNameCustom?: string;
  id: number;
}
interface NavigationProps {
  navItems: INavItem[];
}
export function Navigation({ navItems }: NavigationProps) {
  return (
    <>
      <nav className={styles.navigation}>
        {navItems.map((item) => {
          return (
            <NavLink
              to={item.link}
              key={item.id}
              className={({ isActive }) => {
                const baseClass = `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`;
                const customClass = item.classNameCustom
                  ? item.classNameCustom
                  : "";
                return `${baseClass} ${customClass}`.trim();
              }}
            >
              {item.value}
            </NavLink>
          );
        })}

        {/* <NavLink to="/tickets" className={getNavLinkClass}>
          Мои билеты
        </NavLink> */}

        {/* Кнопка Избранное */}
        {/* <NavLink
          to="/favorites"
          className={styles.favoritesBtn}
          title="Избранное"
        >
          <svg
            xmlns="http://w3.org"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </NavLink> */}
      </nav>
    </>
  );
}
