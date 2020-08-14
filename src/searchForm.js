import React from 'react';
import { Form,Row,Col } from 'react-bootstrap';

const searchForm = ({ params, onParamChange }) => {
  return (
  	<Form className="mb-4">
  		<Form.Row className={"d-none d-lg-block d-xl-block"}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Keyword</Form.Label>
              <Form.Control
                onChange={onParamChange}
                value={params.description}
                placeholder={"Filter by: title, benefits, companies, experties"}
                name='description'
                type='text'
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                onChange={onParamChange}
                value={params.location}
                placeholder={"Filter by: city, state, zip code, or country"}
                name='location'
                type='text'
              />
            </Form.Group>
          </Col>
        </Row>
  		</Form.Row>
      <Form.Row className={"d-block d-lg-none d-xl-none"}>
        <Form.Group as={Col}>
          <Form.Label>Keyword</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.description}
            placeholder={"Filter by: title, benefits, companies, experties"}
            name='description'
            type='text'
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.location}
            placeholder={"Filter by: city, state, zip code, or country"}
            name='location'
            type='text'
          />
        </Form.Group>
      </Form.Row>
  	</Form>
  )
}

export default searchForm;