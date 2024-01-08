import { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import { CommentItem } from "../common/types";
import { RefObject } from "react";

// Assuming inputRef is a RefObject of an HTML element

interface CommentComponent {
  comment: CommentItem;
  handleInsertNode: (a: String, b: String) => void;
  handleEditNode: (a: String, b: String) => void;
  handleDeleteNode: (a: String) => void;
  handleSortNode: (a: String, b: Boolean) => void;
  handleLikedNode: (a: String, b: Boolean) => void;
}

const Comment = ({
  comment,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  handleSortNode,
  handleLikedNode,
}: CommentComponent) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [sortOrder, setSortOrder] = useState(false);
  const inputRef: RefObject<HTMLDivElement | HTMLInputElement> = useRef(null);

  const handleComment = () => {
    if (text !== "") {
      handleInsertNode(comment.id, text);
      setText("");
    }
  };

  const handleReply = () => {
    setText("");
    setIsReplying(false);
    if (text !== "") {
      handleInsertNode(comment.id, text);
    }
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  // const startEditing = () => {
  //   setIsEditing(true);
  // };

  const handleEdit = () => {
    if (inputRef && inputRef.current) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    }
    setIsEditing(false);
  };
  const handleSort = () => {
    handleSortNode(comment.id, sortOrder);
    setSortOrder((prev) => !prev);
  };
  const handleLiked = (value:Boolean) => {
    handleLikedNode(comment.id, value);
  };
  useEffect(() => {
    if (inputRef && inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, [isEditing]);
  return (
    <div>
      {comment.id === "1" ? (
        <div className="flex space-between justify-center gap-8">
          <input
            type="text"
            className="p-4 border-2 border-black w-[350px] text-pretty font-semibold rounded-md"
            value={text}
            placeholder="type something to comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <ActionButton
            type={"COMMENT"}
            style={"bg-blue-400 p-2 rounded-md text-white font-bold"}
            handleClick={() => handleComment()}
          />
        </div>
      ) : (
        <div className="m-2 p-2 ml-4 bg-gray-300 rounded-md">
          {isEditing ? (
            <>
              <div
                className="min-w-[200px]"
                contentEditable={isEditing}
                suppressContentEditableWarning={isEditing}
                ref={inputRef}
              >
                {comment.name}
              </div>
              <div className="flex mt-5 gap-4">
                <>
                  <ActionButton
                    type={"SAVE"}
                    style={""}
                    handleClick={() => handleEdit()}
                  />
                  <ActionButton
                    type={"CANCEL"}
                    style={""}
                    handleClick={() => {
                      if (inputRef && inputRef.current?.innerText) {
                        inputRef.current.innerText = String(comment.name);
                      }
                      setIsEditing(false);
                    }}
                  />
                </>
              </div>
            </>
          ) : (
            <>
              {comment.name}

              <div className="flex mt-5 gap-4">
                <>
                  <ActionButton
                    type={"like"}
                    style={""}
                    handleClick={() => handleLiked(true)}
                  />
                  <div>{comment.likes}</div>
                  <ActionButton
                    type={"dislike"}
                    style={""}
                    handleClick={() => handleLiked(false)}
                  />
                  <ActionButton
                    type={"REPLY"}
                    style={""}
                    handleClick={() => setIsReplying(true)}
                  />
                  <ActionButton
                    type={"EDIT"}
                    style={""}
                    handleClick={() => setIsEditing(true)}
                  />
                  <ActionButton
                    type={"DELETE"}
                    style={""}
                    handleClick={() => handleDelete()}
                  />
                  <ActionButton
                    type={"SORT"}
                    style={""}
                    disable={comment.items.length == 0}
                    handleClick={() => handleSort()}
                  />
                </>
              </div>
            </>
          )}
        </div>
      )}
      <div className={`pl-[25px]`}>
        {isReplying && (
          <div className="flex gap-2 justify-start text-center">
            <input
              className="p-2 border-2 border-black w-[150px] text-pretty font-semibold rounded-md"
              onChange={(e) => setText(e.target.value)}
            />
            <ActionButton
              type={"SAVE"}
              style={""}
              handleClick={() => handleReply()}
            />
            <ActionButton
              type={"CANCEL"}
              style={""}
              handleClick={() => setIsReplying(false)}
            />
          </div>
        )}
        {comment?.items?.map((item: CommentItem) => {
          return (
            <Comment
              key={String(item.id)}
              comment={item}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              handleSortNode={handleSortNode}
              handleLikedNode={handleLikedNode}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Comment;
