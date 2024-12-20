import PropTypes from 'prop-types';

import { withData } from '../hoc-helpers';
import SwapiService from '../../services/api';
import './index.css';

const ItemList = (props) => {

  const { data, onItemSelected, children: renderLabel } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);

    return (
      <li className="list-group-item"
          key={id}
          onClick={() => onItemSelected(id)}>
        {label}
      </li>
    );
  });

  return (
    <div className="card">
      <ul className="item-list list-group">
        {items}
      </ul>
    </div>
  );
};

ItemList.defaultProps = {
  onItemSelected: () => {}
};

ItemList.propTypes = {
  onItemSelected: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);
