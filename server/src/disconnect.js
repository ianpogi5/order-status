import response from "@kdcio/api-gw-resp";
import dynamo from "./helpers/dynamo";

const tableName = process.env.WS_TABLE_NAME;

export const handler = async (event) => {
  console.log("event", event);

  const { connectionId: connectionID } = event.requestContext;

  try {
    await dynamo.delete(connectionID, tableName);
  } catch (error) {
    console.log(error);
  }

  return response.OK({
    body: { message: "disconnected" },
  });
};
