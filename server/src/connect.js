import response from "@kdcio/api-gw-resp";

export const handler = async (event) => {
  console.log("event", event);

  const {
    connectionId: connectionID,
    domainName,
    stage,
  } = event.requestContext;

  const data = {
    ID: connectionID,
    date: Date.now(),
    messages: [],
    domainName,
    stage,
  };

  console.log(data);

  return response.OK({
    body: { message: "connected" },
  });
};
