import dynamo from "./helpers/dynamo";
const { send } = require("./helpers/websocket");

const tableName = process.env.WS_TABLE_NAME;

export const handler = async (event) => {
  const data = JSON.stringify(event.Records);
  console.log("[new dynamodb event received] :=> ", data);
  const proms = [];
  const rec = event.Records[0];

  // event.Records.forEach(async (rec) => {
  try {
    const { companyId, outletId } = rec.dynamodb.NewImage;
    // raw dynamodb types
    const connections = await dynamo.getAllConnected(
      `${companyId.S}-${outletId.S}`,
      tableName
    );
    console.log(connections);
    connections.forEach((record) => {
      const { ID, domainName, stage } = record;
      proms.push(
        send({
          domainName,
          stage,
          connectionID: ID,
          message: JSON.stringify(rec),
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
  // });
  await Promise.all(proms);
};
