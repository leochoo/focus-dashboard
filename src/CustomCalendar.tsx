import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Box } from "@mantine/core";

const CustomCalendar = () => {
  const [value, setValue] = useState<Date[]>([]);
  return (
    <Box>
      <DatePicker
        type="multiple"
        numberOfColumns={2}
        value={value}
        onChange={setValue}
      />
      ;
    </Box>
  );
};

export default CustomCalendar;
