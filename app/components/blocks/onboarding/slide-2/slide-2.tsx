import React from "react";
import { AnimationTransforms } from "@/utilities/animations";
import sharedStyles from "../shared.module.scss";
import styles from "./slide-2.module.scss";

interface Slide2Props {
  by: number;
}

export function Slide2({ by }: Slide2Props) {
  const op = AnimationTransforms.opacity(by);
  const tx = AnimationTransforms.x(-100, by, 100, 0.2);
  const ty = AnimationTransforms.y(100, by, 100, 0.2);

  return (
    <div className={`${sharedStyles.slide} ${sharedStyles.slideDark}`}>
      <div className={styles.s3wrap}>
        <div className={styles.s3left}>
          <div className={styles.s3progress} />
          <div
            className={styles.s3textLeft}
            style={
              {
                opacity: op,
                "--tx": `${tx}vh`,
                "--ty": `${ty}vh`,
              } as React.CSSProperties
            }
          >
            The new standard for pharmacy procurement.
            <br />
            The change is here.
          </div>
        </div>

        <div className={styles.s3right}>
          <div
            className={styles.s3textRight}
            style={
              {
                opacity: op,
                "--tx": `${tx}vh`,
                "--ty": `${ty}vh`,
              } as React.CSSProperties
            }
          >
            <span className={styles.s3stressed}>
              The old way is slow, error-prone, and painfully manual. That&apos;s
              about to end.{" "}
            </span>
            <br />
            Pharmchat parses supplier emails with AI, generates purchase orders
            from your formulary, and surfaces FDA drug shortage risks — all in
            one workspace.
          </div>
          <div className={styles.s3progressRight} />
        </div>
      </div>
    </div>
  );
}
