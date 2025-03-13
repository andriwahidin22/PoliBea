import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault(); // Mencegah default behavior dari <a>
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      router.push("/login");
    }
  };

  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              <a className="sidebar-link" href="/admin/dashboard">
                <i className="me-3 far fa-clock fa-fw" />
                <span className="hide-menu">Dashboard</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="/admin">
                <i className="me-3 fas fa-file-alt" />
                <span className="hide-menu">Data Beasiswa</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="#" onClick={handleLogout}>
                <i className="me-3 fa fa-user" />
                <span className="hide-menu">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
