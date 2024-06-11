import { AssistantResponse } from "ai";
import OpenAI from "openai";
import { cookies } from "next/headers";
import {
  FunctionToolCall,
  ToolCall,
} from "openai/resources/beta/threads/runs/steps.mjs";
import prisma from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  console.log("userId", userId);
  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      console.log("--- before stream");
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          process.env.ASSISTANT_ID ??
          (() => {
            throw new Error("ASSISTANT_ID is not set");
          })(),
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        console.log("inside loop");
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              console.log("--- inside tooloutputs");
              if (!runResult?.id) {
                throw new Error("Run ID not found");
              }
              console.log("--- switching");

              switch (toolCall.function.name) {
                // configure your tool calls here
                case "getPartyGuests":
                  getPartyGuests({
                    threadId,
                    runId: runResult.id,
                    callId: toolCall.id,
                  });

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`
                  );
              }
            }
          );
        console.log("---", tool_outputs);

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs }
          )
        );
      }
    }
  );
}

async function getPartyGuests({
  threadId,
  runId,
  callId,
}: {
  threadId: string;
  runId: string;
  callId: string;
}) {
  console.log("--- running pary guests");

  const users = await prisma.user.findMany({
    include: {
      location: true,
    },
  });
  //map over users (which have property name and location). The location prop has the property name. return a string of all users with their location in brackets and separate each user by a comma. Location is possibly null
  const data = users
    .map(
      (user) =>
        `Name: ${user.name} Location: ${user.location?.name ?? "unknown"}`
    )
    .join(", ");
  console.log("--- running submission", threadId, runId);

  await openai.beta.threads.runs.submitToolOutputs(threadId, runId, {
    tool_outputs: [
      {
        tool_call_id: callId,
        output: JSON.stringify(data),
      },
    ],
  });
  console.log("--- finished submission");
  return;
}
