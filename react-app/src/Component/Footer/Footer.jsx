import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./Footer.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      // await axios.post("/api/subscribe", { email });
      await axios.post("https://bharatbazaar-45ug.onrender.com/api/subscribe", { email });

      toast.success("Thank you for subscribing! Please check your email.");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Subscription failed. Try again later.");
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter">
        <h2>Join Us & Get Updates</h2>
        <p>Sign up for exclusive offers, latest news, and updates</p>
        <div className="newsletter-input">
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe →</button>
        </div>
      </div>

      {/* Footer content below remains same */}
      <hr className="divider" />
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="logo">BharatBazaar</h2>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaPinterestP />
          </div>
          <p>© 2025 BharatBazaar All Rights Reserved.</p>
        </div>
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="/somepage">About Us</a></li>
            <li><a href="/somepage">News & Blog</a></li>
            <li><a href="/somepage">Careers</a></li>
            <li><a href="/somepage">Contact Us</a></li>
            <li><a href="/somepage">How To Shop</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Orders & Returns</h3>
          <ul>
            <li><a href="/somepage">Shipping & Delivery</a></li>
            <li><a href="/somepage">Return & Exchange</a></li>
            <li><a href="/somepage">Track Order</a></li>
            <li><a href="/somepage">Selling Tips</a></li>
            <li><a href="/somepage">Payment</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li><FiPhone /> (702) 555-0122</li>
            <li><FiMail /> electro@example.com</li>
            <li><FiMapPin /> 4517 Washington Ave, Manchester, Kentucky 495</li>
          </ul>
        </div>
      </div>
      <hr className="divider" />
      <div className="footer-bottom">
        <div className="policies">
          <a href="/somepage">Privacy Policy</a>
          <a href="/somepage">Terms of Use</a>
          <a href="/somepage">Shipping Policy</a>
        </div>
        <div className="payment-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
          <img src="data:image/jpeg;base64,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4ha0+r8TqDRkUsUbqipmYXPLQXhsjnVVQAeAIBB6URZ/jDbXxNt0iybdu/E3PdmLHoVd6Y0LE7SDKanoqeeGmgdI6AlscQkqX5PzBBdaI9q5un6eI1babxOEtZA2mjjxNFNBU1OKU4nWyNmixAzPSgth8oG8gdJAXrHAi4II5+CrOq0Q59XDSmnZpAUNFHG8SvDWGSU+ecQNzhj6sS+et+n44YxR07oqUUrGTPjZezpWuEjaVhaLW3uccvyjibNC0SsI6hjgS1zXAbyCCB02UUr3iurmUrnHxdtM2pewEjbmRxEbXEZljQ0kjcSRda2uOh6elop3UsMcM07W0jdmMOLbPawXAyvne5CKmrJ2nIOaeggr6KL6oaEZAXO8Rp6N2FrA6N7XveOOIhotmB03UoUBERAREQEREEan1JpXOkN6hrJXl8kLZntp3uPnF0YPHiNxXUi0RE2o8YAIeIhA0fkawOxWa3hnbsC6KIOZXaChkdI8tLXywmB72mzyw8L844FeUmgoY5Y5WhwMUAp2C/JbGCDkOc2GfsXURByqvQMUkssrjJilg8XJDrWju4nB6JJcc+haMGqETYXwbWrdHJEYMDpiWtYQBZgtyTYWvzKRogj9DqjBG9j3OqJzFbZiaV0jGECwc1h5IIG42uOC6WmNGMqYTDLiwOLSQDYnC4OAJ5iQLhbyIOfVaKjkmimficYcRY2/9MOcLY8PFwFwDwuUfoqM1IqeUJBEYcjyS0uDsxxIO4+0roIg4rNWoBSspP6myY9r7YuU8tftLPP5gXZkcVuHRUW3dUYBtXxiIv44AXENHNm493Mt5EEYGpMA2WCSrjMUIgYWSlpwA3sSBmb/ACC6tLoaNk/jAMjpNiyC7nYuQwlw/USSSeOS6SINNmjImzuqA0CV7BG543ua0ktB6L71oDVin8TNGQ8xElx5REmIv2mPGLHFjzuu2iDlaH0DFTFz2mR8j7B0sj3SSuDfNbiduaLnIZZlfLSGrcMzqhz9pephbA8h1rRtxHCzLk3xOufau0iDSrNFRS05p5GB0TmYC0+iBYW5iMs/YsJdExumhlOLFAHCMX5AxgNJI4mwt1ldBEHAqdVY31D6gS1cb5MGMRyljTgFmiwG4C/aVlVarU8jahrg8+MyNme7Fyw9gaGGM/lw4G26+dd1EHOotEsifNI0vxzlrnuJubtYGNw5ZAAXtzkrGi0HDFTGmaDgcHhxJu95kvjc53FxJJuumiCPTao07mQAGdjqdgijlZI5kwYABhc8ecMhkUqNUIHQtixVIwy7fHtXGZ0gFg50jrk2G4cLDmUhRBp6KoBAzAHzSZk4pXl78+GI8PYtxEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//Z" alt="PayPal" />
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAABF1BMVEX////u7u7t7e0HJlT39/fz8/P6+vr7+/szlf8AAEEAADMAAD/09PQAADgGJVOwuMUAC0X9/PgAADIAADYAADsAAEMAG0wAF0p4hJuapLaurrIAIE8AAC/9+vOfpLEAIlIAFEkAACwAhP8AEEempq6lzfmyuMLa3uSoscASiP8gjf8AACnT2OA6RGXDyNCTk56UnrFPW3dHTmpkaX+3v8wAACMWIk7S1+CGjZ59gZFfbos+VHgSF0Ntdoy+2PRuqfUAf/+Tw/lZpf7z8OfQ4vfC0efe5fB3s/yayP1MnP3t9f2wz/gsP2SKt/ldY3rB3PgoMldjdZIAAAksQmmnwOkzNlWChpYgKFBvc4UkKEyBrfAAAEo2SW0kW5WUAAASLUlEQVR4nO2djX/SyNbHh5CXhoSYFAhFykulElpphBZLSoteu31cV2sXH6/We7f//99x55yZhEktW6hbjTrz2c/uOnmZ33xz5sw5J4CECC03b4rYrwn9utBvK/N+VehX5/05Teg3hP6cOIDQnxo4C4JS/ZlQJBFJRBKRRJQFRRKRRCQRSURZUCQR/eiIFKGlFAn9aUXzllY0b2lF85ZWtGDgbAha9KCE/pwhqhP6UyqEflvo14V+Ud3CB7WERX1bQcsgUlKKbrdlJaVogY1/DaJvK2h1REJ/NhDdtyCJSCKSiCSiLAiSiCQiiUgiyoKghWlQTuhPB7O3p0FpRTenR+LAS+Vr301QqgkYF6ZBqaxR6P+q9EgcONOCFtceBJtdsfag3E8x5BsKkvUiiUgikoiyIEgikogkIokoC4IkolURLUiPvtt7tGwI0oRmCE3s14V+W+hXhX51iX5b6NeXGTgTghYXQwSb/YdeWylfVwz5XoJkvUgikogkoiwIkogkIolIIsqCIInodkTLpEe/+Hs0XWhiurOoXxX61SX67SX6U+lR5gSlcIlpkNh/D6+tlJXzsu8lSNaLbhUkEUlEEpFElAVBEpFEJBFJRFkQJN+jLSHIFpoqtEX98QHdU27sX3T+3/UvNfBtgv7J/tSBuybWWuP188YvkukvWu5i/5flmYby4l8vG79IveguiOzG89Odf/2mSUQ3K1JyjbN3a7u7Lxq/StVxZURe4/na7trazkuJaIEir3+6Qwmt7fyfRHSzojfUC1FAa7un2vUNRCLC9urFLpgQRfS7/cu8AVkF0dnrNTQhQPTYW2RF18OQXwnR2R8xINrONKZIV681erKo9CdAtHQw++YtX2NoRP/9LYdWFJwXTcsyLdNk/6pWJlFXHOEniK6vG8HNzWucvdiZE1rbfeex/KVZqjv1llN3Wuy/vt+xihdd4i133x+hpXAtSqxzjdzrNQEQuCLotxUjMvNftLrbHnjaDQ/qB830U4oWuIHGYw5oZ+2UI3qLinLqsINUnLgxSK3NcVyK+dnqRYsQvWB+evfFn6eM1WkDFXlhuQWAXDNuPoNUfE9+MUQYLu6cvm2cMVaPXjJFJCoCkE7UjNvMREbV4S+G6DcKZnfnxatGjGjnT45o4sKyKgYkFto/Qkbte0aEziNLiF7vrD06fezlct5LbkWs3/MqPpjMnqIlisazOu3yY0Sp/XZlRNqifo+OfQMib35BCpEhjLuqoOUQvXi09u6NN44Cj7ntnd/5gUGBrTN1rijYB2ouQ6TkVE8Lut1u3+ZMPU+FaWiqJw4A/Z4tDGwHIVyl6Mmk04j69KBKp0sv411qMOp2w9z8fC5IwxupFCgNXWB4EWmCiOpJCVoV0Zu1tece6V5+8p4/YuvsdYyoDM7a7AqIwkOwovIAR1HJePuzVSoWKtM+PbQNLQo0xVaa2w+FBv3NrhYPHD6cdoq0lc+j0ODRsEIvx1M1onQPrFKhpHhql15H++ja6R65xWLBGnZzsXWhoABOLZbcaZcY/ac4/IgQNva2EiNSVKqHdm5374ro7csz0v9UXX/a+J2vs+f8yEEVXNFhKCDqWtD1bAyjEK05K3UoMqduzULy/lnFNIt7FJE+alvmtbYZwQ8L0MA5PJpZHR9DCd+8nCpsHgqZbNGz1odG78Ki92xfqTb5vE67ngzpJZuuD8O0zWngKTEitbaPw+frljkiR3BysRgSkt+k/2c9CxNEpLtJ9ZT+P7yzFVFzOTf9y9BjiHb/eMMOPDgE1+xO1XlhRDmHyVlDArcY7bk8CKAO/DLAGKr9ma40Uut8EXCWa9ReFKP//tKsC2Fo5TwEO1J0Bfye40a9sgv3LA+JPd6DwYq18NCKh2mVjxVkRAUFV1Y17vdn4VPYWtz3YPwl6DJjRAqdiA+7TnOJhbYgpgw+rPv56mei8ELIv/m67aGCzgDeNLG0KcjD3P16QAcnva0q2kLL9+mkO8NDFPaJ+hz7c9uh4Sb804rnsE+XX04PZiWYNmQydTa98gbqIhvg95z8cZtdYfY9uwmwnPygUHd832/xqLWHsXFO75tWPr4Vvf/xFZAvAaIH6ELLD3l0rep/tel51mTuyVPRtZiN3PQmySC55iG4nM4B7GwstMYjOonQFqpR0O/3x/3xuLvttkFUuUmheYGLk/Wt6t5enloG8nT8HrFV7aBUpqZeoQlwhZtMcUJUWw/2MIqoVmZ7e7MKMmrtBQbVQzbKbO05eZoGtn0r8IynmP04bd816ekWu1P7HN8N0gS7zczQ39ujhum08fBmjaikx3aZIZ8x2YDorr0fkBtJ3JYe2SQ8wJ0dPPC7nbgQgsmOeoSI6uf7e9hmFjvTmkLsEezjQzRn22EQjJtMYb71kfptooZd2GhoC7t5ANGyqED68PZh0q3CcTgOgv4UQyzHYvaPOyU96JY6B9GwkqcTYuPnq1bUpUOE6HbyzlaAdrDv4jE3CvtBP+IL28+rhuKNMOCtflBZjBSeUAP0T0bzVbR8vQhSvujS5DlFz3uxy9IQvlH2z5lqasnY2Mqobh7jyE30DwV4NjaNYzZQcb4ziQfAjZ4YQx+hXOHgE7CU1vrUpoag6WSKEzOfot874etoGgaqrgV9WNXIpF1tGp5mazzUz2+O4PwIja7c6ut0eIO8xz9CMEI9m1bC2M1U0GH0z8EflCZkof/5G0SeWpsVuMNrz9S33BW9bODZ3nbiJJPWalt7A/Zo0DdYExqRgLf1ArYOCjVhuWtecAWes16N0A08eFJHiipzuMYI5+UioggRt6qRQWNl5vh6RdY1wk/QKp428xNEygzm3fnggeela8EuOnwpUETGFG+2OQZE6ic45J7nxFrbcoiotQXRk3Y8+VJEHseuiAV5+ifrOqF6/mCgEI3OV52WHWb0bGC7zxCtj+aIciTcM/Fx8njkqsN8At+29TcnToxIZ7PqbOiewquOfHwqjH3GWDEiK0F0DHTrlyHuWRDiWz6uswBKal4T2W8GgOjTugMbnnKHwqxqjPZLczOhc3vHrehtg816iPyqhRK0MsYf+RHUZqiioAh/No/iOqjKrMhvJwPQs3rnMCff4YTCS4w6I65JUXNzROxY62Pg5eLCrG7irOsKz8wU7r4BETu9csR+wwkE4UbZoV6SIiKM5To4rWDLYRvM6oiIOjlszwm1nvXPeGH2D03DCWCgQhNW2M/6YYSbcfsjOD2qCPcfZz3kiOKFRnfwuNl6rQNW41o93oNWQSmo8ZR7zJ8AolEHtBQHzEciohD3JWtjnkUcwzOrb9F5bAAsp9MzEkQFFsLZaEWhBWKLEb3LBVin+VlfHZEXrJeFCI7ukIRn+Wu/N9B42VYJD521GtoUXSY2KPLhT+2LXIJoXMFVMZgPPAULd8yrkDBFAXpud5JoZS6+dQkxbw83DYh5EkS4dTvF0ONEvQAV05iSIgL4/oVqx4gG63lMlbC8rwUOPt0PhE2iPoMhVrYiFoEmrdgl3Fvv/MnWGTlGGbP4qjGG2k6h6wEi3IAr3fiFg0KmaCLlfnz/4AKcfd29CAhXNMK4wEwQacYUOR+AyR0BLd9luT9DdMXcTZ8nrtQ2ClwpGX9soc3E+RovbNVbIROk4V5JH3sTPeYztOOVEfGKa+yHabTOXNHuo1ceG7XUwtXNQ1LPwP3EsUJANH4CV5kPY0Sax3aYi6QgMERxpaeKHit6yJxtLy6jqOElbopgpso+XO7yWiYiGndwZR/kYkR8cRfCOOBwB8mtgo/ot4YBE6Tj/uhO1L0qGOKRcSdEe76IqHoeEFaT3XnHt/wH60gh4sUFlbBotjIw4KHhwUqMSCE99PzJ2eE+LJxWYaqhr2WI0NluJVVvPtEShAk9/N/ihoCIOarOka5xDOQvXKhH9Ck08VblXnIrlhN2gPYcUWs2gfPa52ziqyLikVrcKtvkFS+EPI5dEazEVjvexFXyHn1Tewi+CKuRiRUpRnCJNYEKT6XDPFhMpx6pGNGkEPF9mkYEuPCKx3BsAufXK4o3R8RiUbAivq8zQS5sjxxRjRNVx+dxgoDv0XJqxAJ3AFf3uSihYplGdPNXwchRJYXI3Ca8xL/z3MNve3m45dc7I/6Ntjjz8fOarRJ8PLhdq/DLHLkLXETV4StDp6FftA5Juzmj184H5ojKE5Rkkz5GMtWPY0IvQb/XHs6/a2aQA0RU9/s6uwOLra2pYegcUeeC4BfO9BxPZajjZ99BM0ZJ+pyn+c0X30FLfTctbVHzHOWoKhJqtUZxIeSUvwkN/wOj+rCB8ddWI1xcTolmHGwDydfrbLsLD7B+AauChuzBBnqx6uf+fGQdg3VEfDXGntEQENStLo0xjX4BvdKnWK6m2ME+y8gqR/jI+xuHoBgqNjTmZIhaMxZwhVOWBrQvDI2/R1OGsR/pXPEZrPgezQ72U67IP7AbbMffecvP7VXZ6uZl4QQRBGSqET5h15WnG7TNGKF85alHN9yJiU/Qn0QbSQvtnDpiZQ73I3RMD7EwYE1tLV7UTjkpCmo5r8lTR8ccwvl7rGKwuQGT0HGjok/hEoafJlkmujKWun7mJuD7yV9ikUJ0q1/yts1U+lU58l7H64yfG+FKdAdJbVNEZJMWk+D4Lm2dep0VQh7odJ9yebyFh1hbb+qKph5Y8/4q4GqVDmwb/N57sKjqQfJAtZz6yWUzpI8JzmfUy+9tiDttjRtJqw3H6j4bsSAiYo6kXhjMw7AVEaVdUbVH+DrbPWOncjM7GekJojHLeAERDfGF3KV+0pzCFPz/hCrdCdsp+ji1oWLT5RHmU6vbMQ8jFWas5jCecD8lQqm7+Iwx0/HGPE9stQ8jm/l6UivO4956aTqBk6v5QE8QbbAX7ebQtu+GSGVliGQKM8Vmb6p3T3lNNsS1U6WrO1loBEto+VJIEWm5YZEv1VanMOiz1yJTerZ+5F4nlHdxeeRI99xMvGi9Y12M8MUYTUQwnDCjRKjGbdGdKHvxw2yVrkKb5y6aERU4I6dTfcoiRYsFpQzRgzgXmOf3KyHywifrBaFtzcjz3Uc7tD36L4/9mnBG6VnyXpoiMv7ahJOfTSCTVZWNUsmqVssFqlxvPoP7bcEmrFxtYdpbEu6/GbHbkP7EKpQ6cFVh8zjMsRSeuqIneP48edEMnqsPSHgFV5RL65UNJXmlqGh6VF4vV6tWYX0/JOEWpNrPpgIiDJSck55+M4rbENFQflB7ILRazzt7zNqfrGytj3q0vzcYeXNEJOyxk1GpTcLBJJ+f9AK6BQZ4u1qg0hMHNdbE+wf815Y9Mq4Nzi/zw1ENLuOC1BGe35vvLRqre1Q/qJ5BRtF5/kPvAaTtyaKh+1b/AQ4f0vuEOOaARVWIaISBe/FAeDe5mhUpqdduqElrsKalw4TkXl+8H05/vGl+9k3dydTSH4WJBX15ia2h2+oMjesfnlkwM2zscWLReA/WmXulqgsuuN0XffFxnlwSMl37OE9yxZev0KGseMPX4m/8OI8w8g2CvgxPQgyUKjTkWPKdvpJ8CkCDIgMEBfVquMynCX/Q76OxOoRTHnsLrejvBNVg73XWn/6TX9kTRv62v/awCNEVZj9uX1sZERUUnsAqNQ+UpQTlSCZ+OnGZfkEQLzh2pra9uiBVx9SmOgvJcoKy9wHVJQQZtSKGlr07CYogtakf9rzrv+u4QNAP+ftFBD+E6rCi96qCxvD+HgsKP/FPPKmv9n3HcfyP4zsI6p93HCdfdTFI+mkR6TWr6p+cWEd3EdQq+/6JX2wKkfZPiEgNaj1o4zsI4pf2khjp50SU+rjiyoJYjdH+yRF9pSCaS8fvoSSif0SQRCQRfQ9ES6RB9/Or6d9LkDhy6sB9/xVk4gfqUwNnTlCqLUqPfvG/CV1sAsZs14uy900iiShTiiQiiUgikoiyoEgikogkotUV3dPfPvwNBa2M6KvSo4Vp0FcgundBuUy8R1sqL/tugmS96FZBEpFEJBFJRFkQJBFJRBKRRJQFQRLR7YgyF+9nTtBSuOR7tKQtWnSyXpQpRRKRRCQRSURZUCQRSUQSkUSUBUUZR5S5eD8bghY9KKE/tyCx/qpPX35Npv9tBX3LDxXfUzHkvgXJepFEJBFJRFkQJBFJRBKRRJQFQRLR7YgWpUFZ/kGMb/xXyKVUCG1RGnQf35Zb+DW9zAlaXHsQbDYbHyr+hoJkvUgikoi+BaL/AYkUTEALqu+BAAAAAElFTkSuQmCC" alt="Apple Pay" />
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Pay_Logo.svg" alt="Google Pay" /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
