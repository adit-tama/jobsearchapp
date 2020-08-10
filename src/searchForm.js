import React from 'react';
import { Form, Col } from 'react-bootstrap';

const searchForm = ({ params, onParamChange }) => {
  return (
  	<Form className="mb-4">
  		<Form.Row>
  			<Form.Group as={Col}>
  				<Form.Label>Keyword</Form.Label>
  				<Form.Control
  					onChange={onParamChange}
  					value={params.description}
  					name='description'
  					type='text'
  				/>
  			</Form.Group>
  			<Form.Group as={Col}>
  				<Form.Label>Location</Form.Label>
  				<Form.Control
  					onChange={onParamChange}
  					value={params.location}
  					name='location'
  					type='text'
  				/>
  			</Form.Group>
  		</Form.Row>
  	</Form>
  )
}

export default searchForm;