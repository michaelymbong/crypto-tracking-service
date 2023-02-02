import {
  Handler,
  HandlerEvent,
  HandlerContext,
  schedule,
} from "@netlify/functions";
import { worker } from "../src/worker";

const myHandler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log("Received event:", event);

  const { success } = await worker();

  return {
    statusCode: 200,
    success,
  };
};

const handler = schedule("@hourly", myHandler);

export { handler };
