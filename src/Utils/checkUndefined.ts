export const checkUndefined = (
  callbackURL?: any,
  clientID?: any,
  clientSecret?: any,
  strategy?: string
) => {
  if (typeof callbackURL === "undefined") {
    throw new Error(`[${strategy} Strategy] callbackURL is undefined`);
  }

  if (typeof clientID === "undefined") {
    throw new Error(`[${strategy} Strategy] clientID is undefined`);
  }

  if (typeof clientSecret === "undefined") {
    throw new Error(`[${strategy} Strategy] clientSecret is undefined`);
  }

  return { callbackURL, clientID, clientSecret };
};
