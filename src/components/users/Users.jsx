import cn from "classname";
import userPhoto from "../../assets/default-avatar.png";
import { NavLink } from "react-router-dom";
import { ButtonFollow } from "../common/button-follow/ButtonFollow";

export const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const startRangePages =
    props.currentPage % props.countPagesPortion === 0
      ? (props.currentPage / props.countPagesPortion - 1) *
          props.countPagesPortion +
        1
      : Math.floor(props.currentPage / props.countPagesPortion) *
          props.countPagesPortion +
        1;

  const endRangePages = startRangePages + props.countPagesPortion - 1;

  const changeStartRangePages = () => {
    if (props.currentPage !== 1) {
      props.onPageChanged(props.currentPage - 1);
    }
  };

  const changeEndRangePages = () => {
    if (props.currentPage !== pagesCount) {
      props.onPageChanged(props.currentPage + 1);
    }
  };

  return (
    <>
      <div className="users__pagination">
        <button
          className="users__pagination-batton"
          onClick={changeStartRangePages}
          disabled={props.currentPage === 1}
        >
          back
        </button>
        {pages.map((page) => {
          return (
            page >= startRangePages &&
            page <= endRangePages && (
              <button
                onClick={() => props.onPageChanged(page)}
                className={cn("users__pagination-batton", {
                  "users__pagination-batton--active":
                    page === props.currentPage,
                })}
                key={page}
              >
                {page}
              </button>
            )
          );
        })}
        <button
          className="users__pagination-batton"
          onClick={changeEndRangePages}
          disabled={props.currentPage === pagesCount}
        >
          next
        </button>
      </div>
      <div className="users__list">
        {props.users.map((user) => {
          return (
            <NavLink
              key={user.id}
              className="users__card-link"
              onClick={(evt) => {
                if (evt.target.tagName === "BUTTON") {
                  evt.preventDefault();
                }
              }}
              to={`/profile/${user.id}`}
            >
              <div className="users__card">
                <div className="users__description">
                  <img
                    className="users__photo"
                    src={
                      user.photos.small === null ? userPhoto : user.photos.small
                    }
                  />
                  <div className="users__description-text">
                    <p className="users__description-name">{user.name}</p>
                    <p className="users__description-status">{user.status}</p>
                    <ButtonFollow
                      isFollowed={user.followed}
                      id={user.id}
                      isFollowInProcess={props.isFollowInProcess}
                      onUnFollow={props.onUnFollow}
                      onFollow={props.onFollow}
                    />
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
