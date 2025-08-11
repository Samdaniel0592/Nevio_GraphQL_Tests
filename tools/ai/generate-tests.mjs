/**
 * Offline LLM-based test generator (not used in CI runtime)
 * Requires: export OPENAI_API_KEY=...
 */
import fs from 'node:fs';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const schema = {
  name: "GraphQLTests",
  schema: {
    type: "object",
    properties: {
      tests: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            query: { type: "string" },
            variables: { type: "object" },
            assertions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "string" },
                  op: { type: "string" },
                  value: {}
                },
                required: ["path","op"]
              }
            }
          },
          required: ["name","query"]
        }
      }
    },
    required: ["tests"]
  }
};

const prompt = `Generate 3 GraphQL tests for Nevio getOffers and checkoutConfirm.
Return realistic variables & assertions. Use stable values (no timestamps).`;

const resp = await openai.responses.create({
  model: "gpt-4.1-mini",
  input: prompt,
  response_format: { type: "json_schema", json_schema: schema }
});

const content = resp.output?.[0]?.content?.[0]?.text;
if (!content) {
  throw new Error("No JSON content returned from model");
}

fs.writeFileSync("src/data/generated-tests.json", content);
console.log("Wrote src/data/generated-tests.json");
