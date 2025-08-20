import { NeedHelp } from "../../components/NeedHelp/NeedHelp";
import ContactUsForm from "../../components/ContactUsForm/ContactUsForm";
import "./contact-us.scss";

export const ContactUs = () => {
  return (
    <div id="contactUs" className="contact-us">
      <NeedHelp className="contact-us__needhelp" />

      <div className="contact-us__form">
        <ContactUsForm />
      </div>
    </div>
  );
};
