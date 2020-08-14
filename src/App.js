import React from 'react';
import useFetchJobs from './useFetchJob';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './jobsPagination';
import SearchForm from './searchForm';
// import Logo from './images/Logo';
import { ReactComponent as Logo } from './images/logo.svg';
import { ReactComponent as Background } from './images/background.svg';
import   Github from './images/github.svg';
import ReactMarkdown from 'react-markdown';

function App() {
  const [page, setPage] = React.useState(1);
  const [params, setParams] = React.useState({});
  const { jobs, loading, error } = useFetchJobs(params);
  const pageItems = 15;
  const pagesCount = Math.ceil(jobs.length / pageItems);
  const [details, showDetails] = React.useState(false);

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
    <div>
      <Container className={"header sticky-top d-none d-lg-block d-xl-block"}>
        <Logo className={"mt-4 mb-3"}/>
        <Container className={"d-flex justify-content-end align-items-center"}>
          <span className="text-muted">Job source:  </span>
          <a href="https://jobs.github.com/" target="_blank">
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
          <a href="https://jobs.github.com/" target="_blank">
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
            { loading && <h1>Loading ...</h1> }
            { error && <h1>Error, Try Refreshing</h1> }
            { jobs !== [] ? jobs.slice(page * pageItems, page * pageItems + pageItems).map((job, index) => {
              return <Job key={index} job={job} showDetails={showDetails} />
            }) : '' }
            <JobsPagination page={page} setPage={handlePageClick} pagesCount={pagesCount} />
          </Col>
          <Col className={"d-none d-lg-block d-xl-block "}>
            <div style={{top:"12rem"}}className={"d-flex align-items-center justify-content-center sticky-top"}>
              { !details && <Background style={{height:"60vh", top:"20rem", left:"20rem"}}/> }
            
              { details &&
                <Card className='card sticky-top' style={{height:"75vh", overflow:"auto"}}> 
                  <Card.Body >
                      <img 
                        className="d-none d-md-block" 
                        alt="company logo"
                        height="60" 
                        src={ details.company_logo } 
                      />
                      <br />
                      <div>
                        <Card.Title>
                        { details.title }
                        <h6 className='text-muted font-weight-light'>
                        {details.company ? details.company : details.company_name}</h6>
                        </Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>
                        { new Date(details.created_at ? details.created_at : details.publication_date).toLocaleDateString() }
                        </Card.Subtitle>
                        <br />
                        <Card.Subtitle className='text-muted mb-2'>
                          How to Apply
                        </Card.Subtitle>
                        <div style={{wordBreak: 'break-all'}}>
                          { details.how_to_apply && <ReactMarkdown source={details.how_to_apply} /> }
                          { !details.how_to_apply && <a href={details.url}>{details.url}</a> }
                        </div>
                      </div>
                      <br />
                      <div style={{wordBreak: 'break-all'}}>
                        <Card.Subtitle className='text-muted mb-2'>
                          Details
                        </Card.Subtitle>
                        { details && <ReactMarkdown source={details.description} /> }
                      </div> 
                  </Card.Body>
                </Card>
              }
            </div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
