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

  const { companyId, outletId } = event.queryStringParameters;

  const data = {
    ID: connectionID,
    date: Date.now(),
    domainName,
    stage,
    outlet: `${companyId}-${outletId}`,
  };

  console.log(data);

  await dynamo.write(data, tableName);

  return response.OK({
    body: { message: "connected" },
  });
};
