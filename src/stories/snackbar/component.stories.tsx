import * as React from "react";

import {
  CoreText,
  Layout,
  NotificationType,
  Snackbar,
  SnackbarActions,
  SnackbarMessage,
  TextType,
} from "v2";

export default { title: "Snackbar" };

export const examples = () => {
  const onCloseButtonClick = () => alert("Close!");
  return (
    <>
      {/* Info Examples Start */}
      <CoreText type={TextType.H3}>Info Examples</CoreText>
      <Layout margin={{ y: 2 }} />
      <Snackbar type={NotificationType.Info} message="hello" />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Info}
        message={<SnackbarMessage title="Hello friend!" />}
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Info}
        message={
          <SnackbarMessage title="Hello my name is isha and i am notifying you about your success" />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Info}
        message={
          <SnackbarMessage title="Groom the backlog looks great, can we try it a different way collaboration through advanced technlogy. Per my previous email run it up the flag pole nor strategic high-level 30,000 ft view. Clear blue water scope creep organic growth, nor in this space. Crisp ppt 360 degree content marketing pool, land the plane show pony, nor dear hiring manager: keep it lean." />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Info}
            primaryButton={{
              children: "Sounds good!",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Info}
        message={<SnackbarMessage title="This is My Feature" />}
        actions={
          <SnackbarActions
            type={NotificationType.Info}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Info}
        message={
          <SnackbarMessage
            iconType={NotificationType.Info}
            title="This is My Feature"
          />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Info}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Info}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        message={
          <SnackbarMessage
            title="Hello my name is isha and i am notifying you about your success
            "
            iconType={NotificationType.Info}
          />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Info}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Info}
        message={
          <SnackbarMessage
            iconType={NotificationType.Info}
            title="Groom the backlog looks great, can we try it a different way collaboration through advanced technlogy. Per my previous email run it up the flag pole nor strategic high-level 30,000 ft view. Clear blue water scope creep organic growth, nor in this space. Crisp ppt 360 degree content marketing pool, land the plane show pony, nor dear hiring manager: keep it lean."
          />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Info}
            primaryButton={{
              children: "Sounds good!",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      {/* Success Examples Start */}
      <Layout margin={{ y: 2 }} />
      <CoreText type={TextType.H3}>Success Examples</CoreText>
      <Layout margin={{ y: 2 }} />
      <Snackbar type={NotificationType.Success} message="hello" />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Success}
        message={
          <SnackbarMessage title="Hello my name is isha and i am notifying you about your success" />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Success}
            primaryButton={{
              children: "Sounds good!",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Success}
        message={<SnackbarMessage title="This is My Feature" />}
        actions={
          <SnackbarActions
            type={NotificationType.Success}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Success}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        message={
          <SnackbarMessage
            title="This is My Feature Title that is Much Longer than Above"
            iconType={NotificationType.Success}
          />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Success}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      {/* Error Examples Start */}
      <Layout margin={{ y: 2 }} />
      <CoreText type={TextType.H3}>Error Examples</CoreText>
      <Layout margin={{ y: 2 }} />
      <Snackbar type={NotificationType.Error} message="hello" />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Error}
        message={
          <SnackbarMessage title="Hello my name is isha and i am notifying you about your Error" />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Error}
            primaryButton={{
              children: "Sounds good!",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Error}
        message={<SnackbarMessage title="This is My Feature" />}
        actions={
          <SnackbarActions
            type={NotificationType.Error}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Error}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        message={
          <SnackbarMessage
            title="This is My Feature Title that is Much Longer than Above"
            iconType={NotificationType.Error}
          />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Error}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      {/* Warn Examples Start */}
      <Layout margin={{ y: 2 }} />
      <CoreText type={TextType.H3}>Warning Examples</CoreText>
      <Layout margin={{ y: 2 }} />
      <Snackbar type={NotificationType.Warning} message="hello" />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Warning}
        message={
          <SnackbarMessage title="Hello my name is isha and i am notifying you about your Warning" />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Warning}
            primaryButton={{
              children: "Sounds good!",
              linkTo: "#",
            }}
          />
        }
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Warning}
        message={<SnackbarMessage title="This is My Feature" />}
        actions={
          <SnackbarActions
            type={NotificationType.Warning}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
      <Layout margin={{ y: 2 }} />
      <Snackbar
        type={NotificationType.Warning}
        closeButton={{
          "aria-label": "Close",
          onClick: onCloseButtonClick,
        }}
        message={
          <SnackbarMessage
            title="This is My Feature Title that is Much Longer than Above"
            iconType={NotificationType.Warning}
          />
        }
        actions={
          <SnackbarActions
            type={NotificationType.Warning}
            primaryButton={{
              children: "Primary",
              linkTo: "#",
            }}
          />
        }
      />
    </>
  );
};
