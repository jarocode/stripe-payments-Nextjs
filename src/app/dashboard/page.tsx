"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

import { stripeApi } from "../api-requests/stripe";

const Page = () => {
  const [subscription, setSubscription] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    getSubscription();
  }, []);

  const getSubscription = async () => {
    try {
      const data = await stripeApi.getUserSubscription();
      setSubscription(data);
    } catch (error) {
      throw error;
    }
  };

  const handleSubscriptionUpgrade = () => {
    router.replace("/?upgrade=true");
  };

  return (
    <Container>
      <Typography fontSize="36px">Welcome to your dashboard!</Typography>
      <Typography fontSize="24px">
        You are currently subscribed to the{" "}
        <strong style={{ textTransform: "uppercase" }}>
          {subscription?.product_name} plan
        </strong>
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
        onClick={handleSubscriptionUpgrade}
      >
        Upgrade Subscription
      </Button>

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
        Cancel Subscription
      </Button>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
  align-items: center;
`;
