import { useState, useEffect } from "react"
import '../components/Home.component.css'
export function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  //Function to fetch only selected category
  function selectCategory(event) {
    if (event.target.value == "all") {
      fetchProducts();
    } else {
      fetch(`https://fakestoreapi.com/products/category/${event.target.value}`)
        .then(res => res.json())
        .then(data => setProducts(data))
    }
  }
//Function to fetch all products
  function fetchProducts(URL) {
    fetch(URL)
      .then(res => res.json())
      .then(data => setProducts(data))
    categories.unshift("all")
  }
  //Function to fetch all categories into nav bar
  function fetchCategories(URL) {
    fetch(URL)
      .then(res => res.json())
      .then(data => setCategories(data))
  }

  useEffect(() => {
    fetchCategories("https://fakestoreapi.com/products/categories");
    fetchProducts("https://fakestoreapi.com/products");
    console.log(products)
  }, [])
  return (
    <div className="">
      <header className="d-flex justify-content-between p-3 bg-dark text-white">
        <div><h2>Mom's Store</h2></div>
        <div className="d-flex flex-wrap">
          <span className="me-5">Home</span>
          <span className="me-5">Fashion</span>
          <span className="me-5">Electronics</span>
          <span className="me-5">Toys</span>
          <span className="me-5">Furniture</span>
        </div>
        <div className="d-flex flex-wrap">
          <span className=" me-5 bi bi-search"></span>
          <span className=" me-5 bi bi-heart"></span>
          <span className=" me-5 bi bi-person-circle"></span>
          <span className=" me-5 bi bi-cart4"></span>
        </div>
      </header>
      <section className="m-4 row">
        <nav className="col-2">
          <div>
            <label className="form-label">Select Category</label>
            <select className="form-select" onChange={selectCategory}>
              {
                categories.map((category) =>
                  <option key={category} value={category} >{category.toUpperCase()}</option>
                )
              }
            </select>
          </div>
        </nav>
        <main className="col-10 d-flex flex-wrap">
          {products.map((product) =>
            <div className="card m-2 p-1">
                <img height="150" src={product.image}></img>
                <div className="card-header">
                  <p className="card-title" key={product.title}>{product.title}</p>
                </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd> ₹{product.price}</dd>
                  <dt>Rating</dt>
                  <dd><span className="bi bi-star-fill text-warning"> {product.rating.rate}</span> [{product.rating.count}]</dd>

                </dl>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger"> <span className="bi bi-cart4">Add to Cart</span></button>
              </div>
            </div>
          )
          }
        </main>
      </section>
    </div>
  )
}