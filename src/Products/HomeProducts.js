import React, { useEffect, useState } from 'react';
import '../css/Home.css';

const HomeProducts = ({ storedToken }) => {
  const [productData, setProductData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/read_all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProductData(data);
          console.log(data);
        } else {
          console.error('Error fetching products data');
        }
      } catch (error) {
        console.error('Error fetching products data:', error);
      }
    };

    fetchProductsData();
  }, []);

  const pageNumbers = [];
  if (productData) {
    for (let i = 1; i <= Math.ceil(productData.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSaveToLocalStorage = (product) => {
    if(storedToken){
      const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
    
      const exists = savedProducts.some((savedProduct) => savedProduct.id === product.id);
    
      if (!exists) {
        const productToSave = {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
        };
    
        savedProducts.push(productToSave);
    
        localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
        alert('El producto: '+ product.name + ' se añadio al carrito');
      } else {
        alert('El producto: '+ product.name + ' ya esta en el carrito');
      }
    }
    else{
      window.location.href = "http://localhost:3000/user/login";
    }

  };

  const handleButtonClick = (idProduct) => {
      window.location.href = `http://localhost:3000/products/show/${idProduct}`;
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productData && productData.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='main_container_home'>
      <div className='category_container'>
          <div className='category_item'>
            <div className='img_category_container'>
            <img
                    className="img_category"
                    src="http://localhost:8000/images/category_comida.png"
                    alt="categoria producto"
            />
            </div>
            <div>
              Comida
            </div>
          </div>
          <div className='category_item'>
            <div className='img_category_container'>
            <img
                    className="img_category"
                    src="http://localhost:8000/images/category_medicamentos.png"
                    alt="categoria producto"
            />
            </div>
            <div>
              Medicamentos
            </div>
          </div>
          <div className='category_item'>
            <div className='img_category_container'>
                <img
                        className="img_category"
                        src="http://localhost:8000/images/category_accesorios.png"
                        alt="categoria producto"
                />
            </div>
            <div>
              Accesorios
            </div>
          </div>
          <div className='category_item'>
            <div className='img_category_container'>
                <img
                        className="img_category"
                        src="http://localhost:8000/images/category_filtros.png"
                        alt="categoria producto"
                />
            </div>
            <div>
              Filtros
            </div>
          </div>
      </div>
      <div className='products_main_container'>
        {currentProducts &&
          currentProducts.map((product) => (
            <div key={product.id} className='product_item'>
              <div className='img_product_container'>
                  <img
                    className="img_product"
                    src={`http://localhost:8000/${product && product.product_image}`}
                    alt="Imagen de perfil"
                  />
                </div>
              <div>{product.name}</div>
              <div>Marca: {product.brand}</div>
              <div>Precio: {product.price}€</div>
              <div className='button_products'>
                <button onClick={() => handleSaveToLocalStorage(product)}>Añadir al carrito</button>
                <button onClick={() => handleButtonClick(product.id)}>Ver info</button>
              </div>
            </div>
          ))}
        <div className='pagination'>
          <ul className='pageNumbers'>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button onClick={() => handleClick(number)}>{number}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
