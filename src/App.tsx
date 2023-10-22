import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { Box, MantineProvider, Title } from "@mantine/core";
import CustomCalendar from "./CustomCalendar";

export default function App() {
  return (
    <MantineProvider>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box>
          <Title>Focus Dashboard</Title>
        </Box>
        <Box>
          <CustomCalendar />
        </Box>
      </Box>
    </MantineProvider>
  );
}
