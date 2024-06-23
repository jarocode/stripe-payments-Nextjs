"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

import { stripeApi } from "../api-requests/stripe";

const Page = () => {
  const [pageLoading, SetPageLoading] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    getSubscription();
  }, []);

  const getSubscription = async () => {
    try {
      SetPageLoading(true);
      const data = await stripeApi.getUserSubscription();
      setSubscription(data);
      SetPageLoading(false);
    } catch (error) {
      SetPageLoading(false);
      throw error;
    }
  };

  const handleSubscription = () => {
    router.replace(subscription ? "/?upgrade=true" : "/");
  };

  const handleSubscriptionCancellation = async () => {
    try {
      SetLoading(true);
      const { subscription_id } = subscription;
      const { message } = await stripeApi.cancelSubscription({
        subscription_id,
      });
      alert(message);
      SetLoading(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {pageLoading ? (
        <Container>
          <CircularProgress />
        </Container>
      ) : (
        <Container>
          <Typography fontSize="36px">Welcome to your dashboard!</Typography>
          {subscription ? (
            <Typography fontSize="24px">
              You are currently subscribed to the{" "}
              <strong style={{ textTransform: "uppercase" }}>
                {subscription?.product_name} plan
              </strong>
            </Typography>
          ) : (
            <Typography fontSize="24px">
              You are not currently subscribed to any plan
            </Typography>
          )}

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
            disabled={loading}
            onClick={handleSubscription}
          >
            {subscription ? "Upgrade Subscription" : "Create Subscription"}
          </Button>

          {subscription ? (
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
              disabled={loading}
              onClick={handleSubscriptionCancellation}
            >
              Cancel Subscription
            </Button>
          ) : (
            <></>
          )}
        </Container>
      )}
    </>
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
