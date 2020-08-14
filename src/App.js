import React from 'react';
import useFetchJobs from './useFetchJob';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './jobsPagination';
import SearchForm from './searchForm';
// import Logo from './images/Logo';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as Background } from './images/background.svg';
import Github from './images/github.svg';
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
  const card = [1,2,3,4,5];
  return (
    card.map((index) => {
      return (
        <Card key={index} className={'d-flex flex-column'}>
          <Card.Body >
          <Skeleton width={100}/>
          <div>
          <Skeleton width={50}/>
          </div>
          <Skeleton count={5}/>
          </Card.Body >
        </Card>
      )
    }) 
  )
    
}

function App() {
  const [page, setPage] = React.useState(1);
  const [params, setParams] = React.useState({});
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)
  const [details, showDetails] = React.useState(false);

  const CardContent = ({job}) => {
    return (
      <Card className='card sticky-top' style={{height:"75vh", overflow:"auto"}}> 
          <Card.Body >
              <img 
                className="d-none d-md-block" 
                alt="company logo"
                height="60" 
                src={ job.company_logo } 
              />
              <br />
              <div>
                <Card.Title>
                  { job.title }
                  <h6 className='text-muted font-weight-light'>
                  {job.company ? job.company : job.company_name}</h6>
                </Card.Title>
                <Card.Subtitle className='text-muted mb-2'>
                  { new Date(job.created_at ? job.created_at : job.publication_date).toLocaleDateString() }
                </Card.Subtitle>
                <br />
                <Card.Subtitle className='text-muted mb-2'>
                  How to Apply
                </Card.Subtitle>
                <div style={{wordBreak: 'break-all'}}>
                  { job.how_to_apply && <ReactMarkdown source={job.how_to_apply} /> }
                  { !job.how_to_apply && <a href={job.url}>{job.url}</a> }
                </div>
              </div>
              <br />
              <Card.Subtitle className='text-muted mb-2'>
                Job Details
              </Card.Subtitle>
              <div style={{wordBreak: 'break-all'}}>
                { job && <ReactMarkdown source={job.description} /> }
              </div>
              <Card.Body className={'d-flex justify-content-end'}>
                <Button
                  className="mt-2" 
                  variant={ "danger" }
                  onClick={() => showDetails(false)}
                >
                  {"Close"}
                </Button> 
              </Card.Body>
          </Card.Body>
        </Card>
    )
  }

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return {...prevParams, [param]:value}
    })
  }

  return (
    <div>
      <Container className={"header sticky-top d-none d-lg-block d-xl-block"}>
        <Logo className={"mt-4 mb-3"}/>
        <Container className={"d-flex justify-content-end align-items-center"}>
          <span className="text-muted">Job source:  </span>
          <a href="https://jobs.github.com/" target="_blank" rel="noopener noreferrer">
            <img 
              className={"ml-1"}
              alt="github logo"
              height="30" 
              src={ Github } 
            />
          </a>
        </Container>
        <SearchForm 
          params={ params } 
          onParamChange={ handleParamChange }
        />
      </Container>
      <Container className={"header d-lg-none d-xl-none pb-1"}>
        <Logo className={"mt-4 mb-3"}/>
        <Container className={"d-flex justify-content-end align-items-center"}>
          <span className="text-muted">Job Source:  </span>
          <a href="https://jobs.github.com/" target="_blank" rel="noopener noreferrer">
            <img 
              className={"ml-1"}
              alt="github logo"
              height="30" 
              src={ Github } 
            />
          </a>
        </Container>
        <SearchForm 
          params={ params } 
          onParamChange={ handleParamChange }
        />
      </Container>
      <Container className='my-4'>
        <Row>
          <Col>
            { loading && <Loading /> }
            { error && <h1>Error, Try Refreshing</h1> }
            { jobs.length === 0 && <h5>Sorry, No Such Vacancies Available</h5>}
            { jobs !== [] ? jobs.map((job, index) => {
              return <Job key={index} job={job} showDetails={showDetails} />
            }) : '' }
            { jobs.length !== 0 && <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} /> }
          </Col>
          <Col className={"d-none d-lg-block d-xl-block "}>
            <div style={{top:"12rem"}}className={"d-flex align-items-center justify-content-center sticky-top"}>
              { !details && <Background style={{height:"60vh", top:"20rem", left:"20rem"}}/> }
              { details && <CardContent job={details} /> }
            </div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
