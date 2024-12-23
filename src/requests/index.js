import { baseURL, errorMessages } from "@/constants";
import { useRouter } from "next/router";
import { toast } from "sonner";

const admin = JSON.parse(localStorage.getItem("admin"));

const getToken = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin ? admin.access_token : "";
};

// const token = admin ? admin.access_token : "";
// const router = useRouter();

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

export async function postData(data, router, endpoint = "") {
  const token = getToken();

  const req = await fetch(baseURL + "/materials/" + endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(req);

  if (req.status === 200) {
    toast.success(errorMessages.succesfulyAdd);

    const res = await req.json();
    console.log(res);
    return res;
  } else if (req.status === 403) {
    toast.error("Token vaqti tugagan iltimos qayta royhattan oting");

    setTimeout(() => {
      router.push("/login");
      localStorage.removeItem("admin");
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
export async function getAllData(route) {
  const req = await fetch(baseURL + route);
  if (req.status === 200) {
    const { data } = await req.json();
    return data;
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

export async function deleteData(id = "", router = null) {
  const token = getToken();

  const req = await fetch(baseURL + "/materials/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (req.status === 200) {
    toast.success("Ma'lumot ochirildi");
    return true;
  } else if (req.status === 403) {
    toast.error(errorMessages.unknownToken);

    setTimeout(() => {
      router.push("/login");
      localStorage.removeItem("admin");
    }, 3000);
    throw new Error(errorMessages.unknownToken);
  } else if (req.status === 400) {
    throw new Error(errorMessages.post.unknownDelete);
  } else if (req.status === 500) {
    throw new Error(errorMessages.post.unknownServer);
  } else {
    throw new Error(req.status);
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
