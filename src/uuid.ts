import { randomBytes, randomUUID } from "node:crypto";

/** Generates a random UUID v4 (RFC 4122). */
export function generateUuidV4(): string {
  return randomUUID();
}

/** Generates a UUID v7 (RFC 9562): a 48-bit millisecond timestamp followed by random bits, so IDs sort by creation time. */
export function generateUuidV7(): string {
  const unixTsMs = Date.now();
  const bytes = randomBytes(16);

  bytes[0] = (unixTsMs / 2 ** 40) & 0xff;
  bytes[1] = (unixTsMs / 2 ** 32) & 0xff;
  bytes[2] = (unixTsMs / 2 ** 24) & 0xff;
  bytes[3] = (unixTsMs / 2 ** 16) & 0xff;
  bytes[4] = (unixTsMs / 2 ** 8) & 0xff;
  bytes[5] = unixTsMs & 0xff;

  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10

  const hex = bytes.toString("hex");
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
}
