import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Box, Indicator } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const CustomCalendar = () => {
  const [selected, setSelected] = useState<Date[]>([]);
  const [indicated, setIndicated] = useState<Date[]>([]);

  useEffect(() => {
    console.log("selected is now: ", selected);
  }, [selected]);

  useEffect(() => {
    console.log("indicated is now: ", indicated);
  }, [indicated]);

  const handleSelected = (inputDate: Date) => {
    // check if the clicked inputDate is in Selected or Indicated
    const isSelected = selected.some((s) => dayjs(inputDate).isSame(s, "date"));
    const isIndicated = indicated.some((s) =>
      dayjs(inputDate).isSame(s, "date")
    );

    console.log("isSelected: ", isSelected, "isIndicated: ", isIndicated);

    // if not both, newbie
    if (!isSelected && !isIndicated) {
      console.log("null -> selected");
      setSelected([...selected, inputDate]);
    } else if (isSelected) {
      console.log("selected -> indicated");
      // Remove from Selected array
      const newSelected = selected.filter(
        (s) => !dayjs(inputDate).isSame(s, "date")
      );
      setSelected(newSelected);
      console.log("Add to indicated array");
      setIndicated([...indicated, inputDate]);
    } else if (isIndicated) {
      console.log("indicated -> null");
      // Remove from Indicated array
      const newIndicated = indicated.filter(
        (s) => !dayjs(inputDate).isSame(s, "date")
      );
      setIndicated(newIndicated);
    }
  };

  const renderDay = (date: Date) => {
    const day = date.getDate();
    const isDayIndicated = indicated.some((ind) =>
      dayjs(date).isSame(ind, "date")
    );

    return (
      <Indicator size={6} color="red" offset={-2} disabled={!isDayIndicated}>
        <div>{day}</div>
      </Indicator>
    );
  };

  return (
    <Box>
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
