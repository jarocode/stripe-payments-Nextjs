"use client";

import React from "react";
import styled from "@emotion/styled";
import { Typography, Button } from "@mui/material";

const page = () => {
  return (
    <Container>
      <Typography fontSize="36px">
        Subscription to enterprise plan successful!
      </Typography>
      <Button
        size="large"
        sx={{
          padding: ".5rem 2.5rem",
          background: "#fff",
          color: "#000",
          "&:hover": {
            background: "#fff",
          },
        }}
      >
        Back
      </Button>
    </Container>
  );
};

export default page;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
  align-items: center;
`;
