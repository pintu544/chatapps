import React, { useState } from "react";

const CommentFile = ({ comment, setComments, comments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const deleteComment = () => {
    setComments(comments.filter((c) => c.id !== comment.id));
  };

  const saveEdit = () => {
    setComments(
      comments.map((c) => (c.id === comment.id ? { ...c, text: editText } : c))
    );
    setIsEditing(false);
  };

  const addReply = () => {
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        text: replyText,
        likes: 0,
        date: new Date().toISOString(),
      };
      setComments(
        comments.map((c) =>
          c.id === comment.id ? { ...c, replies: [...c.replies, newReply] } : c
        )
      );
      setReplyText("");
      setIsReplying(false);
    }
  };

  const likeComment = () => {
    setComments(
      comments.map((c) =>
        c.id === comment.id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <p>{comment.text}</p>
      )}

      <button onClick={likeComment}>Like</button>
      <span>{comment.likes}</span>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit"}
      </button>
      {isEditing && <button onClick={saveEdit}>Save</button>}
      <button onClick={deleteComment}>Delete</button>
      <button onClick={() => setIsReplying(!isReplying)}>
        {isReplying ? "Cancel" : "Reply"}
      </button>

      {isReplying && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply..."
          />
          <button onClick={addReply}>Add Reply</button>
        </div>
      )}

      {comment.replies?.map((reply) => (
        <div key={reply.id} style={{ marginLeft: "20px" }}>
          <p>{reply.text}</p>
          <span>{reply.likes} Likes</span>
        </div>
      ))}
    </div>
  );
};

export default CommentFile;
