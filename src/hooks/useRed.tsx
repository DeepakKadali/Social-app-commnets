// reply,edit,delete custom hooks --didn't get better name:)
import { CommentItem } from "../common/types";
const useRed = () => {
  const insertNode = (
    tree: CommentItem,
    parentId: String,
    value: String
  ): CommentItem => {
    if (parentId === tree.id) {
      tree.items = [
        {
          id: String(new Date().getTime()),
          name: value,
          likes: "0",
          items: [],
        },
        ...tree.items,
      ];
      return tree;
    }

    let latesNodes = [];
    latesNodes = tree?.items?.map((obj: CommentItem) => {
      return insertNode(obj, parentId, value);
    });
    return { ...tree, items: latesNodes };
  };

  const editNode = (
    tree: CommentItem,
    currId: String,
    value: String
  ): CommentItem => {
    if (tree.id === currId) {
      tree.name = value;
      return tree;
    }
    tree.items.map((obj: CommentItem) => {
      return editNode(obj, currId, value);
    });
    return { ...tree };
  };

  const deleteNode = (tree: CommentItem, currId: String): CommentItem => {
    const deleteNodeRecursively = (node: CommentItem): CommentItem => {
      node.items = node.items.filter((child) => child.id !== currId);
      node.items = node.items.map(deleteNodeRecursively);

      return node;
    };

    return deleteNodeRecursively(tree);
  };

  const sortNode = (
    tree: CommentItem,
    currId: String,
    order: Boolean
  ): CommentItem => {
    if (tree.id === currId) {
      tree.items.sort((a, b) => {
        let res = parseInt(String(a.id)) - parseInt(String(b.id));
        return order ? res : -1 * res;
      });

      return { ...tree };
    }
    tree.items.map((obj: CommentItem) => {
      return sortNode(obj, currId, order);
    });
    return { ...tree };
  };
  const likeNode = (
    tree: CommentItem,
    currId: String,
    toggle: Boolean
  ): CommentItem => {
    if (tree.id === currId) {
      if (toggle) {
        tree.likes = String(parseInt(tree.likes) + 1);
      } else {
        tree.likes = String(parseInt(tree.likes) - 1);
      }
      return tree;
    }
    tree.items.map((obj) => {
      return likeNode(obj, currId, toggle);
    });
    return { ...tree };
  };
  return { insertNode, editNode, deleteNode, sortNode, likeNode };
};
export default useRed;
