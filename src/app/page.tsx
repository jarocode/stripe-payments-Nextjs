"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { stripeApi } from "./api-requests/stripe";

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
      <CardDiv>
        {plans.map((el) => (
          <BasicCard
            key={el.name}
            name={el.name}
            description={el.description}
            price={el.price}
            lookup_key={el.lookup_key}
          />
        ))}
      </CardDiv>
    </Container>
  );
};

export default Page;

function BasicCard({
  name,
  description,
  price,
  lookup_key,
}: {
  name: string;
  description: string;
  price: string;
  lookup_key: string;
}) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isUpgrade = Boolean(searchParams.get("upgrade"));

  console.log("isUpgrade:", isUpgrade);

  const handleStripeCheckout = async () => {
    if (isUpgrade) return subscriptionUpgrade();
    subscriptionCreation();
  };

  const subscriptionCreation = async () => {
    setLoading(true);
    try {
      const { sessionUrl } = await stripeApi.createSubscriptionCheckout({
        lookup_key,
      });
      setLoading(false);
      // console.log("sessionUrl", sessionUrl);
      window.location.href = sessionUrl;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const subscriptionUpgrade = async () => {
    setLoading(true);
    try {
      const { message } = await stripeApi.updateSubscription({
        lookup_key,
      });
      setLoading(false);
      alert(message);
      router.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

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
        onClick={handleStripeCheckout}
        disabled={loading}
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
