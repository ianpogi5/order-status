import response from "@kdcio/api-gw-resp";
import dynamo from "./helpers/dynamo";

const tableName = process.env.ORDER_TABLE_NAME;

export const handler = async (event) => {
  console.log("event", event);

  const body = JSON.parse(event.body);

  const data = {
    ID: body.id,
    date: Date.now(),
    messages: body.message,
  };

  await dynamo.write(data, tableName);

  return response.OK({
    body: { message: "default" },
  });
};
