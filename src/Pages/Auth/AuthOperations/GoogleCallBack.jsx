import axios from "axios";
import { useEffect } from "react";
import { baseUrl, GOOGLE_CALL_BACK } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
  const location = useLocation();
  const cookie = Cookie();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLE_CALL_BACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("token", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, [cookie, location.search]);
  return <h1>GoogleCallBack</h1>;
}
