import { Link } from 'react-router-dom';

type NavbarLinkProps = {
  page: string;
}

export const NavbarLink : React.FC<NavbarLinkProps> = ({page}) => {
  let title = ""
  if(page === "/") {
    page=""
    title = "SCHOOL_OF_CODE"
  } else{
    title = page.charAt(0).toUpperCase() + page.slice(1);
  }
  return <Link to={`/${page}`}>{title}</Link>;
};