import React, { useEffect,useState  } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ShowInquiry.css'

const ShowInquiry = ({ storedToken }) => {
const [userData, setUserData] = useState(null);
const { inquiryId } = useParams();
const [comment_img, setComment_img] = useState('');
const [comment, setComment] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [allComents, setAllcoments] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const commentsPerPage = 2;

const handleCommentChange = (e) => {
  setComment(e.target.value);
};

const handleCommentImageChange = (e) => {
  const file = e.target.files[0]; 
  setComment_img(file);

};

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('description', comment)
  formData.append('user_id', storedToken);
  formData.append('inquiry_id', inquiryId);
  formData.append('img_comment', comment_img);

  
  try {
  const response = await fetch('http://localhost:8000/api/comments/store', {
    method: 'POST',
   
    body: formData,
  });


  if (response.ok) {
    console.log('Comentario Creado'); 
  } else {
    setErrorMessage('Error al crear comentario');
    console.error('Error en la solicitud'); 
  }
} catch (error) {
  console.error('Error en la solicitud:', error);
}

};

  useEffect(() => {
    const fetchInquiriesData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/inquiries/read/${inquiryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log(data);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCommentsData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/comments/inquiry/${inquiryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setAllcoments(data);
          console.log(data);
        } else {
          console.error('Error fetching comment data');
        }
      } catch (error) {
        console.error('Error fetching comment data:', error);
      }
    };
  
    if (storedToken) {
      fetchInquiriesData();
      fetchCommentsData();
    }
  }, [storedToken]);

  const pageNumbers = [];
  if (allComents) {
    for (let i = 1; i <= Math.ceil(allComents.length / commentsPerPage); i++) {
      pageNumbers.push(i);
    }
  }
   const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = allComents && allComents.slice(indexOfFirstComment, indexOfLastComment);

  return (
    <div className='main_container_inquiry'>
        <div className='content_inquiry_show'> 
              <div className='credentials_inquiry'>
                <div>
                <img
                    className="img_inquiry_2"
                    src={`http://localhost:8000/${userData && userData.user_relation.profile_image}`}
                    alt="Imagen de perfil"
                  />
                </div>
                <div>
                  Usuario: {userData && `${userData.user_relation.name} \u00A0 ${userData.user_relation.last_name}`}
                </div>
                <div>
                    Categoria: {userData && userData.category}
                </div>
                <div>
                    Estado: {userData && userData.state}
                </div>
                </div>
                <div className='second_container'>
                    <div className='inquiry_description'>
                        <div>
                        Titulo: {userData && userData.title}
                        </div>
                        <div>
                            {userData && userData.description}
                        </div>
                    </div>
                    <div>
                        <img
                            className="img_inquiry_3"
                            src={`http://localhost:8000/${userData && userData.img_inquiry}`}
                            alt="Imagen de perfil"
                        />
                    </div>
                </div>
        </div>
        <div className='comments_container'>
          <div className='container_form_comment'>
            <form className='form_comment' onSubmit={handleSubmit}>
            <div className="form_comment_item">
            <label>Adjuntar imagen:</label>
            <input type="file" name="img_comment" accept="image/*" onChange={handleCommentImageChange} />
            </div>
            <div className="form_comment_item">
              <label>Comentario:</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                rows={5} 
                cols={50} 
              />
            </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <button id="boton_comentar_2" type="submit">Comentar</button>
            </form>
          </div>
          <div className='comments_container_info'>
          {currentComments &&
          currentComments.map((allComents) => (
            <div key={allComents.id} className='comment_item'>
              <div>
                <div className='img_comment_container'>
                <img
                    className="img_comment"
                    src={`http://localhost:8000/${allComents.user_relation.profile_image}`}
                    alt="Imagen del usuario"
                  />
                </div>
                <div>Usuario: {allComents.user_relation.name}  {allComents.user_relation.last_name}</div>
              </div>
              <div>
                <div>
                {allComents.description}
                </div>
                <div className='img_comment_container_2'>
                  <img
                      className="img_comment_2"
                      src={`http://localhost:8000/${allComents.img_comment}`}
                      alt="Imagen del comentario"
                    />
                </div>
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
    </div>
      
     
  );
};

export default ShowInquiry;
