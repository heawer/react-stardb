
import { SwapiServiceConsumer } from "../swapi-service-context";

const withSwapiService = (mapMethodsToProps) => (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <SwapiServiceConsumer>
      {(swapiService) => {
        const serviceProps = mapMethodsToProps(swapiService);
        return <WrappedComponent {...props} {...serviceProps} />;
      }}
    </SwapiServiceConsumer>
  );
};

export default withSwapiService;
