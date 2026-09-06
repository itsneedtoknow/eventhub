import styles from "./Header.module.css";
import { NavLink } from "react-router";
import { Navigation } from "./Navigation";
import navStyles from "./Navigation.module.css";
import { SearchForm } from "./SearchForm";
interface IHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}
export function Header({ onSearchChange, searchQuery }: IHeaderProps) {
  return (
    <header className={styles.header}>
      <div className="container-wrapper">
        <div className={styles.headerWrapper}>
          <NavLink to="/" className={styles.logo}>
            💜 EventHub
          </NavLink>
          <SearchForm
            onSearchChange={onSearchChange}
            searchQuery={searchQuery}
          />
          <Navigation
            navItems={[
              {
                link: "/tickets",
                value: "Мои билеты",
                title: "Мои билеты",
                id: 1,
              },
              {
                link: "/favorites",
                value: (
                  <>
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
                    </svg>{" "}
                    Избранное
                  </>
                ),
                title: "Избранное",
                classNameCustom: navStyles.favoritesLink,
                id: 2,
              },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
