import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const API_ENDPOINT = 'https://gorest.co.in';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <input type="text" id="fname"></input>
        </div>
      </div>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    //const category = this.props.category;
    return (
      <tr>
      </tr>
    );
  }
}

class ProductRow extends React.Component {

  editUser = (name) => {
   this.setState({showPopup: true});
    <div className="ProductRow">
      <label for="fname2">First name:</label>
      <input type="text" id="fname2" name="fname2"></input>
    </div>
  }

  render() {
    const product = this.props.product;
    const name = product.active ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td><button type="button" onClick={() => this.editUser(name)}>edit</button></td>
        <td>{'name: [' + name + ']'}</td>
        <td>{'active: [' + product.active + ']'}</td>
        <td>{'gender: [' + product.gender + ']'}</td>
        <td>{'email: [' + product.email + ']'}</td>
        <td>{'id: [' + product.id + ']'}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.active) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      console.log(this.props.products);
      this.props.products.map(function (x) {
      rows.push(
        <ProductRow
          product={x}
        />
      );
    return null;
    }
      );
      lastCategory = product.category;
    });

    return (
      <table className="ProductRow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th> 
            <th>Gender</th> 
            <th>Email</th> 
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <form className="ProductRow">
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      showPopup: false,
      users: [],
    };

    //React.useEffect(() => {
      fetch(`${API_ENDPOINT}/public/v1/users`)
      .then(result => result.json()) 
        .then(result => {
        console.log(result.data);
        let rr = result.data.map(
          function (x) { 
            return {
              name: x.name,
              //category: 'Sysadmin',
              active: x.status === 'active',
              email: '',
              gender: ''
          } 
          });
        this.setState({users: rr});
        //product = this.state.users);
        //{category: 'Sysadmin', balance: '$49.99', active: true, name: 'Sysadmin1'},
      });
    //};
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }


  render() {
    //console.log(this.state.users);

    return (
      <div className="FilterableProductTable">

        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
         products={this.state.users} 
         //products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
        {this.state.showPopup ? 
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    );
  }
}


ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
);



