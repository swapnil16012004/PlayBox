const Footer = () => {
  return (
    <footer className="mt-3" style={{ border: "0.08px solid black" }}>
      <div className="f-info">
        <div className="f-info-socials">
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
        <div className="f-info-brand"> &copy; GoStream</div>
        <div className="f-info-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
