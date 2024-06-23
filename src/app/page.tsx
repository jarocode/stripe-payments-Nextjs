"use client";

import React, { Suspense } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import PriceCard from "./components/PriceCard";

const Page = () => {
  const plans = [
    {
      name: "Basic",
      price: "$200/year",
      description: "Create just one chatbot,  gpt3.5 only",
      lookup_key: "basic_yearly",
    },
    {
      name: "Standard",
      price: "$590/year",
      description: "Create not more than two chatbots, gpt3.5 & gpt-4",
      lookup_key: "standard_yearly",
    },
    {
      name: "Enterprise",
      price: "$750/year",
      description: "Create up to 15 chatbots, gpt3.5 , gpt-4o, gpt-4 ",
      lookup_key: "enterprise_yearly",
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
      <Suspense>
        <CardDiv>
          {plans.map((el) => (
            <PriceCard
              key={el.name}
              name={el.name}
              description={el.description}
              price={el.price}
              lookup_key={el.lookup_key}
            />
          ))}
        </CardDiv>
      </Suspense>
    </Container>
  );
};

export default Page;

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
