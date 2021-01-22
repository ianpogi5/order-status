import dynamo from "./helpers/dynamo";
const { send } = require("./helpers/websocket");

const tableName = process.env.WS_TABLE_NAME;

export const handler = async (event) => {
  const data = JSON.stringify(event.Records);
  console.log("[new dynamodb event received] :=> ", data);

  try {
    const connections = await dynamo.getAllConnected(tableName);
    console.log(connections);
    const proms = [];
    connections.forEach((record) => {
      const { ID, domainName, stage } = record;
      proms.push(
        send({
          domainName,
          stage,
          connectionID: ID,
          message: data,
        })
      );
    });
    await Promise.all(proms);
  } catch (error) {
    console.log(error);
  }
};
