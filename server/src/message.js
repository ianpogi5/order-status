import response from "@kdcio/api-gw-resp";
import dynamo from "./helpers/dynamo";
const { send } = require("./helpers/websocket");

const tableName = process.env.WS_TABLE_NAME;

export const handler = async (event) => {
  console.log("event", event);

  const { connectionId: connectionID } = event.requestContext;

  const body = JSON.parse(event.body);
  try {
    const record = await dynamo.get(connectionID, tableName);
    const { messages, domainName, stage } = record;

    messages.push(body.message);

    const data = {
      ...record,
      messages,
    };

    await dynamo.write(data, tableName);

    await send({
      domainName,
      stage,
      connectionID,
      message: "This is a reply to your message",
    });
    console.log("sent message");

    return response.OK({
      body: { message: "got a message" },
    });
  } catch (error) {
    return response.BAD_REQUEST({
      body: { message: "message could not be received" },
    });
  }
};
