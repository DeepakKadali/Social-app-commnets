import { useEffect, useState } from "react";
import Comment from "./components/Comment";
import useRed from "./hooks/useRed";
import { CommentItem } from "./common/types";
const dataStructure = {
  id: "1",
  name: "",
  likes:"0",
  items: [],
};
function App() {
  const { insertNode, deleteNode, editNode, sortNode, likeNode } = useRed();
  let initialData = dataStructure;
  const storedCommentData = localStorage.getItem("commentData");

  if (storedCommentData !== null) {
    initialData = JSON.parse(storedCommentData);
  }

  const [commentData, setCommentData] = useState<CommentItem>(initialData);

  const handleInsertNode = (parentId: String, value: String) => {
    const result = insertNode(commentData, parentId, value);
    let temp = { ...result };

    setCommentData(temp);
  };
  const handleDeleteNode = (currId: String) => {
    const result = deleteNode(commentData, currId);
    let temp = { ...result };
    setCommentData(temp);
  };
  const handleEditNode = (currId:String,value:String) => {

    const result = editNode(commentData,currId,value);
    let temp = {...result}
    setCommentData(temp);
  }
  const handleSortNode = (currId:String,order:Boolean) => {

    const result = sortNode(commentData, currId, order); ;
    let temp = {...result}
    setCommentData(temp);

  }

  const handleLikedNode = (currId: String, toggle:Boolean) => {
    const result = likeNode(commentData, currId, toggle);
    setCommentData({ ...result });
  };
  useEffect(() => {
    localStorage.setItem("commentData", JSON.stringify(commentData));
  }, [commentData]);
  return (
    <div className="m-4 p-4">
      <Comment
        comment={commentData}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        handleSortNode={handleSortNode}
        handleLikedNode={handleLikedNode}
      />
    </div>
  );
}

export default App;
