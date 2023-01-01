import styles from "./profile-page-wrapper.module.css";
import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  pageDescription: ReactNode;
  content: ReactNode;
  navigation: ReactNode;
  isContentFillWidth?: boolean;
};

export const ProfilePageWrapper = (props: Props) => {
  const { pageDescription, content, navigation, isContentFillWidth } = props;

  return (
    <div className={styles.root}>
      <aside className={styles.aside}>
        {navigation}
        <p className={classNames(styles.description, "text", "text_type_main-default", "text_color_inactive")}>
          {pageDescription}
        </p>
      </aside>

      <section
        className={classNames({
          [styles.contentFullWidth]: isContentFillWidth,
        })}
      >
        {content}
      </section>
    </div>
  );
};
