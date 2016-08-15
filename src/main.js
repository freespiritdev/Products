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
      text: 'Test'
    }
  },
  addProduct: function() {
    this.props.addProduct(this.state.text);
    this.setState({text: ''});
    console.log('kek')
  },
  save: function(){
    this.setState({editing: false});
  },
  onInputChange:function(event) 
  {
    this.setState({text: event.target.value})
  },
  render: function(){
    return (
      <div className="text-center">
        {this.props.children}
        <input type="text" value={this.state.text} onChange={this.onInputChange}/>
        <button onClick={this.addProduct} className="btn btn-info">Add Product</button>
        <button onClick={this.update} className="btn btn-default">Update</button>
        <button onClick={this.remove} className="btn btn-danger">Remove</button>
      </div>
    );
  }
});

const ProductList = React.createClass({
  remove: function(){
    this.props.remove
  },
  render: function() {
    let products = this.props.products.map(product => {
      return <li key={product.id} onDoubleClick = {this.remove}>{product.text}</li>
    });
    return (
      <ul>{products}</ul>
    
    );
  }
}) 

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
  update: function(newText, x){
    let array = this.state.products;
    array[x] = newText;
    this.setState({products: array});
  },
  remove: function(id){
    let array = this.state.products;
    arr.splice(x, 1);
    this.setState({products:array});
  },
  render: function(){
    return (
      <div> 
        <ProductForm addProduct={this.addProduct}/>
        <ProductList products={this.state.products} remove={this.remove}/>
      </div>)
  }
});




const Root = React.createClass({
    render: function(){
        return (
            <div className="text-center">
              <Product/>
              <ProductForm/>
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

