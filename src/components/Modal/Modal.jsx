import React from "react";
import { NavLink } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import { ModalDialog } from "@mui/joy";
import { TypographyContext } from "@mui/joy/Typography/Typography";

const modalWindow = ({ opened }) => {
  return (
    <React.Fragment>
      <Modal open={opened}>
        <ModalDialog>
          <ModalClose />
          <TypographyContext>Регистрация успешна</TypographyContext>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default modalWindow;
