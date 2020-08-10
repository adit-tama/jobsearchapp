import React from 'react';
import useFetchJobs from './useFetchJob';
import { Container } from 'react-bootstrap';
import Job from './Job';

function App() {
  const { jobs, loading, error } = useFetchJobs();
  return (
    <Container className='my-4'>
      <h1 className="mb-4">Job Vacancies Portal</h1>
      { loading && <h1>Loading ...</h1> }
      { error && <h1>Error, Try Refreshing</h1> }
      { jobs !== [] ? jobs.map((job, index) => {
        return <Job key={index} job={job} />
      }) : ''}
    </Container>
  );
}

export default App;
