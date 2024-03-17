// UnfoldMore, UnfoldLess, Dismiss, Restore

const UnfoldMore = ({ onClick }) => {
  return <div onClick={onClick}>UnfoldMore</div>;
};
const UnfoldLess = ({ onClick }) => {
  return <div onClick={onClick}>Unfold Less</div>;
};
const Dismiss = ({ onClick }) => {
  return <div onClick={onClick}>Dismiss</div>;
};
const Restore = ({ onClick }) => {
  return <div onClick={onClick}>Restore</div>;
};

export { UnfoldMore, UnfoldLess, Dismiss, Restore };
