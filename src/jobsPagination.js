import React from 'react';
import { Pagination } from 'react-bootstrap';

const jobsPagination = ({ page, setPage, pagesCount }) => {
  return (
    <Pagination>
    	{ page !== 1 && <Pagination.Prev 
    		onClick={ e => setPage(page - 1) } 
    	/> }
    	{ page !== 1 && <Pagination.Item>1</Pagination.Item> }
    	{ page > 3 && <Pagination.Ellipsis /> }
    	{ page > 2 && <Pagination.Item onClick={e => setPage(page - 1) }>{page-1}</Pagination.Item> }
    	<Pagination.Item active>{page}</Pagination.Item>
    	{ page < pagesCount && <Pagination.Item onClick={e => setPage(page + 1) }>{page + 1}</Pagination.Item>}
    	{ page < pagesCount - 2 && <Pagination.Ellipsis /> }
    	{ page < pagesCount - 1  && <Pagination.Item>{pagesCount}</Pagination.Item> }
    	{ page !== pagesCount && <Pagination.Next onClick={e => setPage(page + 1) }/>}
    </Pagination>
  )
}

export default jobsPagination;