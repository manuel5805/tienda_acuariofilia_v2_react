import React, { useEffect,useState  } from 'react';
import '../css/Inquiries.css'
const Inquiries = ({ storedToken }) => {
const [inquiriesData, setinquiriesData] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
    const fetchInquiriesData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/inquiries/read_all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            if (response.ok) {
                const data = await response.json();
                setinquiriesData(data);
                console.log(data);
            } else {
                console.error('Error fetching inquiries data');
            }
        } catch (error) {
            console.error('Error fetching inquiries data:', error);
        }
    };

    fetchInquiriesData();
}, []);

const inquiriesPerPage = 6;
const totalInquiries = inquiriesData ? inquiriesData.length : 0;
const indexOfLastInquiry = currentPage * inquiriesPerPage;
const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;

let currentInquiries = [];
if (inquiriesData) {
  currentInquiries = inquiriesData.slice(indexOfFirstInquiry, indexOfLastInquiry);
}

const paginate = (pageNumber) => setCurrentPage(pageNumber);

return (
  <div className='first_container'>
    {storedToken && 
       <div className='info_container'>
        <nav className="nav_options">
            <ul className='inquiry_list'>
              <li className='inquiry_options'><a href="http://localhost:3000/inquiries/create">Crear consulta</a></li>

            </ul>
          </nav>
        </div>
    }
    <div className='main_container_inquiries'>
      <div className='content_inquiry'>
        {currentInquiries &&
          currentInquiries.map((inquiry, index) => (
            <div className='inquiry' key={index}>
              <div className='inquiry_info'>
                <div>
                  <img
                    className="img_inquiry"
                    src={`http://localhost:8000/${inquiry && inquiry.user_relation.profile_image}`}
                    alt="Imagen de perfil"
                  />
                </div>
                <div>
                  {inquiry && `${inquiry.user_relation.name} \u00A0 ${inquiry.user_relation.last_name}`}
                </div>
              </div>
              <div>Titulo: <a href={`http://localhost:3000/Inquiries/show/${inquiry && inquiry.id}`}>{inquiry && inquiry.title}</a></div>
              <div>Categoria: {inquiry && inquiry.category}</div>
            </div>
          ))}
      </div>
      <div className='pagination'>
        <ul className='pageNumbers'>
          {Array(Math.ceil(totalInquiries / inquiriesPerPage))
            .fill()
            .map((_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  </div>
);

  
};

export default Inquiries;