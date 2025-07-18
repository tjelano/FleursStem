import "server-only";
import { token } from "../env";

export function getSanityToken(): string | undefined {
  return token;
}

export function createAuthenticatedClient() {
  const { createClient } = require("next-sanity");
  const { apiVersion, dataset, projectId } = require("../env");
  
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: token,
    perspective: "published",
  });
}
