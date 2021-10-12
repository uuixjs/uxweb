import * as React from "react";

import {
  Button,
  FormGroup,
  Input,
  InputType,
  Layout,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
  Toggle,
  TransitionType,
} from "v2";
import { FC, useState } from "react";

export default { title: "Modal / Modal" };

export function ModalBasicExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // minHeight ensures screenshot diff makes the window tall enough to see the modal
    <div style={{ minHeight: "400px" }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        size={ModalSize.Small}
      >
        <SimpleModalContents closeModal={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export function ModalWithSlideTransition() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // minHeight ensures screenshot diff makes the window tall enough to see the modal
    <div style={{ minHeight: "400px" }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        size={ModalSize.Small}
        transitionType={TransitionType.SlideOverBottom}
      >
        <SimpleModalContents closeModal={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export function ModalWithDisabledTransition() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // minHeight ensures screenshot diff makes the window tall enough to see the modal
    <div style={{ minHeight: "400px" }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        size={ModalSize.Small}
        transitionType={TransitionType.None}
        backdropTransitionType={TransitionType.None}
      >
        <SimpleModalContents closeModal={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export function ModalWithCustomBG() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // minHeight ensures screenshot diff makes the window tall enough to see the modal
    <div style={{ minHeight: "400px" }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        size={ModalSize.Small}
        backdrop={
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "black",
            }}
          />
        }
      >
        <SimpleModalContents closeModal={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export function ModalWithEmptyBG() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    // minHeight ensures screenshot diff makes the window tall enough to see the modal
    <div style={{ minHeight: "400px" }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        show={isOpen}
        onRequestClose={() => setIsOpen(false)}
        size={ModalSize.Small}
        backdrop={null}
      >
        <SimpleModalContents closeModal={() => setIsOpen(false)} />
      </Modal>
    </div>
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
