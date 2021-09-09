import {useState} from 'react'
import { Link } from 'react-router-dom';

type NavbarLinkProps = {
  page: string;
  selected: boolean;
}

export const NavbarLink : React.FC<NavbarLinkProps> = ({page, selected}) => {

  const title = page.charAt(0).toUpperCase() + page.slice(1);

  return (
  <>
  <span className={!selected?"link-brackets-hidden":"link-brackets-visible"}>{`{ `}</span>
    <Link to={`/${page}`}>
        {title}
    </Link>
  <span className={!selected?"link-brackets-hidden":"link-brackets-visible"}>{` }`}</span>
  </>
  )
};