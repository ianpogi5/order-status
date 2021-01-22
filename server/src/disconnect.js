import response from "@kdcio/api-gw-resp";
import dynamo from "./helpers/dynamo";

const tableName = process.env.WS_TABLE_NAME;

export const handler = async (event) => {
  console.log("event", event);

  const { connectionId: connectionID } = event.requestContext;

  try {
    const client = await dynamo.get(connectionID, tableName);
    await dynamo.delete(client, tableName);
  } catch (error) {
    console.log(error);
  }

  return response.OK({
    body: { message: "disconnected" },
  });
};
