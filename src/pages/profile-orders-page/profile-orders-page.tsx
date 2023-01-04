import classNames from "classnames";
import { ProfilePageWrapper } from "../../components/profile-page-wrapper/profile-page-wrapper";
import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import { profileOrdersHistoryMock } from "../../mocks/profile-orders-history.mock";
import { OrderHistoryItem } from "../../components/order-history-item/order-history-item";
import styles from "./profile-orders-page.module.css";

export const ProfileOrdersPage = () => {
  return (
    <ProfilePageWrapper
      isContentFillWidth
      pageDescription={"В этом разделе вы можете просмотреть свою историю заказов"}
      navigation={<ProfileNavigation />}
      content={
        <article className={classNames(styles.root, "mt-10")}>
          {profileOrdersHistoryMock.map((item) => (
            <OrderHistoryItem item={item} key={item.id} />
          ))}
        </article>
      }
    />
  );
};
