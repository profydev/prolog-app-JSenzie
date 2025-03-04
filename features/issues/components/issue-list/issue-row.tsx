"use client";
import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";
import { useEffect, useState } from "react";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];
  const [windowSize, setWindowWidth] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Set the initial window size on mount
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop version
  if (windowSize >= 1024) {
    return (
      <tr className={styles.row}>
        <td className={styles.issueCell}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.languageIcon}
            src={`/icons/${projectLanguage}.svg`}
            alt={projectLanguage}
          />
          <div>
            <div className={styles.errorTypeAndMessage}>
              <span className={styles.errorType}>{name}:&nbsp;</span>
              {message}
            </div>
            <div>{firstLineOfStackTrace}</div>
          </div>
        </td>

        <td className={styles.cell}>
          <Badge color={levelColors[level]} size={BadgeSize.sm}>
            {capitalize(level)}
          </Badge>
        </td>
        <td className={styles.cell}>{numEvents}</td>
        <td className={styles.cell}>{numUsers}</td>
      </tr>
    );
  }

  return (
    <tr className={styles.row}>
      <td className={styles.mobileTd} colSpan={4}>
        <div className={styles.mobileCell}>
          <div className={styles.issueCell}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.languageIcon}
              src={`/icons/${projectLanguage}.svg`}
              alt={projectLanguage}
            />
            <div>
              <div className={styles.errorTypeAndMessage}>
                <span className={styles.errorType}>{name}:&nbsp;</span>
                {message}
              </div>
              <div>{firstLineOfStackTrace}</div>
            </div>
          </div>
          <div className={styles.datas}>
            <div className={styles.dataItem}>
              <div>Status</div>
              <div>
                <Badge color={levelColors[level]} size={BadgeSize.sm}>
                  {capitalize(level)}
                </Badge>
              </div>
            </div>
            <div className={styles.dataItem}>
              <div>Events</div>
              {numEvents}
            </div>
            <div className={styles.dataItem}>
              <div>Users</div>
              {numUsers}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
