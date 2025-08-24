import React from "react";
import signInImage from "../../assets/img/sign-up-img.png";
import "./sign-in-photo.scss";
const SignInPhoto: React.FC = () => {
  return (
    <div className="signin-image">
      <img src={signInImage} alt="Sign in illustration" />
    </div>
  );
};

export default SignInPhoto;
