import React from "react";
import styles from "./skeleton.module.css";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  display?: "block" | "inline-block";
};

export const Skeleton = ({
  width = "100%",
  height = "10px",
  borderRadius = "2px",
  display = "block",
}: SkeletonProps) => {
  const skeletonStyles = {
    width: typeof width === "string" ? width : `${width}px`,
    height: typeof height === "string" ? height : `${height}px`,
    borderRadius: typeof borderRadius === "string" ? borderRadius : `${borderRadius}px`,
    display,
  };
  return <div className={styles.skeleton} style={skeletonStyles} />;
};
