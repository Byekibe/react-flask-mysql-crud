import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uid, setUid] = useState("");
  const [feedback, setFeedBack] = useState("");
  const [err, setErr] = useState("");

  const url = `http://localhost:7000/api/post/update/${id}`;

  async function postData() {
    const formData = {
      title: title,
      subTitle: subTitle,
      description: description,
      imageUrl: imageUrl,
      uid: uid,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      //   setFeedBack(data);
    } catch (error) {
      setErr(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    postData();
    setDescription("");
    setImageUrl("");
    setSubTitle("");
    setUid("");
    setTitle("");
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="sub-Title"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="User Id"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />

        <button>Add Post</button>
      </form>
    </div>
  );
}
