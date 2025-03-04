import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import { Select } from "@features/ui";
import { Input } from "@features/ui/";
import { IOption } from "@features/ui/";
import classNames from "classnames";
import { useDebounceQuery } from "@features/ui/";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const status = String(router.query.status || "");
  const level = String(router.query.level || "");
  const project =
    typeof router.query.project === "string" ? router.query.project : "";
  const navigateToPage = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const { url, handleChange } = useDebounceQuery("project");

  const issuesPage = useGetIssues(page, status, level, project);
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  const issueStatusSelections = [
    { value: "", label: "Status" },
    { value: "open", label: "Open" },
    { value: "resolved", label: "Resolved" },
  ];

  const levelSelections = [
    { value: "", label: "Level" },
    { value: "error", label: "Error" },
    { value: "warning", label: "Warning" },
    { value: "info", label: "Info" },
  ];

  const currentStatus =
    issueStatusSelections.find((option) => option.value === status) ||
    issueStatusSelections[0];

  const currentLevel =
    levelSelections.find((option) => option.value === level) ||
    levelSelections[0];

  function setSelectedStatus(option: IOption) {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, status: option.value },
    });
  }

  function setSelectedLevel(option: IOption) {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, level: option.value },
    });
  }

  return (
    <div>
      <div className={classNames(styles.queries)}>
        <Select
          options={issueStatusSelections}
          onChange={(option) => {
            setSelectedStatus(option);
          }}
          value={currentStatus}
        />
        <Select
          options={levelSelections}
          onChange={(option) => setSelectedLevel(option)}
          value={currentLevel}
        />
        <Input
          placeholder="Project Name"
          onChange={(e) => handleChange(e.target.value)}
          value={url}
        />
      </div>
      <div className={styles.container}>
        <table
          className={styles.table}
          key={`issues-table-${items?.length || 0}`}
        >
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Issue</th>
              <th className={styles.headerCell}>Status</th>
              <th className={styles.headerCell}>Events</th>
              <th className={styles.headerCell}>Users</th>
            </tr>
          </thead>
          <tbody>
            {(items || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page + 1)}
              disabled={page === meta?.totalPages}
            >
              Next
            </button>
          </div>
          <div className={styles.pageInfo}>
            Page <span className={styles.pageNumber}>{meta?.currentPage}</span>{" "}
            of <span className={styles.pageNumber}>{meta?.totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
