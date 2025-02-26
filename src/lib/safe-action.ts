import { headers } from "next/headers";
import { AuthenticationError, PublicError } from "@/lib/errors";
import { rateLimitByKey } from "@/lib/limiter";
import { createServerActionProcedure } from "zsa";

import { auth } from "./auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  const isDev = process.env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "ERROR",
      message: `${!isAllowedError && isDev ? "DEV ONLY ENABLED - " : ""}${
        err.message
      }`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    await rateLimitByKey({
      key: `unauthenticated-global`,
      limit: 10,
      window: 10000,
    });
  });

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new AuthenticationError();
    }

    await rateLimitByKey({
      key: `${session.user.id}-global`,
      limit: 100,
      window: 10000,
    });

    return { user: session?.user };
  });
