import userPhoto from "../../assets/default-avatar.png";
import { ButtonFollow } from "../common/button-follow/ButtonFollow";
import { Desription } from "../common/description/Description";
import { ProfileEditMode } from "./ProfileEditMode";
import { useEffect } from "react";

export const Profile = (props) => {

  useEffect(() => {
    return () => props.onToggleEditMode(false);
  }, []);

  return props.profile !== null && props.isEditMode ? (
    <ProfileEditMode {...props} />
  ) : (
    <div className="profile-card">
      <img
        className="profile-card__photo"
        src={
          props.profile.photos.large === null
            ? userPhoto
            : props.profile.photos.large
        }
      />
      <div className="profile-card__description">
        <dl className="profile-card__description-list">
          <Desription
            className="term-name"
            term="Name"
            description={props.profile.fullName}
          />
          <Desription term="Status" description={props.status} />
          <Desription
            term="Looking for a job"
            description={props.profile.lookingForAJob}
          />
          <Desription
            term="Looking for a job description"
            description={props.profile.lookingForAJobDescription}
          />
          <div className="profile-card__description-contacts">
            <dt className="header-contacts">
              <b>Contacts:</b>
            </dt>
            <Desription
              term="facebook"
              description={props.profile.contacts.facebook}
              type="link"
            />
            <Desription
              term="website"
              description={props.profile.contacts.website}
              type="link"
            />
            <Desription
              term="vk"
              description={props.profile.contacts.vk}
              type="link"
            />
            <Desription
              term="twitter"
              description={props.profile.contacts.twitter}
              type="link"
            />
            <Desription
              term="instagram"
              description={props.profile.contacts.instagram}
              type="link"
            />
            <Desription
              term="youtube"
              description={props.profile.contacts.youtube}
              type="link"
            />
            <Desription
              term="github"
              description={props.profile.contacts.github}
              type="link"
            />
            <Desription
              term="mainLink"
              description={props.profile.contacts.mainLink}
              type="link"
            />
          </div>
        </dl>
        {!props.isMyProfile && (
          <ButtonFollow
            isFollowed={props.isFollowed}
            id={props.profile.userId}
            isFollowInProcess={props.isFollowInProcess}
            onUnFollow={props.onUnFollow}
            onFollow={props.onFollow}
          />
        )}
      </div>
      {props.isMyProfile && (
        <button
          className="button-edit"
          onClick={() => props.onToggleEditMode(true)}
        >
          Edit profile
        </button>
      )}
    </div>
  );
};
