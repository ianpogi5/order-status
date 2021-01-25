import dynamo from "./helpers/dynamo";
const { send } = require("./helpers/websocket");

const tableName = process.env.WS_TABLE_NAME;

export const handler = async (event) => {
  const data = JSON.stringify(event.Records);
  console.log("[new dynamodb event received] :=> ", data);
  const proms = [];

  try {
    const rec = event.Records[0];
    const newData = dynamo.convert(rec.dynamodb.NewImage);
    const oldData = dynamo.convert(rec.dynamodb.OldImage);
    const { companyId, outletId } = newData;

    console.log(newData, oldData);

    if (newData.status === oldData.status) {
      // Status did not change
      return;
    }

    const clients = await dynamo.getAllConnected(
      `${companyId}-${outletId}`,
      tableName
    );

    const message = {
      type: oldData.status === undefined ? "new-order" : "order-status",
      orderId: newData.ID,
      status: newData.status,
    };

    // Send message to each clients matching companyId & outletId
    clients.forEach((client) => {
      const { ID, domainName, stage } = client;
      proms.push(
        send({
          domainName,
          stage,
          connectionID: ID,
          message: JSON.stringify(message),
        })
      );
    });
  } catch (error) {
    console.log(error);
  }

  await Promise.all(proms);
};
