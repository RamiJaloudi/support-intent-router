# Support Intent Router Implementation Guide

## Use Case

Support Intent Router classifies inbound customer support messages and routes them to the right queue. It is useful for help desks, SaaS support teams, customer success operations, and incident triage.

## How It Works

The service scores a message against intent vocabularies, extracts urgency signals, and returns:

- intent
- queue
- priority
- confidence
- explanation signals

## Run Locally

```powershell
npm install
npm run dev
npm test
```

Example:

```powershell
Invoke-RestMethod -Method Post http://localhost:3000/route `
  -ContentType "application/json" `
  -Body '{"message":"Urgent production API latency issue"}'
```

## Implementation Notes

Routing logic lives in `src/router.ts`. The Express API is in `src/server.ts`.

To extend it:

- Add intents to the `intents` list.
- Add queue-specific priority logic.
- Replace keyword scoring with embeddings or a fine-tuned classifier.
- Log routed tickets for retraining data.

## Production Path

A production version would integrate with Zendesk, Jira, Slack, or Salesforce, preserve audit logs, and include human override feedback to improve model quality.
