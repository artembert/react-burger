import classNames from "classnames";
import { Skeleton } from "../../skeleton";
import { ProfilePageWrapper } from "../../profile-page-wrapper/profile-page-wrapper";
import styles from "./protected-router-plug.module.css";

const navigationPlaceholders = new Array(3).fill(undefined).map((_, index) => index);
const placeholders = new Array(3).fill(undefined).map((_, index) => index);

export const ProtectedRouterPlug = () => {
  return (
    <ProfilePageWrapper
      isContentFillWidth
      pageDescription=""
      navigation={
        <article className={classNames(styles.root)}>
          {navigationPlaceholders.map((id) => (
            <div key={id} className={"mt-10"}>
              <Skeleton height={32} borderRadius={40} />
            </div>
          ))}
        </article>
      }
      content={
        <article className={classNames("mt-30")}>
          {placeholders.map((id) => (
            <div key={id} className="mt-4">
              <Skeleton height={214} borderRadius={40} width={480} />
            </div>
          ))}
        </article>
      }
    />
  );
};
