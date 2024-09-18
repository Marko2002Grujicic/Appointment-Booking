import React from "react";
import { useTranslation } from "react-i18next";
import {
  DeleteButton,
  DialogButton,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from "../../../common/StyledComponents";
import { styled } from "@mui/system";
import { Dialog } from "@mui/material";
import { colors } from "../../../../helpers/colors";

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <StyledConfirmationDialog open={open} onClose={onClose}>
      <StyledDialogTitle>{t("confirmation.title")}</StyledDialogTitle>
      <ConfirmationDialogContent>
        {t("confirmation.content")}
      </ConfirmationDialogContent>
      <StyledDialogActions>
        <DialogButton onClick={onClose} color="primary">
          {t("form.cancel")}
        </DialogButton>
        <DeleteButton
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {t("form.delete")}
        </DeleteButton>
      </StyledDialogActions>
    </StyledConfirmationDialog>
  );
};

const StyledConfirmationDialog = styled(Dialog)({
  ".css-1qxadfk-MuiPaper-root-MuiDialog-paper, .css-1t1j96h-MuiPaper-root-MuiDialog-paper ":
    {
      maxWidth: "500px",
    },
});

const ConfirmationDialogContent = styled(StyledDialogContent)({
  width: "500px",
  color: colors.error,
});

export default ConfirmationDialog;
