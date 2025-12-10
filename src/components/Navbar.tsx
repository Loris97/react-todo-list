function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ minHeight: '50px' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img 
            src="https://icons.getbootstrap.com/assets/icons/list-task.svg" 
            alt="Logo" 
            width="28" 
            height="28" 
            style={{ filter: 'invert(1)' }}
          />
          Task Manager
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
