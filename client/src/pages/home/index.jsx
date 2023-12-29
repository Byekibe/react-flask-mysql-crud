import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const url = "http://localhost:7000/api/posts";
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      setPosts(data.posts);
    };

    fetchData();
  }, []);

  function handleDelete(id) {
    console.log(id);
    fetch(`http://localhost:7000/api/post/${id}`, {
      method: "POST",
    });
  }

  return (
    <div className={styles.home}>
      <div className={styles.wrapper}>
        <h1>Posts</h1>
        <Link to="/add">Add Post</Link>
        {posts === null ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => (
            <div key={post[0]}>
              <div>
                <span>Date: {post[5]}</span> || <span>User: {post[6]}</span>
              </div>
              <h1>{post[1]}</h1>
              <h2>{post[2]}</h2>
              <p>{post[3]}</p>

              <div className={styles.btnGroup}>
                <button className={styles.update}>
                  <Link to={`/update/${post[0]}`}>Update</Link>
                </button>
                <button
                  onClick={() => handleDelete(post[0])}
                  className={styles.delete}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
