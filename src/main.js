import React from 'react'
import {render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1 className="text-center">Products</h1>
        <ProductForm/>

      </div>
    );
  }
})

const ProductForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  addProduct: function() {
    this.props.addProduct(this.state.text);
    this.setState({text: ''});
  },
  onInputChange:function(event) 
  {
    this.setState({text: event.target.value})
  },
  render: function(){
    return (
      <div className="text-center">
        <input type="text" value={this.state.text} onChange={this.onInputChange}/>
        <button onClick={this.addProduct} className="btn btn-info">Add Product</button>
      </div>

     
    );
  }
});

const Product = React.createClass({
  getInitialState: function() {
    return {
      products: []
    };
  },
  addProduct: function(text){
    let product = {
      text,
      id: uuid()
    };
    console.log('product:', product);

    this.setState({
      products: this.state.products.concat(product)
    })
  },
  render: function() {
    return (
      <div className="text-center">
        <h1>Products</h1>
        <Product addProduct= {this.addProduct}/>
      </div>
    );
  }
});


const Root = React.createClass({
    render: function(){
        return (
            <div className="text-center">
              <Product/>
            </div>
        );

    }
});



render( 
  <Router history={browserHistory}> 
    <Route path='/' component={App}>
    </Route>
  </Router>, 
  document.getElementById('root')
);

