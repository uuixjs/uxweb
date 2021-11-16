import { AlignItems, Display, Layout } from "../../layout";
import { Component, MouseEvent, MouseEventHandler } from "react";
import {
  PaginationControl,
  PaginationControlType,
} from "../pagination-control";

import { CoreInteractiveElement } from "../../core-interactive";
import { PaginationIndex } from "../pagination-index/index";
import { getAriaProps } from "lib";

// Extend the `MouseEVent` interface to accept an item to store
// the destination page of a pagination control. The event object with the
// destination page can then be passed back up to the parent.
export interface PaginationMouseEvent<T> extends MouseEvent<T> {
  goToPage: number;
}

export interface PaginationProps {
  /**
   * The currently viewed page.
   *
   * @example 1
   */
  currentPage: number;
  /**
   * The total number of pages.
   *
   * @example 10
   */
  totalPages: number;
  /**
   * Allow customization and/or translation of the `aria-label` on the
   * previous page button.
   *
   * @example Previous Page
   */
  previousPageButtonAriaLabel: string;
  /**
   * Allow customization and/or translation of the `aria-label` on the
   * next page button.
   *
   * @example Next Page
   */
  nextPageButtonAriaLabel: string;
  /**
   * Click handler for the "Previous" page control. Returns the number of
   * the page.
   */
  onClickPrevious?: MouseEventHandler<CoreInteractiveElement>;
  /**
   * Click handler for the "Next" page control. Returns the number of
   * the page.
   */
  onClickNext?: MouseEventHandler<CoreInteractiveElement>;
  /**
   * Click handler for the page number control. Returns the number of
   * the page. Returns an event object (`PaginationMouseEvent<HTMLDivElement>`).
   */
  onClickIndex?: MouseEventHandler<CoreInteractiveElement>;
}

export class Pagination extends Component<PaginationProps, {}> {
  public render() {
    return (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        {...getAriaProps(this.props)}
      >
        <PaginationControl
          aria-label={this.props.previousPageButtonAriaLabel}
          type={PaginationControlType.Previous}
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          onClick={this.handleClickPrevious}
          key="previous"
        />
        <PaginationIndex
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          onClick={this.props.onClickIndex}
        />
        <PaginationControl
          aria-label={this.props.nextPageButtonAriaLabel}
          type={PaginationControlType.Next}
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          onClick={this.handleClickNext}
          key="next"
        />
      </Layout>
    );
  }

  private handleClickPrevious = (
    e: PaginationMouseEvent<CoreInteractiveElement>,
  ) => {
    if (this.props.onClickPrevious) {
      e.goToPage = this.props.currentPage - 1;
      this.props.onClickPrevious(e);
    }
  };

  private handleClickNext = (
    e: PaginationMouseEvent<CoreInteractiveElement>,
  ) => {
    if (this.props.onClickNext) {
      e.goToPage = this.props.currentPage + 1;
      this.props.onClickNext(e);
    }
  };
}
