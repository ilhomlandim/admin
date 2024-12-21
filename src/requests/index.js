import { baseURL, errorMessages } from "@/constants";
import { useRouter } from "next/router";
import { toast } from "sonner";

const getToken = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin ? admin.access_token : "";
};

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

export async function postData(data, endpoint = "") {
  const token = getToken();
  const router = useRouter();

  const req = await fetch(baseURL + "/materials/" + endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // console.log(req);

  if (req.status === 200) {
    toast.success(errorMessages.succesfulyAdd);
    const res = await req.json();
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

//

//

// GET request
export async function getRequest(endpoint = "") {
  const token = getToken();

  try {
    const req = await fetch(baseURL + "/materials/" + endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (req.status == 200) {
      const res = await req.json();
      // console.log("API javobi:", res);
      return res;
    } else if (req.status === 403) {
      throw new Error(errorMessages.unknownToken);
    } else if (req.status === 400) {
      throw new Error("Noto'g'ri so'rov.");
    } else if (req.status === 500) {
      throw new Error(errorMessages.get.unknownServer);
    } else {
      throw new Error(`Xato: ${req.status}`);
    }
  } catch (error) {
    console.error("Fetch xatosi:", error);
    throw error;
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
