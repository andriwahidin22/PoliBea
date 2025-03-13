const Header = () => {
    return (
      <header className="topbar" data-navbarbg="skin6">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header" data-logobg="skin6">
            <a className="navbar-brand" href="/admin/dashboard">
              <b className="logo-icon">
                <img style={{ width: "120px" }} src="/assets/img/logo.png" alt="homepage" />
              </b>
            </a>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item hidden-sm-down">
                <form className="app-search ps-3">
                  <input type="text" className="form-control" placeholder="Search..." />
                  <a className="srh-btn">
                    <i className="ti-search" />
                  </a>
                </form>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#">
                  <img src="/assets/images/users/image.png" alt="user" className="profile-pic me-2" />
                  Administrator
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  };
  
  export default Header;
  