import DynamoDB from "aws-sdk/clients/dynamodb";
import AWS from "aws-sdk/global";

const awsConfigs = {};
const { AWS_REGION, DDB_ENDPOINT } = process.env;

if (AWS_REGION) awsConfigs.region = AWS_REGION;
if (DDB_ENDPOINT && DDB_ENDPOINT !== "")
  awsConfigs.endpoint = new AWS.Endpoint(DDB_ENDPOINT);

const documentClient = new DynamoDB.DocumentClient(awsConfigs);

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data for ID of ${ID} from ${TableName}`
      );
    }
    console.log(data);

    return data.Item;
  },

  async getAllConnected(TableName) {
    const params = {
      TableName,
    };
    const data = await documentClient.scan(params).promise();

    if (!data || !data.Items) {
      throw Error(
        `There was an error fetching the data for connected clients from ${TableName}`
      );
    }
    console.log(data);

    return data.Items;
  },

  async write(data, TableName) {
    if (!data.ID) {
      throw Error("no ID on the data");
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${data.ID} in table ${TableName}`
      );
    }

    return data;
  },

  async delete(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    return documentClient.delete(params).promise();
  },
};

export default Dynamo;
