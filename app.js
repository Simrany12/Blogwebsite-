import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost/api.php"; // Change this URL if needed

function App() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const addPost = async (e) => {
        e.preventDefault();
        if (!title || !content) return;
        
        try {
            await axios.post(API_URL, { title, content });
            setTitle("");
            setContent("");
            fetchPosts(); // Refresh posts
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <div className="container">
            <h1>My Blog</h1>

            <form onSubmit={addPost} className="post-form">
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />
                <textarea 
                    placeholder="Content" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required
                />
                <button type="submit">Add Post</button>
            </form>

            <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>{new Date(post.created_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
