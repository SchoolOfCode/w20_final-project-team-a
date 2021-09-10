import "./LeftVerticalTitle.scss";

const LeftVerticalTitle = ({ title }: any) => {
  return (
    <>
      <div className="vertical-header-line"></div>
      <h1 className="vertical-header-text">{title}</h1>
    </>
  );
};

export default LeftVerticalTitle;
