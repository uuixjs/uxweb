import * as React from "react";

import { InjectLayout, Layout, Overflow } from "v2";

import { FC } from "react";

/**
 * This file is mostly copied from the component in Twilight:
 * https://git.xarth.tv/twilight/twilight/blob/master/src/pages/channel/components/channel-shell/components/home-offline-hero/index.tsx
 */

export interface PublicProps {
  channelLogin: string;
  lines?: number;
}

export const ChannelNameBanner: FC<PublicProps> = ({
  channelLogin,
  lines,
}: PublicProps) => {
  const NEEDED_LENGTH = 150;
  const NEEDED_LINES = lines !== undefined ? lines : 4;

  const numberOfNames = Math.floor(NEEDED_LENGTH / channelLogin.length);
  const namesAsString = Array(numberOfNames).fill(channelLogin).join(" ");

  const nameLines = [];
  for (let idx = 0; idx < NEEDED_LINES; idx++) {
    nameLines.push(
      <Layout overflow={Overflow.Hidden} key={idx}>
        {wrapAtIndex(namesAsString, idx)}
      </Layout>,
    );
  }

  return (
    <InjectLayout overflow={Overflow.Hidden}>
      <div style={{ background: `var(--color-accent)` }}>
        <div
          style={{
            color: `var(--color-accent-label)`,
            opacity: 0.1,
            fontSize: "6rem",
            lineHeight: "5.5rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          {nameLines}
        </div>
      </div>
    </InjectLayout>
  );
};

function wrapAtIndex(str: string, index: number) {
  const wrapping = str.slice(0, index);

  return `${str.slice(index, str.length)}${wrapping}`;
}
