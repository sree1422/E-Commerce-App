import { useState, useEffect } from "react"
import '../components/Home.component.css'
export function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [cartItems,setCartItems]=useState([])
  const [cartSize,setCartSize]=useState(0)

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

  //function to updateCartSize
  function updateCartSize(){
    setCartSize(cartItems.length)
  }

//Function to fetch all products
  function fetchProducts(URL) {
    fetch(URL)
      .then(res => res.json())
      .then(data => setProducts(data))
    
  }
  //Function to fetch all categories into nav bar
  function fetchCategories(URL) {
    fetch(URL)
      .then(res => res.json())
      .then(data => setCategories(["all", ...data]))
  }
  //delete item from cart
  function deleteCart(item){
    setCartItems(cartItems.filter((x)=>x!=item))
    
    updateCartSize()
  }

  //function to handle add to cart
  function addToCart(id){
      fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res=>res.json())
      .then(product=>{
        cartItems.push(product)
        console.log(cartItems.length)
        updateCartSize()
        alert(`${product.title} \n is added to cart`)
      })  
  }

  useEffect(() => {
    fetchCategories("https://fakestoreapi.com/products/categories")
    fetchProducts("https://fakestoreapi.com/products");
   
  }, [])

  return (
    <div >
      <header className="d-flex justify-content-between p-3 bg-dark text-white">
        <div><h2>Mom's Store</h2></div>
        <ol className=" list-unstyled d-flex flex-wrap">
          {
            categories.map((category)=>
              <button key={category}className="btn text-white">
                <li className="me-5" >{category.toUpperCase()}</li>
              </button>)
          }
        </ol>
        <div className="d-flex flex-wrap">
          <span className="bi bi-search me-4"></span>
          <span className="bi bi-heart me-4"></span>
          <span className="bi bi-person-circle me-4"></span>
          <button data-bs-target="#cart" data-bs-toggle="modal" className="btn btn-light position-relative">
            <span className="bi bi-cart4 me-4"></span>
            <span className="badge rounded-circle bg-danger position-absolute">{cartSize}</span>
          </button>
          <div className="modal fade text-black" id="cart" width="1000" height="1000">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="text-primary">Your Cart Items</h2>
                  <button data-bs-dismiss='modal' className="btn btn-close"></button>
                </div>
                <div className="modal-body">
                  <table className="table-table-hover">
                    <thead className="text-align-center">
                      <tr>
                        <th className="me-5 text-align-center">Name</th>
                        <th className="me-5">Preview</th>
                        <th className="me-5">Price</th>
                      </tr>
                    </thead>
                    <tbody bg-color="gray">
                      { cartItems.map((item)=>
                        <tr>
                          <td>{item.title}</td>
                          <td ><img src={item.image} width="50px" height="50px"></img></td>
                          <td>{item.price}</td>
                          <td><button onClick={()=>deleteCart(item)} className="btn bi-trash-fill btn-danger"></button></td>
                        </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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
            <div key={product.id} className="card m-2 p-2">
                <img alt="product_image" height="150" src={product.image}></img>
                <div className="card-header pb-0">
                  <p className="card-title" >{product.title}</p>
                </div>
              <div className="card-body p-0">
                <dl>
                  <dt>Price</dt>
                  <dd> ₹{product.price}</dd>
                  <dt>Rating</dt>
                  <dd key={product.rating}><span className="bi bi-star-fill text-warning"> {product.rating.rate}</span> [{product.rating.count}]</dd>

                </dl>
              </div>
              <div className="card-footer">
                <button onClick={()=>addToCart(product.id)}  className="btn btn-danger"> <span className="bi bi-cart4">Add to Cart</span></button>
              </div>
            </div>
          )
          }
        </main>
      </section>
    </div>
  )
}