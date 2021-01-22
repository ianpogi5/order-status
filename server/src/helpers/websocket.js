import ApiGatewayManagementApi from "aws-sdk/clients/apigatewaymanagementapi";

export const create = (domainName, stage) => {
  const awsConfigs = {
    apiVersion: "2018-11-29",
    endpoint: `${domainName}/${stage}`,
  };

  console.log("awsConfigs", awsConfigs);
  return new ApiGatewayManagementApi(awsConfigs);
};

export const send = ({ domainName, stage, connectionID, message }) => {
  const ws = create(domainName, stage);

  const postParams = {
    Data: message,
    ConnectionId: connectionID,
  };

  console.log(`Sending: ${message} to ${connectionID}`);

  return ws.postToConnection(postParams).promise();
};
