import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:5000/api/post";

export default function Home() {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      axios
        .get(baseUrl)
        .then(res => res.data.length > 0 && setPosts(res.data))
        .catch(err => console.log(err));
    })();
  }, []);

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="input-group mb-3">
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <i className="bi bi-emoji-smile" style={{ fontSize: "22px" }} />
        </button>
        <input
          className="form-control"
          value={text}
          onChange={({ target: { value } }) => setText(value)}
        />
      </div>

      {showEmoji && (
        <Picker
          set="google"
          showPreview={false}
          showSkinTones={false}
          onSelect={emoji => setText(prev => `${prev} ${emoji.native}`)}
        />
      )}

      <div>
        <button
          onClick={() => {
            axios
              .post(`${baseUrl}`, { text })
              .then(res => {
                setPosts(prev => [...prev, res.data]);
                setShowEmoji(false);
                setText("");
              })
              .catch(err => console.log(err));
          }}
          className="btn btn-outline-primary"
        >
          Submit
        </button>
      </div>

      <br />

      {posts.length > 0 && (
        <ul className="list-group">
          {posts.map(post => (
            <li key={post._id} className="list-group-item">
              {post.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
