import { baseURL, errorMessages } from "@/constants";
import { useRouter } from "next/router";
import { toast } from "sonner";

const admin = JSON.parse(localStorage.getItem("admin"));
const token = admin ? admin.access_token : "";
const router = useRouter();
export async function login(admin) {
  const req = await fetch(baseURL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
    Authorization: `Bearer ${token}`,
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

// POST request
export async function postData(endpoint = "", data) {
  const req = await fetch(endpoint ? baseURL + endpoint : baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    Authorization: `Bearer ${token}`,
  });

  if (req.status === 200) {
    toast.success(errorMessages.succesfulyAdd);
    const res = await req.json();
    return res;
  } else if (req.status === 403) {
    setTimeout(() => {
      localStorage.removeItem("admin");
      router.push("/login");
    }, 3000);

    throw new Error(errorMessages.unknownToken);
  } else if (req.status === 400) {
    throw new Error(errorMessages.post.unknownPost);
  } else if (req.status === 500) {
    throw new Error(errorMessages.post.unknownServer);
  } else {
    throw new Error(req.status);
  }
}

// GET request
export async function getRequest(endpoint = "") {
  const req = await fetch(endpoint ? baseURL + endpoint : baseURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (req.status === 200) {
    const res = await req.json();
    return res;
  } else {
    if (req.status == 400) {
      throw new Error(errorMessages.get.unknownGet);
    } else if (req.status == 403) {
      throw new Error(errorMessages.unknownToken);
    } else {
      throw new Error(errorMessages.get.unknownServer);
    }
  }
}

// DELETE request
export async function deleteRequest(endpoint = "") {
  const req = await fetch(endpoint ? baseURL + endpoint : baseURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (req.status === 200) {
    const res = await req.json();
    return res;
  } else {
    if (req.status === 400) {
      throw new Error(errorMessages.delete.unknownDelete);
    } else if (req.status === 403) {
      setTimeout(() => {
        localStorage.removeItem("admin");
        router.push("/login");
      }, 3000);
      throw new Error(errorMessages.unknownToken);
    } else if (req.status === 404) {
      throw new Error(errorMessages.delete.notFound);
    } else {
      throw new Error(errorMessages.unknownServer);
    }
  }
}

// request examples

// delete request
// {deleteRequest("/resurs/1")
//   .then((response) => {
//    toast.succes("Resurs o'chirildi:", response);
//   })
//   .catch((error) => {
//     toast.error("Xato:", error.message);
//   });
// }

// get materoials
// async function fetchUsers() {
//   try {
//     const data = await getRequest(endpoint); // getRequest funksiyasini chaqiramiz
//     toast.succes("Foydalanuvchilar:", data); // Olingan foydalanuvchilarni chiqarish
//   } catch (error) {
//     toast.error("Xato:", error.message); // Agar xato bo'lsa, konsolga chiqarish
//   }
// }
