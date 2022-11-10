import React from "react";
import styles from "./burger-constructor-skeleton.module.css";
import { Skeleton } from "../../skeleton";

export const BurgerConstructorSkeleton = () => {
  return (
    <div className={styles.root}>
      <Skeleton height={80} borderRadius={80} />
      <Skeleton height={80} borderRadius={80} />
      <Skeleton height={80} borderRadius={80} />
      <Skeleton height={80} borderRadius={80} />
      <Skeleton height={80} borderRadius={80} />
      <Skeleton height={80} borderRadius={80} />
    </div>
  );
};
