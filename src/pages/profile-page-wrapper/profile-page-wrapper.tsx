import styles from "./profile-page-wrapper.module.css";
import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  pageDescription: ReactNode;
  content: ReactNode;
  navigation: ReactNode;
};

export const ProfilePageWrapper = (props: Props) => {
  const { pageDescription, content, navigation } = props;

  return (
    <div className={styles.root}>
      <aside className={styles.aside}>
        {navigation}
        <p className={classNames(styles.description, "text", "text_type_main-default", "text_color_inactive")}>
          {pageDescription}
        </p>
      </aside>

      <section>{content}</section>
    </div>
  );
};
