import React from "react";
export interface ITabItem {
  tabName: string;
  tabValue: string;
  id: number;
  content: React.ReactNode;
}
