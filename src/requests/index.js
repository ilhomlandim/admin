import { baseURL, errorMessages, successMessages } from "@/constants";

// Login
export async function login(data) {
  const req = await fetch(baseURL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    const data = await req.json();
    return { data, message: successMessages.login };
  } else if (req.status === 400) {
    throw new Error(errorMessages.login);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Get all data
export async function getAllData(route) {
  const req = await fetch(baseURL + route);
  if (req.status === 200) {
    const { data } = await req.json();
    return data;
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Add data
export async function addData(route, data, token) {
  const req = await fetch(baseURL + route, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (req.status === 200) {
    const data = await req.json();
    return { data, message: successMessages.add };
  } else if (req.status === 403) {
    throw new Error(errorMessages[req.status]);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Update data
export async function updateData(route, data) {
  const req = await fetch(baseURL + route + data.id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (req.status === 200) {
    const data = await req.json();
    return { data, message: successMessages.update };
  } else if (req.status === 403) {
    throw new Error(errorMessages[req.status]);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Delete data
export async function deleteData(route, id) {
  const req = await fetch(baseURL + route + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (req.status === 200) {
    return { message: successMessages.delete };
  } else if (req.status === 403) {
    throw new Error(errorMessages[req.status]);
  } else {
    throw new Error(errorMessages.unknown);
  }
}

// Upload file
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  const req = await fetch(baseURL + "/upload", {
    method: "POST",
    body: formData,
  });

  if (req.status === 200) {
    return req.text();
  } else {
    throw new Error(errorMessages.unknown);
  }
}
