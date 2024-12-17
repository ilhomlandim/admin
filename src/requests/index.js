import { baseURL, errorMessages } from "@/constants";

export async function login(admin) {
  const req = await fetch(baseURL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  });

  if (req.status === 200) {
    const res = await req.json();
    return res;
  } else {
    if (errorMessages[req.status] === undefined) {
      throw new Error(errorMessages.unknown);
    } else {
      throw new Error(errorMessages[req.status]);
    }
  }
}
