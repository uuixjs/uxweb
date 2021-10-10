import * as React from "react";

import { Accordion, AccordionHeaderSize } from "v2";
import { ExampleAvatars, ExampleBoxArt, ExampleThumbnails } from "../assets";

export default { title: "Accordion" };

export const singleItem = () => (
  <Accordion
    items={[
      {
        header: {
          title: "What is TwitchCon?",
          description: "A gathering of awesome people.",
          imageProps: {
            src: ExampleBoxArt.zelda,
            alt: "",
          },
        },
        body: {
          children:
            "Great first question! TwitchCon is a celebration of all things Twitch, from the streamers and their communities, to the developers who make the games we love. At TwitchCon, we all gather to learn and play together.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
    ]}
  />
);

export const multipleItems = () => (
  <Accordion
    items={[
      {
        header: {
          title: "What is TwitchCon?",
          description: "A gathering of awesome people.",
          imageProps: {
            src: ExampleAvatars.lillypichu,
            alt: "",
          },
        },
        body: {
          children:
            "Great first question! TwitchCon is a celebration of all things Twitch, from the streamers and their communities, to the developers who make the games we love. At TwitchCon, we all gather to learn and play together.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
      {
        header: {
          title:
            "When and where is TwitchCon? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nunc vitae diam molestie convallis eu vel purus. ",
          description: "Somewhere in a galaxy far away.",
          imageLabelOverlay: "$100",
          imageProps: {
            src: ExampleAvatars.disguisedtoast,
            alt: "",
          },
        },
        body: {
          children:
            "TwitchCon is being held October 20-22 at the Long Beach Convention and Entertainment Center in Long Beach, California. Long Beach Convention and Entertainment Center 300 E Ocean Blvd. Long Beach, CA 90802 See sidebar for detailed hours, parking info and developer day.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
      {
        header: {
          title: "What can I do at TwitchCon?",
          description: "All sorts of fun things.",
          imageProps: {
            src: ExampleAvatars.drlupo,
            alt: "",
          },
          backgroundImageProps: {
            src: ExampleThumbnails.stream1,
            alt: "",
          },
        },
        body: {
          children:
            "A lot! In addition to some new surprises for 2017, you can expect many activities that have become TwitchCon staples, only bigger and better. From streamer meet & greets to learning how to improve your stream, to intense gaming competitions, and hands on demos of the latest games, everything and anything Twitch is being featured at the show.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
      {
        header: {
          title: "Where is the TwitchCon after party?",
          imageProps: {
            src: ExampleAvatars.lirik,
            alt: "",
          },
          backgroundImageProps: {
            src: ExampleThumbnails.stream2,
            alt: "",
          },
        },
        body: {
          children:
            "A lot! In addition to some new surprises for 2017, you can expect many activities that have become TwitchCon staples, only bigger and better. From streamer meet & greets to learning how to improve your stream, to intense gaming competitions, and hands on demos of the latest games, everything and anything Twitch is being featured at the show.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
    ]}
  />
);

export const narrowHeader = () => (
  <Accordion
    items={[
      {
        header: {
          size: AccordionHeaderSize.Narrow,
          title: "What is TwitchCon?",
        },
        body: {
          children:
            "Great first question! TwitchCon is a celebration of all things Twitch, from the streamers and their communities, to the developers who make the games we love. At TwitchCon, we all gather to learn and play together.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
      {
        header: {
          size: AccordionHeaderSize.Narrow,
          title: "When and where is TwitchCon?",
        },
        body: {
          children:
            "TwitchCon is being held October 20-22 at the Long Beach Convention and Entertainment Center in Long Beach, California. Long Beach Convention and Entertainment Center 300 E Ocean Blvd. Long Beach, CA 90802 See sidebar for detailed hours, parking info and developer day.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
      {
        header: {
          title: "What can I do at TwitchCon?",
          size: AccordionHeaderSize.Narrow,
        },
        body: {
          children:
            "A lot! In addition to some new surprises for 2017, you can expect many activities that have become TwitchCon staples, only bigger and better. From streamer meet & greets to learning how to improve your stream, to intense gaming competitions, and hands on demos of the latest games, everything and anything Twitch is being featured at the show.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
      {
        header: {
          title:
            "Where is the TwitchCon after party? Here is a lot of text to make it seem like the question in the header is very long, so that we can see what happens to the text.",
          size: AccordionHeaderSize.Narrow,
        },
        body: {
          children:
            "A lot! In addition to some new surprises for 2017, you can expect many activities that have become TwitchCon staples, only bigger and better. From streamer meet & greets to learning how to improve your stream, to intense gaming competitions, and hands on demos of the latest games, everything and anything Twitch is being featured at the show.",
        },
        footer: {
          primaryButtonProps: {
            children: "Buy Tickets",
          },
          secondaryButtonProps: {
            children: "Learn More",
          },
        },
      },
    ]}
  />
);
