import dayjs from "dayjs";
import React, { useState } from "react";
import { Box, Indicator } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const CustomCalendar = () => {
  // list of selected dates
  const [selected, setSelected] = useState<Date[]>([]);
  // list of indicator dates
  const [indicated, setIndicated] = useState<Date[]>([]);

  const handleSelected = (inputDate: Date) => {
    const isSelected = selected.some((s) => dayjs(inputDate).isSame(s, "date"));

    const isIndicated = selected.some((s) =>
      dayjs(inputDate).isSame(s, "date")
    );

    if (isSelected) {
      const newSelected = selected.filter(
        (s) => !dayjs(inputDate).isSame(s, "date")
      );
      setSelected(newSelected);
      setIndicated([...indicated, inputDate]);
    } else if (isIndicated) {
      const newIndicated = indicated.filter(
        (s) => !dayjs(inputDate).isSame(s, "date")
      );
      setIndicated(newIndicated);
    } else {
      setSelected([...selected, inputDate]);
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
      ;
    </Box>
  );
};

export default CustomCalendar;
