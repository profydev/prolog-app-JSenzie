import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, error, isError } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingInner}>
          <img src="/icons/loading.svg" />
        </div>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className={styles.error}>
        <div className={styles.errorMessage}>
          <img src="/icons/error.svg" />
          <div>{error.message}</div>
        </div>
        <div className={styles.tryAgain}>
          Try Again
          <img src="/icons/arrow-right.svg" />
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
