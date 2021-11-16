import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { Layout } from "../../layout/layout";
import { AccordionBody } from "../accordion-body";
import { Accordion, AccordionProps } from "./component";

function getRequiredProps(): AccordionProps {
  return {
    items: [
      {
        header: {
          title: "What is TwitchCon?",
          description: "A gathering of awesome people.",
          imageProps: {
            src:
              "https://static-cdn.jtvnw.net/cb-achievements-assets/badge_what-is-thy-bidding-3x.png",
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
          title: "When and where is TwitchCon?",
          description: "Somewhere in a galaxy far away.",
          imageProps: {
            src:
              "https://static-cdn.jtvnw.net/cb-achievements-assets/badge_like-clockwork-3x.png",
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
            src:
              "https://static-cdn.jtvnw.net/cb-achievements-assets/badge_talk-to-me-3x.png",
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
    ],
  };
}

const setupShallow = setupShallowTest(Accordion, getRequiredProps);

describe("Accordion", () => {
  it("renders Accordion component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("starts with the first item open by default", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find(AccordionBody).at(0)).toHaveProp("isOpen", true);
    expect(wrapper.find(AccordionBody).at(1)).toHaveProp("isOpen", false);
    expect(wrapper.find(AccordionBody).at(2)).toHaveProp("isOpen", false);
  });

  it("starts with the second item open when initial index is set", () => {
    const { wrapper } = setupShallow({ initialOpenIndex: 1 });
    expect(wrapper.find(AccordionBody).at(0)).toHaveProp("isOpen", false);
    expect(wrapper.find(AccordionBody).at(1)).toHaveProp("isOpen", true);
    expect(wrapper.find(AccordionBody).at(2)).toHaveProp("isOpen", false);
  });

  it("starts with no items open when configured to do so", () => {
    const { wrapper } = setupShallow({ initialOpenIndex: false });
    expect(wrapper.find(AccordionBody).at(0)).toHaveProp("isOpen", false);
    expect(wrapper.find(AccordionBody).at(1)).toHaveProp("isOpen", false);
    expect(wrapper.find(AccordionBody).at(2)).toHaveProp("isOpen", false);
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(
      <Accordion aria-atomic={true} {...getRequiredProps()} />,
    );
    const element = wrapper.find(Layout).first();
    expect(element.prop("aria-atomic")).toBe(true);
  });

  // TODO: Test that clicking each header correctly collapses and expands each region
});
