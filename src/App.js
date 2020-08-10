import React from 'react';
import useFetchJobs from './useFetchJob';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './jobsPagination';
import SearchForm from './searchForm'

function App() {
  const [page, setPage] = React.useState(1);
  const [params, setParams] = React.useState({});
  const { jobs, loading, error } = useFetchJobs(params);
  const pageItems = 15;
  const pagesCount = Math.ceil(jobs.length / pageItems);

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return {...prevParams, [param]:value}
    })
  }

  const handlePageClick = (page) => {
      if(page <= pagesCount) {
        setPage(page);
      }
  };
  return (
    <>
      <Container className="sticky-top bg-light p-1">
        <h1 className="mb-4">JOB VACANCIES PORTAL</h1>
        <p>A collection of IT job vacancies 
        from <a target="_blank" href="https://jobs.github.com/positions">Github Jobs</a> and <a target="_blank" href="https://remotive.io/">Remotive</a></p>
        <SearchForm 
          params={ params } 
          onParamChange={ handleParamChange }
        />
        <JobsPagination page={page} setPage={handlePageClick} pagesCount={pagesCount} />
      </Container>
      <Container className='my-4'>
        { loading && <h1>Loading ...</h1> }
        { error && <h1>Error, Try Refreshing</h1> }
        { jobs !== [] ? jobs.slice(page * pageItems, page * pageItems + pageItems).map((job, index) => {
          return <Job key={index} job={job} />
        }) : '' }
      </Container>
    </>
  );
}

export default App;
