import response from "@kdcio/api-gw-resp";
import dynamo from "./helpers/dynamo";

const tableName = process.env.ORDER_TABLE_NAME;

export const handler = async (event) => {
  const body = JSON.parse(event.body);

  console.log("new order event", body);

  const data = {
    ID: body.id,
    date: Date.now(),
    status: body.status,
    order: body.order,
  };

  await dynamo.write(data, tableName);

  return response.OK({
    body: { message: "Saved!" },
  });
};
