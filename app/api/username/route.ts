import os from "os";

export async function GET() {
  const info = os.userInfo();
  // Use the full name if available (macOS/Linux), otherwise fall back to the login username
  const fullName = info.username ?? "Developer";
  // Capitalise each word
  const display = fullName
    .split(/[\s._-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  return Response.json({ name: display });
}
