import styles from "./profile-page-wrapper.module.css";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  pageDescription: ReactNode;
  content: ReactNode;
};

export const ProfilePageWrapper = (props: Props) => {
  const { pageDescription, content } = props;

  return (
    <div className={styles.root}>
      <aside className={styles.aside}>
        <ProfileNavigation />
        <p className={classNames(styles.description, "text", "text_type_main-default", "text_color_inactive")}>
          {pageDescription}
        </p>
      </aside>

      <section>{content}</section>
    </div>
  );
};
