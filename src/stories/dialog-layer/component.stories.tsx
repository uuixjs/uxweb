import * as PopperJS from "@popperjs/core";
import * as React from "react";

import {
  AlignItems,
  Background,
  BalloonSize,
  Button,
  ButtonType,
  Color,
  Column,
  CoreDismissible,
  CoreText,
  DialogLayer,
  Display,
  DropDownMenuItem,
  DropDownMenuSeparator,
  DropDownMenuWrapper,
  Grid,
  InjectLayout,
  JustifyContent,
  Layout,
  Overflow,
  OverlayRegion,
  Position,
  Radio,
  SVGAsset,
  SelectButton,
  Tooltip,
  TransitionType,
  ZIndex,
  useDialogState,
} from "v2";
import { FC, useEffect, useRef, useState } from "react";

export default { title: "Dialogs / DialogLayer" };

export function Defaults() {
  const { anchorProps, dialogProps } = useDialogState();

  return (
    <>
      <SelectButton {...anchorProps}>Hello World</SelectButton>

      <DialogLayer {...dialogProps}>
        <ExampleMenuContent />
      </DialogLayer>
    </>
  );
}

export function ClickOutDisabled() {
  const { anchorProps, dialogProps } = useDialogState(true);

  return (
    <>
      <CoreText>
        This menu cannot be closed by clicking outside of the menu
      </CoreText>

      <SelectButton {...anchorProps}>Click to toggle dialog</SelectButton>

      <DialogLayer {...dialogProps} disableCloseOnClickOut>
        <ExampleMenuContent />
      </DialogLayer>
    </>
  );
}
export function MouseHoverTrigger() {
  const closeTimeout = useRef<number>();
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    clearTimeout(closeTimeout.current);
    setIsOpen(true);
  }

  function closeWithDelay() {
    clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 500);
  }

  function closeNow() {
    setIsOpen(false);
  }

  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Layout
        display={Display.InlineBlock}
        ref={triggerRef}
        onMouseEnter={open}
        onMouseLeave={closeWithDelay}
      >
        <SelectButton onClick={open}>Mouse over to toggle</SelectButton>
      </Layout>
      <DialogLayer
        anchorRef={triggerRef.current}
        show={isOpen}
        onRequestClose={closeNow}
      >
        <div onMouseEnter={open} onMouseLeave={closeWithDelay}>
          <ExampleMenuContent />
        </div>
      </DialogLayer>
    </>
  );
}

export function NoTransition() {
  const { anchorProps, dialogProps } = useDialogState();

  return (
    <>
      <SelectButton {...anchorProps}>Hello World</SelectButton>

      <DialogLayer transitionType={TransitionType.None} {...dialogProps}>
        <ExampleMenuContent />
      </DialogLayer>
    </>
  );
}

export function NonStandardChild() {
  const { anchorProps, dialogProps, close } = useDialogState();

  return (
    <>
      <SelectButton {...anchorProps}>Hello World</SelectButton>

      <DialogLayer {...dialogProps}>
        <div
          style={{
            width: "25rem",
            padding: "2rem",
            background: "#003db8",
            border: "3px solid #00e6cb",
            fontSize: "2rem",
            borderRadius: "1rem",
          }}
        >
          <OverlayRegion>
            <Layout display={Display.Flex} justifyContent={JustifyContent.End}>
              <CoreDismissible
                autoFocus
                aria-label="Close the Menu"
                onClick={close}
              />
            </Layout>
            This is an extremely non-standard menu!
            <Layout
              display={Display.Flex}
              justifyContent={JustifyContent.End}
              margin={{ top: 2 }}
            >
              <Layout margin={{ right: 1 }}>
                <Button variant={ButtonType.Secondary} onClick={close}>
                  Cancel
                </Button>
              </Layout>
              <Layout>
                <Button onClick={close}>Confirm</Button>
              </Layout>
            </Layout>
          </OverlayRegion>
        </div>
      </DialogLayer>
    </>
  );
}

export function OverflowConstraint() {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const options: Partial<PopperJS.Options> = {
    placement: "bottom-start",
    modifiers: [
      {
        name: "flip",
        enabled: true,
        options: {
          boundary: boundaryRef.current,
        },
      },
      {
        name: "hide",
        enabled: true,
      },
    ],
  };
  return (
    <InjectLayout
      padding={2}
      border
      background={Background.Alt}
      overflow={Overflow.Scroll}
    >
      <div style={{ width: "40rem", height: "23rem" }} ref={boundaryRef}>
        <Layout margin={{ x: 1, y: 3 }}>
          <CoreText color={Color.Alt2}>
            These menus will be contained within the scrollable overflow box.
          </CoreText>
        </Layout>
        <Grid>
          {new Array(12).fill(undefined).map((_, index) => (
            <Column cols={4} key={index}>
              <ButtonWithMenu
                options={options}
                disabled={
                  typeof openIndex === "number" ? openIndex !== index : false
                }
                onOpen={() => setOpenIndex(index)}
                onClose={() => setOpenIndex(null)}
              />
            </Column>
          ))}
        </Grid>
        <div style={{ height: "20rem", width: "100%" }} />
      </div>
    </InjectLayout>
  );
}

