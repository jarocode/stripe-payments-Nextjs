"use client";

import React from "react";
import styled from "@emotion/styled";
import { Typography, Card, CardContent, Button } from "@mui/material";

const page = () => {
  const plans = [
    {
      name: "Basic",
      price: "$200/year",
      description: "Create just one chatbot,  gpt3.5 only",
    },
    {
      name: "Standard",
      price: "$590/year",
      description: "Create not more than two chatbots, gpt3.5 & gpt-4",
    },
    {
      name: "Enterprise",
      price: "$750/year",
      description: "Create up to 15 chatbots, gpt3.5 , gpt-4o, gpt-4 ",
    },
  ];
  return (
    <Container>
      <Typography fontWeight={700} fontSize={"48px"}>
        Pricing Plans
      </Typography>
      <Typography>
        Start building for free, then add a site plan to go live. Account plans
        unlock additional features.
      </Typography>
      <CardDiv>
        {plans.map((el) => (
          <BasicCard
            key={el.name}
            name={el.name}
            description={el.description}
            price={el.price}
          />
        ))}
      </CardDiv>
    </Container>
  );
};

export default page;

function BasicCard({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: string;
}) {
  return (
    <Card sx={{ minWidth: 275, background: "#18181B", color: "#fff" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography fontWeight={500} fontSize="22px">
          {name}
        </Typography>

        <Typography variant="body2">{description}</Typography>
        <Typography fontSize="30px" fontWeight={700}>
          {price}
        </Typography>
      </CardContent>

      <Button
        size="large"
        style={{ background: "#fff", color: "#000", width: "100%" }}
      >
        Subscribe
      </Button>
    </Card>
  );
}

const Container = styled.div`
  padding-top: 4rem;
  text-align: center;
  width: 100%;
`;

const CardDiv = styled.div`
  display: flex;
  padding-top: 5rem;
  gap: 1.5rem;
  justify-content: center;
`;
