import { useEffect, useRef, useState } from "react";

import {
  Pause,
  PlayArrowRounded,
  RestartAlt,
  Stop,
  Timer,
} from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";

const Stopwatch = () => {
  /* States*/
  const intervalId = useRef<number | undefined>();
  const [time, setTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isStop, setIsStop] = useState<boolean>(false);

  /*Constants*/
  const hours = Math.floor(time / 360000);
  const minuts = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliSconds = time % 100;

  /*Functions*/
  const onStart = () => {
    isStop && setTime(0);
    setIsTimerRunning(true);
  };

  const onPause = () => {
    setIsTimerRunning(false);
  };

  const onStop = () => {
    setIsStop(true);
    setIsTimerRunning(false);
  };

  const onReset = () => {
    setTime(0);
    isStop && setIsStop(false);
  };

  /*Hooks*/
  useEffect(() => {
    if (isTimerRunning) {
      setIsStop(false);
      intervalId.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
    } else {
      clearInterval(intervalId.current);
    }

    return () => clearInterval(intervalId.current);
  }, [isTimerRunning]);

  return (
    <Box
      display="flex"
      gap={4}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="95vh"
    >
      <Card sx={{ p: 12, backgroundColor: "#eee8f6" }}>
        <Box
          display="flex"
          gap={4}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Timer
            fontSize="large"
            color={isStop ? "success" : isTimerRunning ? "info" : "action"}
          />
          <Typography variant="h4" {...(isStop && { color: "green" })}>
            {hours.toString().padStart(2, "0")} :{" "}
            {minuts.toString().padStart(2, "0")} :{" "}
            {seconds.toString().padStart(2, "0")} :{" "}
            {milliSconds.toString().padStart(2, "0")}
          </Typography>
          <Box display="flex" gap={2}>
            {isTimerRunning ? (
              <Button
                variant="contained"
                onClick={onPause}
                color="info"
                startIcon={<Pause />}
              >
                Pause
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={onStart}
                color="success"
                startIcon={<PlayArrowRounded />}
              >
                Start
              </Button>
            )}
            <Button
              variant="contained"
              onClick={onStop}
              disabled={isStop}
              color="error"
              startIcon={<Stop />}
            >
              Stop
            </Button>
            <Button
              variant="contained"
              onClick={onReset}
              disabled={time === 0}
              color="inherit"
              startIcon={<RestartAlt />}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Stopwatch;
