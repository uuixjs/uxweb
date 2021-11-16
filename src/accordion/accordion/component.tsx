import { AccordionBody, AccordionBodyProps } from "../accordion-body";
import { AccordionFooter, AccordionFooterProps } from "../accordion-footer";
import { AccordionHeader, AccordionHeaderProps } from "../accordion-header";
import { BorderRadius, getAriaProps } from "@uuixjs/uuixweb-lib";
import { BorderRadiusProps, Layout } from "../../layout";
import { Component, MouseEvent } from "react";

export type AccordionItem = {
  header: AccordionHeaderProps;
  body: AccordionBodyProps;
  footer?: AccordionFooterProps;
};

export interface AccordionProps {
  items: AccordionItem[];
  initialOpenIndex?: number | false;
}

export interface AccordionState {
  currentOpenIndex: number | false;
}

/**
 * Accordion is used to consistently compose and control some accordion items
 * which will each be composed of an AccordionHeader, AccordionBody, and AccordionFooter
 */
export class Accordion extends Component<AccordionProps, AccordionState> {
  public state: AccordionState = {
    currentOpenIndex:
      this.props.initialOpenIndex !== undefined
        ? this.props.initialOpenIndex
        : 0,
  };

  public render() {
    return (
      <Layout {...getAriaProps(this.props)}>
        {this.props.items.map((item, index) => (
          <Layout
            borderBottom={index !== this.props.items.length - 1}
            key={index}
          >
            <AccordionHeader
              {...item.header}
              isOpen={index === this.state.currentOpenIndex}
              onClick={this.onHeaderClick}
              index={index}
              borderRadius={this.getHeaderBorderRadius(index)}
            />

            <AccordionBody
              {...item.body}
              isOpen={index === this.state.currentOpenIndex}
              borderRadius={this.getBodyBorderRadius(index)}
            >
              {item.body.children}
              {item.footer && <AccordionFooter {...item.footer} />}
            </AccordionBody>
          </Layout>
        ))}
      </Layout>
    );
  }

  private onHeaderClick = (_EVENT: MouseEvent<HTMLElement>, index?: number) => {
    if (typeof index === "number") {
      this.setState((prevState) => ({
        currentOpenIndex: prevState.currentOpenIndex === index ? false : index,
      }));
    }
  };

  private getHeaderBorderRadius = (
    index: number,
  ): BorderRadiusProps | undefined => {
    const corners: BorderRadiusProps = {};

    if (index === 0) {
      corners.topLeft = BorderRadius.Medium;
      corners.topRight = BorderRadius.Medium;
    }

    if (
      index === this.props.items.length - 1 &&
      this.state.currentOpenIndex !== index
    ) {
      corners.bottomLeft = BorderRadius.Medium;
      corners.bottomRight = BorderRadius.Medium;
    }

    return corners;
  };

  private getBodyBorderRadius = (
    index: number,
  ): BorderRadiusProps | undefined => {
    if (index === this.props.items.length - 1) {
      return {
        bottomLeft: BorderRadius.Medium,
        bottomRight: BorderRadius.Medium,
      };
    }

    return undefined;
  };
}
