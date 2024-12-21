"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteData, getRequest } from "@/requests";
import { Link, Search, Trash } from "lucide-react";
import NavLink from "next/link";

function Data() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await getRequest();
      setData(result.data);
      setFilteredData(result.data);
      //   console.log(result);
    } catch (err) {
      setError(err.message);
      console.error(err);

      if (err.message === "Token muddati tugagan.") {
        localStorage.removeItem("admin");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    }
  };
  async function handleDelete(id) {
    if (confirm("Rostdan ham ochirmoqchimisiz?")) {
      try {
        await deleteData(id, router);
        fetchData();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  }
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Xato yuz berdi: {error}</div>;
  }

  if (!data) {
    return <h2>loading...</h2>;
  }

  return (
    <div className="base-container my-10 mx-auto ">
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-4 border-2 px-3 py-1 rounded-lg w-40"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-20 outline-none"
          placeholder="Search..."
        />
        <button type="submit" className="flex items-center gap-2">
          <Search />
        </button>
      </form>
      <h1 className="text-5xl text-center my-16">Ma'lumotlar</h1>
      <div className="flex flex-wrap items-center gap-5 justify-around">
        {filteredData.map((value, index) => (
          <div key={index} className="w-60 relative">
            <button
              className="absolute top-5 right-5"
              onClick={() => {
                handleDelete(value.id);
              }}
            >
              <Trash className="text-white"></Trash>
            </button>
            <img
              src={value.cover}
              width={240}
              height={100}
              alt="Picture of the author"
            />
            <h2 className="line-clamp-1">{value.title}</h2>
            <p className="line-clamp-1">
              <strong>Authors:</strong> {value.authors.join(", ")}
            </p>
            <p>
              <strong>Published:</strong> {value.publishedAt}
            </p>
            <p>
              <strong>Country:</strong> {value.country}
            </p>
            <p className="line-clamp-4">
              <strong>Summary:</strong> {value.summary}
            </p>

            <NavLink
              href={value.source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 underline underline-offset-2 text-blue-700"
            >
              <Link />
              Read more
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
