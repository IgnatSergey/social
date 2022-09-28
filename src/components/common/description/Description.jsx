export const Desription = (props) => {
  return (
    (props.description !== null && props.description !== "") && (
      <div className={`description-wrapper ${props.className}`}>
        <dt className="description-term">
          <b>{props.term}:</b>
        </dt>
        {props.type === "link" ? (
          <dd className={`description-definition`}>
            <a href={props.description} target="_blank">
              {props.description}
            </a>
          </dd>
        ) : (
          <dd className={`description-definition`}>
            {props.description === false
              ? "no"
              : props.description === true
              ? "yes"
              : props.description}
          </dd>
        )}
      </div>
    )
  );
};
