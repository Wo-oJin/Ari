import styled from "styled-components";
import seeAll from "../../assets/images/seeAll.png";
import koreanFood from "../../assets/images/koreanFood.png";
import westernFood from "../../assets/images/westernFood.png";
import japaneseFood from "../../assets/images/japaneseFood.png";
import chineseFood from "../../assets/images/chineseFood.png";
import hairshop from "../../assets/images/hairshop.png";
import cafe from "../../assets/images/cafe.png";
import bar from "../../assets/images/bar.png";
import karaoke from "../../assets/images/karaoke.png";
import studyCafe from "../../assets/images/studyCafe.png";

const StyledIntro = styled.p`
  font-weight: 600;
  font-size: 24px;
  margin: 0 0 8px 0;
`;

function Intro({ children, ...rest }) {
  return <StyledIntro {...rest}>{children}</StyledIntro>;
}

const StyledStoreSearch = styled.input`
  box-sizing: border-box;
  width: 315px;
  height: 52px;
  padding: 19px 19px 19px 38px;
  border: 0.5px solid #c5c5c5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 0 0 25px 0;
  &::placeholder {
    font-size: 13px;
    color: #a3a3a3;
  }
`;

function StoreSearch({ children, ...rest }) {
  return <StyledStoreSearch {...rest}>{children}</StyledStoreSearch>;
}

const StyledSearchIcon = styled.div`
  position: absolute;
  top: 11px;
  left: 10px;
  color: #a3a3a3;
  padding: 5px;
  cursor: pointer;
`;

function SearchIcon({ children, ...rest }) {
  return <StyledSearchIcon {...rest}>{children}</StyledSearchIcon>;
}

const StyledBannerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 3px;
  margin-top: 20px;
`;

function BannerContainer({ children, ...rest }) {
  return <StyledBannerContainer {...rest}>{children}</StyledBannerContainer>;
}

const StyledBanner = styled.div`
  cursor: pointer;
  text-align: center;
  width: 150px;
  height: 30px;
  background-color: #386ffe;
  margin-bottom: 12px;
  border-radius: 10px 10px 0 10px;
`;

function Banner({ children, ...rest }) {
  return <StyledBanner {...rest}>{children}</StyledBanner>;
}

const StyledBannerText = styled.span`
  font-weight: 300;
  font-size: 13px;
  color: white;
`;

function BannerText({ children, ...rest }) {
  return <StyledBannerText {...rest}>{children}</StyledBannerText>;
}

const StyledSubIntro = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 40px;
`;

function SubIntro({ children, ...rest }) {
  return <StyledSubIntro {...rest}>{children}</StyledSubIntro>;
}

const StyledSelectIntro = styled.span`
  background: #386ffe;
  border-radius: 10px;
  color: #ffffff;
  padding: 4px 6px;
  margin-right: 3px;
`;

function SelectIntro({ children, ...rest }) {
  return <StyledSelectIntro {...rest}>{children}</StyledSelectIntro>;
}

const StyledBannerBox = styled.div`
  position: relative;
  width: 375px;
  height: 190px;
  img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function BannerBox({ children, ...rest }) {
  return <StyledBannerBox {...rest}>{children}</StyledBannerBox>;
}

const StyledBannerIntro = styled.p`
  position: absolute;
  left: 15px;
  bottom: 11px;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  margin: 0;
  color: #ffffff;
`;

function BannerIntro({ children, ...rest }) {
  return <StyledBannerIntro {...rest}>{children}</StyledBannerIntro>;
}

const StyledBannerNum = styled.div`
  position: absolute;
  right: 15px;
  bottom: 11px;
  border: 1px solid #ffffff;
  border-radius: 20px;
  padding: 3px 6px;
  font-weight: 600;
  font-size: 9px;
  line-height: 11px;
  margin: 0;
  color: #ffffff;
`;

function BannerNum({ children, ...rest }) {
  return <StyledBannerNum {...rest}>{children}</StyledBannerNum>;
}

const StyledCatecoryImg = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

function CatecoryImg({ children, index, ...rest }) {
  switch (index) {
    case 0:
      return (
        <StyledCatecoryImg src={seeAll} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 1:
      return (
        <StyledCatecoryImg src={koreanFood} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 2:
      return (
        <StyledCatecoryImg src={westernFood} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 3:
      return (
        <StyledCatecoryImg src={japaneseFood} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 4:
      return (
        <StyledCatecoryImg src={chineseFood} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 5:
      return (
        <StyledCatecoryImg src={hairshop} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 6:
      return (
        <StyledCatecoryImg src={cafe} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 7:
      return (
        <StyledCatecoryImg src={bar} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 8:
      return (
        <StyledCatecoryImg src={karaoke} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    case 9:
      return (
        <StyledCatecoryImg src={studyCafe} {...rest}>
          {children}
        </StyledCatecoryImg>
      );
    default:
  }
}

export {
  Intro,
  StoreSearch,
  SearchIcon,
  BannerContainer,
  Banner,
  BannerText,
  SubIntro,
  SelectIntro,
  BannerBox,
  BannerIntro,
  BannerNum,
  CatecoryImg,
};
