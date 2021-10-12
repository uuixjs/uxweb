import * as React from "react";

import { BoxArtCard, Column, Grid, ThumbnailCard } from "v2";

export default { title: "Legacy Cards" };

export const Cards = () => (
  <>
    <h3>Examples</h3>
    <Grid>
      <Column cols={2}>
        ThumbnailCard
        <ThumbnailCard
          title="H3 Podcast - Post Malone"
          alt="H3 Podcast - Post Malone"
          info="26,726 viewers on h3h3productions"
          src="https://vod-storyboards.twitch.tv/97930731b0ec31b76805_h3h3productions_26094764368_699592964/storyboards/169526220-strip-0.jpg"
        />
      </Column>

      <Column cols={2}>
        BoxArtCard
        <BoxArtCard
          title="PLAYERUNKNOWN'S BATTLEGROUNDS"
          alt="PLAYERUNKNOWN'S BATTLEGROUNDS"
          info="52,607 viewers"
          src="https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-285x380.jpg"
        />
      </Column>
    </Grid>
    <h3>As Links</h3>
    <Grid>
      <Column cols={2}>
        ThumbnailCard - Link
        <ThumbnailCard
          linkTo="https://twitch.tv"
          title="H3 Podcast - Post Malone"
          alt="H3 Podcast - Post Malone"
          info="26,726 viewers on h3h3productions"
          src="https://vod-storyboards.twitch.tv/97930731b0ec31b76805_h3h3productions_26094764368_699592964/storyboards/169526220-strip-0.jpg"
        />
      </Column>
      <Column cols={2}>
        BoxArtCard - Link
        <BoxArtCard
          linkTo="https://twitch.tv"
          title="PLAYERUNKNOWN'S BATTLEGROUNDS"
          alt="PLAYERUNKNOWN'S BATTLEGROUNDS"
          info="52,607 viewers"
          src="https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-285x380.jpg"
        />
      </Column>
      <Column cols={2}>
        BoxArtCard - Link Disabled
        <BoxArtCard
          linkTo="https://twitch.tv"
          title="PLAYERUNKNOWN'S BATTLEGROUNDS"
          alt="PLAYERUNKNOWN'S BATTLEGROUNDS"
          info="52,607 viewers"
          src="https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-285x380.jpg"
          disabled
        />
      </Column>
      <Column cols={2}>
        BoxArtCard - Link Unavailable
        <BoxArtCard
          linkTo="https://twitch.tv"
          title="PLAYERUNKNOWN'S BATTLEGROUNDS"
          alt="PLAYERUNKNOWN'S BATTLEGROUNDS"
          info="52,607 viewers"
          src="https://static-cdn.jtvnw.net/ttv-boxart/PLAYERUNKNOWN%27S%20BATTLEGROUNDS-285x380.jpg"
          unavailable
        />
      </Column>
    </Grid>
  </>
);
