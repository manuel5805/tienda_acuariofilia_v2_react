import React, { useEffect,useState  } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ViewProduct.css'

const ViewProduct = ({ storedToken }) => {
const [productData, setProductData] = useState(null);
const [assessment, setAssessment] = useState('');
const [comment, setComment] = useState('');
const [review, setReview] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const { productId } = useParams();
const [currentPage, setCurrentPage] = useState(1);
const reviewsPerPage = 4;

const handleAssessmentChange = (e) => {
  setAssessment(e.target.value);
};

const handleCommentChange = (e) => {
  setComment(e.target.value);
};


  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reviews/product/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setReview(data);
          console.log(data);
        } else {
          console.error('Error fetching review data');
        }
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };


    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/read/${productId}`, {
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
          console.error('Error fetching product data');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    if (storedToken) {
      fetchProductData();
      fetchReviewsData();
    }
  }, [storedToken]);
  
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

  const handleSubmit = async (e) => {
    if(storedToken){
      e.preventDefault();

      const reviewData = {
        user_id: storedToken,
        product_id: productId,
        assessment: assessment,
        comment: comment,
      };

      try {
        const response = await fetch('http://localhost:8000/api/reviews/store', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Reseña creada correctamente');
          console.log('Respuesta del servidor:', data);
        
        } 
        else {
          setErrorMessage('Los datos son invalidos');
          console.error('Error en la solicitud');
        }
      } 
      catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
    else{
      window.location.href = "http://localhost:3000/user/login";
    }
  };

  const pageNumbers = [];
  if (review) {
    for (let i = 1; i <= Math.ceil(review.length / reviewsPerPage); i++) {
      pageNumbers.push(i);
    }
  }
   const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * reviewsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - reviewsPerPage;
  const currentReviews = review && review.slice(indexOfFirstProduct, indexOfLastProduct);
  
  return (
    <div className='main_container_product'>
        <div className='product_info_item'>
            <div className='product_info_1'>
                <div className='product_view_img_container'>
                <img
                    className="img_product_view"
                    src={`http://localhost:8000/${productData && productData.product_image}`}
                    alt="Imagen de perfil"
                  />
                </div>
                <div className='product_info'>
                  <div>Nombre: {productData && productData.name}</div>
                  <div>Marca: {productData && productData.brand}</div>
                  <div>Categoria: {productData && productData.category}</div>
                  <div>Precio: {productData && productData.price}€</div>
                  {productData && productData.quantity > 0 ? (
                    <div>Cantidad:<strong className='product_stock_true'> En stock</strong></div>
                    ) : (
                    <div>Cantidad:<strong className='product_stock_false'>Sin stock</strong></div>
                      )
                  }
                  {productData && productData.quantity > 0 ? (
                   <div><button onClick={() => handleSaveToLocalStorage(productData)}>Añadir al carrito</button></div>
                    ) : (
                      <div><button  disabled={true}>Añadir al carrito</button></div>
                      )
                  }    
                </div>
            </div>
            <div className='product_info_2'>
              {productData && productData.description}
            </div>
        </div>
        <h2>Reseñas</h2>
        <div className='container_form_review'>
          <form className='form_review' onSubmit={handleSubmit}>
          <div className="form_review_item">
            <label>Valoracion (entre 0 y 5):</label>
            <input
              type="number"
              min="0"
              max="5"
              value={assessment}
              onChange={handleAssessmentChange}
              required
            />
          </div>
          <div className="form_review_item">
            <label>Comentario:</label>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows={5} 
              cols={50} 
            />
          </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button id="boton_comentar" type="submit">Comentar</button>
          </form>
        </div>
        <div className='container_reviews'>
        {currentReviews &&
          currentReviews.map((review) => (
            <div key={review.id} className='review_item'>
              <div>
                <div className='img_profile_review_container'>
                <img
                    className="img_profile_review"
                    src={`http://localhost:8000/${review.user_relation.profile_image}`}
                    alt="Imagen de perfil"
                  />
                </div>
                <div>Usuario: {review.user_relation.name}  {review.user_relation.last_name}</div>
                <div>Valoracion: {review.assessment}</div>
              </div>
              <div>
                {review.comment}   
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

export default ViewProduct;
