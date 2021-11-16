import { AlignItems, Display, Layout } from "../../layout";
import { Button, ButtonType } from "../../button/button";
import { Component, MouseEventHandler } from "react";

import { CoreInteractiveElement } from "../../core-interactive";
import { PaginationMouseEvent } from "../pagination";
import { getAriaProps } from "@uuixjs/uuixweb-lib";

export interface PaginationIndexProps {
  /**
   * Represents the current page of data.
   *
   * @example 1
   */
  currentPage: number;
  /**
   * Represents the total number of pages available from the dataset.
   *
   * @example 10
   */
  totalPages: number;
  /**
   * Event handler triggered when a page button is clicked. Returns an event
   * object (`PaginationMouseEvent<HTMLDivElement>`).
   */
  onClick?: MouseEventHandler<CoreInteractiveElement>;
}

export class PaginationIndex extends Component<PaginationIndexProps, {}> {
  public render() {
    const pageIndex: JSX.Element[] = [];

    pageIndex.push(this.renderIndexControl(1));

    if (this.props.totalPages <= 5) {
      for (let i = 2; i < this.props.totalPages + 1; i++) {
        pageIndex.push(this.renderIndexControl(i));
      }
    } else {
      if (this.props.currentPage < 3) {
        for (let i = 2; i < 4; i++) {
          pageIndex.push(this.renderIndexControl(i));
        }
        pageIndex.push(this.renderEllipsis("ellipsis-1"));
      }

      if (
        this.props.currentPage >= 3 &&
        this.props.currentPage < this.props.totalPages - 3
      ) {
        pageIndex.push(this.renderEllipsis("ellipsis-1"));
        for (
          let i = this.props.currentPage;
          i < this.props.currentPage + 3;
          i++
        ) {
          pageIndex.push(this.renderIndexControl(i));
        }
        pageIndex.push(this.renderEllipsis("ellipsis-2"));
      }

      if (this.props.currentPage >= this.props.totalPages - 3) {
        pageIndex.push(this.renderEllipsis("ellipsis-3"));
        for (
          let i = this.props.totalPages - 3;
          i < this.props.totalPages;
          i++
        ) {
          pageIndex.push(this.renderIndexControl(i));
        }
      }

      pageIndex.push(this.renderIndexControl(this.props.totalPages));
    }

    return (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        {...getAriaProps(this.props)}
      >
        {pageIndex}
      </Layout>
    );
  }

  private renderIndexControl = (page: number) => {
    return (
      <Button
        variant={ButtonType.Text}
        aria-label={page.toString()}
        onClick={this.handleClickIndex}
        disabled={page === this.props.currentPage}
        key={page}
      >
        {page}
      </Button>
    );
  };

  private renderEllipsis = (key: string) => {
    return (
      <Layout key={key} padding={{ x: 0.5 }}>
        ...
      </Layout>
    );
  };

  private handleClickIndex = (
    e: PaginationMouseEvent<CoreInteractiveElement>,
  ) => {
    if (this.props.onClick) {
      e.goToPage = parseInt(e.currentTarget.innerText, 0);
      this.props.onClick(e);
    }
  };
}
