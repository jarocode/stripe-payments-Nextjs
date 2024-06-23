import React, { useState } from "react";
import styled from "@emotion/styled";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { stripeApi } from "../api-requests/stripe";

function PriceCard({
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

export default PriceCard;
