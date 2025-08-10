function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="https://icons.getbootstrap.com/assets/icons/list-task.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
          Todo list
        </a>
      </div>
    </nav>
  );
}

export default Navbar;