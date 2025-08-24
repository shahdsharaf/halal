import React from "react";
import { Card, CardContent } from "@mui/material";
import SignInPhoto from "../../components/SignInPhoto/SignInPhoto";
import SignInForm from "../../components/SignInForm/SignInForm";
import SignInFooter from "../../components/SignInFooter/SignInFooter";

import "./sign-in.scss";

export const SignIn: React.FC = () => {
  return (
    <div className="signin-container">
      <Card className="signin-card">
        <CardContent className="signin-content">
          <SignInPhoto />
          <SignInForm />
        </CardContent>
      </Card>
      <SignInFooter />
    </div>
  );
};

export default SignIn;
