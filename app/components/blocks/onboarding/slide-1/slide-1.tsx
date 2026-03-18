import React from "react";
import { AnimationTransforms } from "@/utilities/animations";
import sharedStyles from "../shared.module.scss";
import styles from "./slide-1.module.scss";

interface Slide1Props {
  by: number;
}

export function Slide1({ by }: Slide1Props) {
  return (
    <div className={`${sharedStyles.slide} ${sharedStyles.slideGreen}`}>
      <div
        className={styles.s2text}
        style={{
          opacity: AnimationTransforms.opacity(by),
          transform: `translateY(${AnimationTransforms.y(10, by, 15)}vh)`,
        }}
      >
        Pharmchat
      </div>
    </div>
  );
}
