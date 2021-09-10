import React from "react";
import githubIcon from "../VisualAssets/SVGIcons/github.svg";
import linkedinIcon from "../VisualAssets/SVGIcons/linkedin.svg";
import personalWebsiteIcon from "../VisualAssets/SVGIcons/link.svg";
import twitterIcon from "../VisualAssets/SVGIcons/twitter.svg";
import youtubeIcon from "../VisualAssets/SVGIcons/youtube.svg";

const SocialLinks = (user: any) => {
  const userSocialLinks = [
    {
      link: user.githubUrl,
      icon: githubIcon,
    },
    {
      link: user.linkedin,
      icon: linkedinIcon,
    },
    {
      link: user.personalWebsite,
      icon: personalWebsiteIcon,
    },
    {
      link: user.twitter,
      icon: twitterIcon,
    },
    {
      link: user.youtube,
      icon: youtubeIcon,
    },
  ];

  const iconArray: any = [];
  userSocialLinks.forEach((social, i) => {
    if (social.link !== "") {
      iconArray.push(
        <a href={`${social.link}`} key={i} rel="noreferrer" target="_blank">
          <img
            src={social.icon}
            className="social-icons"
            alt="social media icons"
          />
        </a>
      );
    }
  });

  return <div className="individual-profile-socials">{iconArray}</div>;
};

export default SocialLinks;
