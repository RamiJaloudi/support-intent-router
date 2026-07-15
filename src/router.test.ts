import { describe, expect, it } from "vitest";
import { routeMessage } from "./router";

describe("routeMessage", () => {
  it("routes breach reports to security with high priority", () => {
    const result = routeMessage("Urgent possible breach: our account may be compromised.");

    expect(result.queue).toBe("security-response");
    expect(result.priority).toBe("high");
  });

  it("routes invoice messages to revenue operations", () => {
    const result = routeMessage("Can you explain this invoice charge?");

    expect(result.intent).toBe("billing");
  });
});
