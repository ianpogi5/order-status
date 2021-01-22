import response from "@kdcio/api-gw-resp";
import dynamo from "./helpers/dynamo";

const tableName = process.env.WS_TABLE_NAME;

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

  await dynamo.write(data, tableName);

  return response.OK({
    body: { message: "connected" },
  });
};
