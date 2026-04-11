import * as React from "react";
import { DashboardGrid } from "./DashboardGrid";

export const DashboardGridExample: React.FC = () => (
  <DashboardGrid>
    <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded">Widget 1</div>
    <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded">Widget 2</div>
    <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded">Widget 3</div>
    <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded">Widget 4</div>
  </DashboardGrid>
);