import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Box, Button, Indicator, Switch } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const CustomCalendar = () => {
  const [selected, setSelected] = useState<Date[]>([]);
  const [indicated, setIndicated] = useState<Date[]>([]);

  const [targetDates, setTargetDates] = useState<Date[]>([]);
  const [targetDateMode, toggleTargetDateMode] = useState(false);

  const handleSelected = (inputDate: Date) => {
    if (targetDateMode) {
      setTargetDates([...targetDates, inputDate]);
      return;
    }

    // check if the clicked inputDate is in one of the arrays
    const isSelected = selected.some((s) => dayjs(inputDate).isSame(s, "date"));
    const isIndicated = indicated.some((s) =>
      dayjs(inputDate).isSame(s, "date")
    );
    const isTargetDate = targetDates.some((s) => dayjs(inputDate).isSame(s));

    console.log("isSelected: ", isSelected, "isIndicated: ", isIndicated);

    if (targetDateMode) {
      if (!isTargetDate) {
        // Add to Target Dates array
        setTargetDates([...targetDates, inputDate]);
      } else {
        // Remove from Target Dates array
        const newTargetDates = targetDates.filter(
          (s) => !dayjs(inputDate).isSame(s, "date")
        );
        setTargetDates(newTargetDates);
      }
    } else {
      if (!isSelected && !isIndicated) {
        // null -> selected
        setSelected([...selected, inputDate]);
      } else if (isSelected) {
        // Remove from Selected array
        const newSelected = selected.filter(
          (s) => !dayjs(inputDate).isSame(s, "date")
        );
        setSelected(newSelected);
        // "selected -> indicated"
        setIndicated([...indicated, inputDate]);
      } else if (isIndicated) {
        // Remove from Indicated array
        const newIndicated = indicated.filter(
          (s) => !dayjs(inputDate).isSame(s, "date")
        );
        // "indicated -> null"
        setIndicated(newIndicated);
      }
    }
  };

  const renderDay = (date: Date) => {
    // function to render each day in calendar
    const day = date.getDate();
    const isDayIndicated = indicated.some((ind) =>
      dayjs(date).isSame(ind, "date")
    );

    // Check if the date is today
    const isToday = dayjs().isSame(date, "date");
    const isTargetDate = targetDates.some((s) => dayjs(date).isSame(s));

    const styles = {};

    if (isToday) {
      styles.border = "2px solid red";
    }
    if (isTargetDate) {
      styles.backgroundColor = "skyblue";
    }

    return (
      <Indicator size={6} color="red" offset={-2} disabled={!isDayIndicated}>
        <div style={styles}>{day}</div>
      </Indicator>
    );
  };

  return (
    <Box>
      {/* <Button onClick={() => toggleTargetDateMode(!targetDateMode)}>
        {targetDateMode ? "Exit Target Date Mode" : "Enter Target Date Mode"}
      </Button> */}

      <Switch
        checked={targetDateMode}
        defaultChecked
        label="Set Target Dates"
        onChange={(event) => toggleTargetDateMode(event.currentTarget.checked)}
      />

      <DatePicker
        type="multiple"
        numberOfColumns={2}
        value={selected}
        renderDay={renderDay}
        getDayProps={(date) => ({
          onClick: () => handleSelected(date),
        })}
      />
    </Box>
  );
};

export default CustomCalendar;
