import * as React from "react";

import {
  AlignItems,
  Background,
  Button,
  CoreText,
  Display,
  FlexDirection,
  FormGroup,
  Input,
  InputType,
  JustifyContent,
  Layout,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayer,
  ModalSize,
  Placeholder,
  Position,
  Toggle,
  TransitionType,
  ZIndex,
} from "v2";
import { FC, PropsWithChildren, useState } from "react";

export default { title: "Modal / ModalLayer" };

export function FullscreenModalWithNestedModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // minHeight ensures screenshot diff makes the window tall enough to see the modal
    <div style={{ minHeight: "400px" }}>
      <Button onClick={() => setIsOpen(true)}>Open Fullscreen Modal</Button>

      <ModalLayer
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        transitionType={TransitionType.TranslateBottom}
      >
        <Layout
          background={Background.Base}
          style={{ width: "100%", height: "100%" }}
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
        >
          <ModalHeader
            title='"Fullscreen" Modal'
            closeButton={{
              "aria-label": "Close Modal",
              onClick: () => setIsOpen(false),
            }}
          />

          <ModalBody>
            This is a custom child presented inside a Modal Layer
            <Layout margin={{ top: 2 }}>
              <ModalBasicExample>Open another modal</ModalBasicExample>
            </Layout>
            <Layout margin={{ y: 5 }}>
              <Placeholder lineCount={5} />
            </Layout>
          </ModalBody>

          <ModalFooter
            primaryButtonProps={{
              children: "Close",
              onClick: () => setIsOpen(false),
            }}
            secondaryButtonProps={{
              children: "Cancel",
              onClick: () => setIsOpen(false),
            }}
          />
        </Layout>
      </ModalLayer>
    </div>
  );
}

export function HalfscreenCustomModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // minHeight ensures screenshot diff makes the window tall enough to see the modal
    <div style={{ minHeight: "400px" }}>
      <Button onClick={() => setIsOpen(true)}>Open Halfscreen Modal</Button>

      <ModalLayer
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        transitionType={TransitionType.TranslateRight}
      >
        <Layout
          background={Background.Base}
          position={Position.Absolute}
          attachTop
          attachRight
          style={{ width: "60vw", height: "100vh" }}
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
        >
          <ModalHeader
            title='"Halfscreen" Modal'
            closeButton={{
              "aria-label": "Close Modal",
              onClick: () => setIsOpen(false),
            }}
          />

          <ModalBody>
            This is a custom child presented inside a Modal Layer
            <Layout margin={{ y: 5 }}>
              <Placeholder lineCount={5} />
            </Layout>
          </ModalBody>

          <ModalFooter
            primaryButtonProps={{
              children: "Close",
              onClick: () => setIsOpen(false),
            }}
            secondaryButtonProps={{
              children: "Cancel",
              onClick: () => setIsOpen(false),
            }}
          />
        </Layout>
      </ModalLayer>
    </div>
  );
}

function ModalBasicExample({ children }: PropsWithChildren<{}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{children}</Button>

      <Modal
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        size={ModalSize.Small}
      >
        <SimpleModalContents closeModal={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

const SimpleModalContents: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => (
  <>
    <ModalHeader
      title="Example Modal"
      closeButton={{
        "aria-label": "Close Modal",
        onClick: closeModal,
      }}
    />
    <ModalBody>
      <FormGroup label="A Form Input">
        <Input type={InputType.Text} placeholder="Placeholder" />
      </FormGroup>

      <Layout margin={{ y: 2 }}>
        <FormGroup label="A Toggle" hint="You can toggle this!">
          <Toggle />
        </FormGroup>
      </Layout>
    </ModalBody>
    <ModalFooter
      primaryButtonProps={{
        children: "Close",
        onClick: closeModal,
      }}
      secondaryButtonProps={{
        children: "Cancel",
        onClick: closeModal,
      }}
    />
  </>
);

/**
 * This story tests when a dialog is rendered inside of an element which has a
 * positive z-index value set. This demonstrates that the dialog should still
 * appear in front of other elements which have a z-index defined.
 */
export function ZIndexBehavior() {
  return (
    <Layout
      border
      background={Background.Alt}
      position={Position.Relative}
      zIndex={ZIndex.Above}
      style={{ height: "300px", width: "400px" }}
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
    >
      <CoreText>This should appear behind the modal overlay</CoreText>

      <Modal show={true} onRequestClose={null} size={ModalSize.Small}>
        <SimpleModalContents
          closeModal={() => {
            return;
          }}
        />
      </Modal>
    </Layout>
  );
}
