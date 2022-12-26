import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import styles from "./profile-page.module.css";

export const ProfilePage = () => {
  return (
    <div className={styles.root}>
      <ProfileNavigation />
      <section>content</section>
    </div>
  );
};
