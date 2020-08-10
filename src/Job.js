import React from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const Job = ({ job }) => {
	const [open, setOpen] = React.useState(false);

	const remotiviLogo = 'https://remotive.io/web/image/res.company/1/logo?unique=ba45210';
  	return (
	    <Card className='mb-3'>
	    	<Card.Body>
	    		<div className={"d-flex justify-content-between"}>
	    			<div>
	    				<Card.Title>
	    				{ job.title } - <span className='text-muted font-weight-light'>
	    				{job.company ? job.company : job.company_name}</span>
	    				</Card.Title>
	    				<Card.Subtitle className='text-muted mb-2'>
	    				{ new Date(job.created_at ? job.created_at : job.publication_date).toLocaleDateString() }
	    				</Card.Subtitle>
	    				<Card.Subtitle className='text-muted mb-2'>
	    				{`Source: ${job.tags ? "Remotive" : "Github Jobs" }` }
	    				</Card.Subtitle>
	    				<Badge variant='secondary' className='mr-2'>{ job.type ? job.type : job.job_type }</Badge>
	    				<Badge variant='secondary' className='mr-2'>{  job.location ? job.location : job.candidate_required_location }</Badge>
	    				<div style={{wordBreak: 'break-all'}}>
	    					{ job.how_to_apply && <ReactMarkdown source={job.how_to_apply} /> }
	    					{ !job.how_to_apply && <a href={job.url}>{job.url}</a> }
	    				</div>
	    			</div>
	    			<img 
	    				className="d-none d-md-block" 
	    				alt="company logo"
	    				height="30" 
	    				src={job.company_logo ? job.company_logo : remotiviLogo} 
	    			/>
	    		</div>
		    	<Card.Text>
		    		<Button
		    			onClick={ () => setOpen(prevOpen => !prevOpen) }
		    			className="mt-2" 
		    			variant={ open ? "danger" : "primary" }
		    		>{open ? 'Hide Details' : 'Open Details'}</Button>
		    	</Card.Text>
		    	<Collapse in={open}>
			    	<div className="mt-4">
			    		{ job.tags && <div dangerouslySetInnerHTML={{__html:job.description}} />}
			    		{ !job.tags && <ReactMarkdown source={job.description} />}
			    	</div>
		    	</Collapse>
	    	</Card.Body>
	    </Card>
  	)
}

export default Job;