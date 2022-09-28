export const ButtonFollow = (props) => {
  return (
    <div className="users__followed">
      {props.isFollowed ? (
        <button className="button-follow"
          disabled={props.isFollowInProcess.some(
            (userId) => userId === props.id
          )}
          onClick={(evt) => {
            props.onUnFollow(props.id);
          }}
        >
          unfollow
        </button>
      ) : (
        <button className="button-follow"
          disabled={props.isFollowInProcess.some(
            (userId) => userId === props.id
          )}
          onClick={(evt) => {
            props.onFollow(props.id);
          }}
        >
          follow
        </button>
      )}
    </div>
  );
};
