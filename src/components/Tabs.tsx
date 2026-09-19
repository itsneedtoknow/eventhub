import styles from "./Tabs.module.css";
import { useState } from "react";
import type { ITabItem } from "../types/tab";

interface TabsProps {
  tabs: ITabItem[];
}
export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].tabValue);
  {
    return (
      <div className={styles.tabs}>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabsHeader}>
            {tabs.map((item) => {
              return (
                <button
                  key={item.id}
                  className={`${styles.tabButton} ${activeTab === item.tabValue ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(item.tabValue)}
                >
                  {item.tabName}
                </button>
              );
            })}
          </div>

          <div className={styles.tabContent}>
            {tabs.map((item) => {
              if (activeTab === item.tabValue) {
                return item.content;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}
