import React from "react";
import "../../styles/payment-successful.css";
import SuccessTick from "../success-tick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

class PaymentSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlock: true,
    };
  }

  hideBox() {
    this.setState({
      showBlock: false,
    });
  }

  render() {
    const styles = this.state.showBlock
      ? { display: "block" }
      : { display: "none" };
    return (
      <div>
        <div class="split left">
          <div class="centered">
            {/* <img src={pic2} alt="Avatar woman" /> */}
            {/* <SuccessTick /> */}
            <div class="more-width">
              <lottie-player
                src="https://assets3.lottiefiles.com/packages/lf20_7W0ppe.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>

        <div class="split right">
          <div class="centered">
            {/* <img src={pic1} alt="Avatar man" /> */}
            <div class="pt">
              <img src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M=" />
            </div>

            <p>Show the above QR code and exit the store</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentSuccess;
