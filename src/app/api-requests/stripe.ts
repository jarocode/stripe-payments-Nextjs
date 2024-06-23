import api from ".";

const createSubscriptionCheckout = async ({
  lookup_key,
}: {
  lookup_key: string;
}) => {
  try {
    const response = await api.post(
      `/payments/stripe/create-subscription-checkout`,
      {
        lookup_key,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const updateSubscription = async ({ lookup_key }: { lookup_key: string }) => {
  try {
    const response = await api.post(`/payments/stripe/update-subscription`, {
      lookup_key,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getUserSubscription = async () => {
  try {
    const response = await api.get(`/payments/stripe/get-user-subscription`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
const cancelSubscription = async ({
  subscription_id,
}: {
  subscription_id: string;
}) => {
  try {
    const response = await api.post(`/payments/stripe/cancel-subscription`, {
      subscription_id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const stripeApi = {
  createSubscriptionCheckout,
  updateSubscription,
  getUserSubscription,
  cancelSubscription,
};
