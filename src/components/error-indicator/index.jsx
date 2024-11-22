import './index.css';
import icon from './index.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon"/>

      <span className="boom">An error occured</span>
      <span>(but we already sent droids to fix it)</span>
    </div>
  );
};

export default ErrorIndicator;
