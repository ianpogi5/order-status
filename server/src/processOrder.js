export const handler = async (event) => {
  console.log("[new dynamodb event received] :=> ", JSON.stringify(event));
};
