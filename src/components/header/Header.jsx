const Header = (props) => {
  return (
    <header className="header">
      {props.isAuth && (
        <div className="authorise-info">
          {props.login} - <button onClick={props.onLogout}>Log out</button>
        </div>
      )}
    </header>
  );
};

export { Header };
