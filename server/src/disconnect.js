import response from "@kdcio/api-gw-resp";

export const handler = async (event) => {
  console.log("event", event);
  return response.OK({
    body: { message: "disconnected" },
  });
};
