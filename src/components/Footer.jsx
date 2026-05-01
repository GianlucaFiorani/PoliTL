import { BsGithub, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="my-5 border-top border-black border-3">
      <div className="mt-4 fs-1 gap-2 d-flex align-items-center">
        <a href="https://www.instagram.com/garegnano_basket/">
          <BsInstagram className="pop text-black" />
        </a>
        <a>
          <BsGithub className="pop text-black" />
        </a>
      </div>
      <span className="chakra-petch" style={{ fontSize: "small" }}>
        © 2025-2026 Polisportiva Garegnano DR1
      </span>
    </footer>
  );
};
export default Footer;
