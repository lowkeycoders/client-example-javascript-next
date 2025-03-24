import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { shows } from "../data/shows";
import { onsurityPrompt } from "../data/onsurity";

export const assistant: CreateAssistantDTO | any = {
  name: "Priya-Onsurity",
  model: {
    provider: "google",
    model: "gemini-2.0-flash",
    temperature: 0.7,
    systemPrompt: onsurityPrompt,
    // Upcoming Shows are ${JSON.stringify(
    //   shows
    // )}
    // `,
    functions: [
      {
        name: "checkClaimStatus",
        async: true,
        description: "Checks the status of a user's claim based on policy number and claim ID.",
        parameters: {
          type: "object",
          properties: {
            policyNumber: {
              type: "string",
              description: "The policy number for which the user wants to check claim status.",
            },
            claimId: {
              type: "string",
              description: "The claim ID for which the user wants to check status.",
            },
          },
        },
      },
      {
        name: "verifyHospitalNetwork",
        async: true,
        description: "Verifies if a hospital is in the cashless network.",
        parameters: {
          type: "object",
          properties: {
            hospitalName: {
              type: "string",
              description: "The name of the hospital to check in the network.",
            },
            location: {
              type: "string",
              description: "The location/city of the hospital.",
            },
          },
        },
      },
      {
        name: "initiatePreAuthorization",
        async: true,
        description: "Initiates a pre-authorization request for a cashless claim.",
        parameters: {
          type: "object",
          properties: {
            policyNumber: {
              type: "string",
              description: "The policy number for the pre-authorization request.",
            },
            hospitalName: {
              type: "string",
              description: "The hospital where treatment is planned.",
            },
            treatmentType: {
              type: "string",
              description: "The type of treatment or procedure planned.",
            },
            estimatedCost: {
              type: "number",
              description: "The estimated cost of the treatment.",
            },
            plannedDate: {
              type: "string",
              description: "The planned date for the treatment or admission.",
            },
          },
        },
      },
      {
        name: "escalateClaimIssue",
        async: true,
        description: "Escalates a claim issue to the claims team for urgent review.",
        parameters: {
          type: "object",
          properties: {
            policyNumber: {
              type: "string",
              description: "The policy number related to the claim issue.",
            },
            claimId: {
              type: "string",
              description: "The claim ID that needs escalation.",
            },
            issueDescription: {
              type: "string",
              description: "Brief description of the issue being faced.",
            },
            urgencyLevel: {
              type: "string",
              description: "The urgency level of the escalation (high/medium/low).",
            },
          },
        },
      },
    ],
  },
  voice: {
    provider: "vapi",
    voiceId: "Neha",
  },
  messagePlan: {
    idleMessages: [
      "Are we still connected?",
      "Hello, are you there?",
      "I'm still here if you need assistance with your insurance claim."
    ],
    idleMessageMaxSpokenCount: 2,
    idleTimeoutSeconds: 7,
    silenceTimeoutMessage: "Since I haven't heard from you, I'll end this call. Feel free to call back when you're ready to continue discussing your insurance claim."
  },
  firstMessage:
    "Hello Shivam-- This is Priya from Onsurity’s claims team... How can I assist you today?",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "https://08ae-202-43-120-244.ngrok-free.app/api/webhook",
};
