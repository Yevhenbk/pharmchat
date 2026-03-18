import React from "react";
import { AnimationTransforms } from "@/utilities/animations";
import sharedStyles from "../shared.module.scss";
import styles from "./slide-3.module.scss";

interface Slide3Props {
  by: number;
}

export function Slide3({ by }: Slide3Props) {
  const showCross = by > 0.8;

  return (
    <div className={`${sharedStyles.slide} ${sharedStyles.slideGreen}`}>
      <div
        className={styles.s4hero}
        style={{ transform: `scale(${AnimationTransforms.scale(7, by, 1)})` }}
      >
        <span className={styles.s4word}>STOP</span>
        <span className={styles.s4emphasis}>
          MANUAL
          <svg
            className={styles.s4svg}
            viewBox="0 0 240 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            {showCross && (
              <line
                x1="0"
                y1="30"
                x2="240"
                y2="30"
                stroke="#fff"
                strokeWidth="7"
                className={styles.cross1}
              />
            )}
          </svg>
        </span>
        <span className={styles.s4word}>PROCUREMENT</span>
      </div>
    </div>
  );
}
