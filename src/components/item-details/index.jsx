import React, { Component } from 'react';

import ErrorButton from '../error-button';

import './index.css';

export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  }

  render() {
    const { item, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <div className="row g-0">
          <div className="col-md-4">
            <img className="img-fluid rounded-start" src={image} alt="item" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{name}</h4>
              <ul className="list-group list-group-flush">
                {
                  React.Children.map(this.props.children, (child) => {
                    return React.cloneElement(child, { item });
                  })
                }
              </ul>
              <ErrorButton className="btn btn-danger mt-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