const ButtonWithMenu: FC<{
  disabled: boolean;
  onOpen: () => void;
  onClose: () => void;
  options: Partial<PopperJS.Options>;
}> = ({ disabled, onOpen, onClose, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    onOpen();
  }

  function closeModal() {
    setIsOpen(false);
    onClose();
  }

  function toggleModal() {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }

  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <InjectLayout margin={1} display={Display.InlineBlock}>
        <div ref={triggerRef}>
          <SelectButton onClick={toggleModal} disabled={disabled}>
            Menu
          </SelectButton>
        </div>
      </InjectLayout>
      <DialogLayer
        anchorRef={triggerRef.current}
        show={isOpen}
        onRequestClose={closeModal}
        options={options}
      >
        <DropDownMenuWrapper size={BalloonSize.Auto}>
          <div style={{ whiteSpace: "nowrap" }}>
            <DropDownMenuItem figure={{ icon: SVGAsset.Webcam }}>
              Watch Live Stream
            </DropDownMenuItem>
            <DropDownMenuItem figure={{ icon: SVGAsset.FollowHollow }}>
              Follow
            </DropDownMenuItem>
          </div>
        </DropDownMenuWrapper>
      </DialogLayer>
    </>
  );
};

export function LayoutAnchorUpdate() {
  const [justify, setJustify] = useState<JustifyContent>(JustifyContent.Start);

  const { dialogProps, anchorProps, popperRef } = useDialogState();

  // Update the popper position when we move the anchor
  useEffect(() => {
    if (popperRef.current && popperRef.current.update) {
      popperRef.current.update();
    }
  }, [justify, popperRef]);

  const myMenu = (
    <DialogLayer {...dialogProps} disableCloseOnClickOut>
      <DropDownMenuWrapper size={BalloonSize.Auto}>
        <DropDownMenuItem figure={{ icon: SVGAsset.Webcam }}>
          Watch Live Stream
        </DropDownMenuItem>
        <DropDownMenuItem figure={{ icon: SVGAsset.FollowHollow }}>
          Follow
        </DropDownMenuItem>
      </DropDownMenuWrapper>
    </DialogLayer>
  );

  return (
    <InjectLayout
      padding={2}
      border
      background={Background.Alt}
      overflow={Overflow.Scroll}
    >
      <div style={{ width: "40rem" }}>
        <CoreText>
          1. Open menu, 2. adjust position, 3. see menu follow
        </CoreText>

        <Layout margin={{ y: 2 }} display={Display.Flex}>
          <RadioOption
            label="Left"
            onSelect={() => setJustify(JustifyContent.Start)}
            defaultChecked
          />
          <RadioOption
            label="Center"
            onSelect={() => setJustify(JustifyContent.Center)}
          />
          <RadioOption
            label="Right"
            onSelect={() => setJustify(JustifyContent.End)}
          />
        </Layout>

        <Layout display={Display.Flex} justifyContent={justify}>
          <div style={{ display: "inline-block" }}>
            <SelectButton {...anchorProps}>Menu</SelectButton>
          </div>
        </Layout>

        {myMenu /* Doesn't really matter where this gets mounted */}
      </div>
    </InjectLayout>
  );
}

const RadioOption: FC<{
  label: string;
  onSelect: () => void;
  defaultChecked?: boolean;
}> = ({ label, onSelect, defaultChecked }) => (
  <Layout margin={{ right: 1 }}>
    <Radio
      name="menu-layout-mode"
      label={label}
      defaultChecked={defaultChecked}
      onChange={(e) => {
        if (e.currentTarget.checked) {
          onSelect();
        }
      }}
    />
  </Layout>
);

const ExampleMenuContent: FC = () => (
  <DropDownMenuWrapper>
    <DropDownMenuItem figure={{ icon: SVGAsset.Webcam }}>
      Watch Now
    </DropDownMenuItem>
    <DropDownMenuItem figure={{ icon: SVGAsset.FollowHollow }}>
      Follow
    </DropDownMenuItem>
    <DropDownMenuItem figure={{ icon: SVGAsset.StarHollow }}>
      Subscribe
    </DropDownMenuItem>
    <DropDownMenuSeparator />
    <DropDownMenuItem figure={{ icon: SVGAsset.Link }}>
      Copy Link
    </DropDownMenuItem>
    <Tooltip
      label="You can have a tooltip here too!"
      options={{ placement: "right" }}
    >
      <DropDownMenuItem figure={{ icon: SVGAsset.Share }}>
        Share (hover for tooltip)
      </DropDownMenuItem>
    </Tooltip>
  </DropDownMenuWrapper>
);

/**
 * This story tests when a dialog is rendered inside of an element which has a
 * positive z-index value set. This demonstrates that the dialog should still
 * appear in front of other elements which have a z-index defined.
 */
export function ZIndexBehavior() {
  const { anchorProps, dialogProps } = useDialogState();
  return (
    <Layout
      border
      background={Background.Alt}
      position={Position.Relative}
      zIndex={ZIndex.Above}
      style={{ height: "300px", width: "300px" }}
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
    >
      <SelectButton {...anchorProps}>A dialog should be visible</SelectButton>
      <DialogLayer {...dialogProps} show={true}>
        <DropDownMenuWrapper>
          If you can see this, it works!
        </DropDownMenuWrapper>
      </DialogLayer>
    </Layout>
  );
}
