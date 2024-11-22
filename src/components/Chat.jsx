import React, { useEffect, useState } from "react";
import CommentFile from "./CommentFile";

const Chat = () => {
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("comments");
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const handleChatSend = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        likes: 0,
        date: new Date().toISOString(),
        replies: [],
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleSort = (e) => {
    const criteria = e.target.value;
    setSortBy(criteria);

    const sortedComments =
      criteria === "likes"
        ? [...comments].sort((a, b) => b.likes - a.likes)
        : [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    setComments(sortedComments);
  };

  return (
    <div>
      <h3>Chat App</h3>
      <div>
        <input
          type="text"
          name="comment"
          value={newComment}
          placeholder="Enter message"
          onChange={handleChatSend}
        />
        <button onClick={addComment}>Add</button>
        <select value={sortBy} onChange={handleSort}>
          <option value="date">Sort by Date</option>
          <option value="likes">Sort by Likes</option>
        </select>
      </div>
      {comments.map((comment) => (
        <CommentFile
          key={comment.id}
          comment={comment}
          setComments={setComments}
          comments={comments}
        />
      ))}
    </div>
  );
};

export default Chat;
