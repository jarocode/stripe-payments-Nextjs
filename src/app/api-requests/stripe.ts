import api from ".";

const createCheckoutSession = async ({
  lookup_key,
}: {
  lookup_key: string;
}) => {
  try {
    const response = await api.post(
      `/payments/stripe/create-checkout-session`,
      {
        lookup_key,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const stripeApi = {
  createCheckoutSession,
};
