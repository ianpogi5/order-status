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

  if (!companyId || !outletId) {
    throw new Error("Missing companyId and/or outletId");
  }

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
