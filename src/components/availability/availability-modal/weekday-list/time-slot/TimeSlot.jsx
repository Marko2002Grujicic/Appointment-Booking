import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import FormikTimePicker from "../time-slot/formik-time-picker/FormikTimePicker";
import HelperText from "../../../../common/HelperText";

const TimeSlot = ({ index, onDelete, day, value, errors }) => {
  const isErrorObject = typeof errors === "object";

  const TimeSlotWrapper = styled("div")(() => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }));

  const Divider = styled("span")({
    paddingBottom: isErrorObject ? "20px" : "0px",
  });

  return (
    <>
      <div>
        <TimeSlotWrapper>
          <FormikTimePicker
            name={day}
            value={value.start}
            isStart
            index={index}
            errors={isErrorObject && errors.start}
            shrinkInput={!isErrorObject}
          />
          <Divider>-</Divider>
          <FormikTimePicker
            name={day}
            value={value.end}
            index={index}
            errors={isErrorObject && errors.end}
            shrinkInput={!isErrorObject}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            className="icon trash-can"
            onClick={() => onDelete(value.id)}
            style={{ paddingBottom: isErrorObject ? "20px" : 0 }}
          />
        </TimeSlotWrapper>
      </div>
      <HelperText helperText={!isErrorObject && errors} />
    </>
  );
};

export default TimeSlot;
