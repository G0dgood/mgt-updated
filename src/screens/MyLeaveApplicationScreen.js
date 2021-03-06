import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { createLeaveApplication, getMyLeaveApplication } from '../actions/leaveApplication';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import FixedNavbar from '../components/FixedNavbar';
import Header from '../components/Header';

const MyLeaveApplicationScreen = ({ history, match }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [leaveType, setLeaveType] = useState('')
  const [fromDate, setLeaveStartDate] = useState('')
  const [toDate, setLeaveEndDate] = useState('')
  const [reasonForLeave, setLeaveDescription] = useState('')
  const [leaveStatus] = useState('')

  const pageNumber = match.params.pageNumber || 1
  const employees = 'myleave'
    
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const leaveAppDetails = useSelector(state => state.leaveAppDetails)
  const { data, pages, page } = leaveAppDetails

  const updateLeaveApp = useSelector(state => state.updateLeaveApp)
  const { success:successUpdate } = updateLeaveApp

  const createLeaveApp = useSelector(state => state.createLeaveApp)
  const { success:successCreate } = createLeaveApp


    useEffect(() => {

      if(!userInfo) {
          history.push('/')
      } else {
        dispatch(getMyLeaveApplication(pageNumber))
      }
  }, [dispatch, history, data, successCreate, successUpdate, userInfo, pageNumber])




  const createsubmitHandler= (e) => {
    e.preventDefault(e)
    dispatch(createLeaveApplication(
        leaveType,
        fromDate,
        toDate,
        reasonForLeave,
        leaveStatus
      ))
    console.log(`type: ${leaveType}, from: ${fromDate}, to: ${toDate}, reason: ${reasonForLeave}`)
  }

  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper'>
        <Col md={4} lg={2} className='d-none d-md-block'>
					<FixedNavbar />
				</Col>
				<Col xs={12} md={8} lg={10}>
          <Header />
          <div className='allLeave-title'>
					  <h1>My Leave</h1>
					  <Button onClick={handleShow} className='applyleave-btn'>
              Apply Leave
            </Button>
          </div>
					<div className='myleave-wrapper'>
      <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="myleave-modal">
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={createsubmitHandler}>
            
            <Form.Group controlId="leaveType">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control 
                  as="select"
                  custom 
                  size='sm'
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}>
                    <option value=''>Select Leave Type</option>
                    <option value='Sick-Leave'>Sick Leave</option>
                    <option value='Paid-Leave'>Paid Leave</option>
                    <option value='Maternity-Leave'>Maternity Leave</option>
                    <option value='Work-Trip'>Work Trip</option>
                </Form.Control>
            </Form.Group>
            <Form.Row>
            <Form.Group as={Col} controlId='startDate'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type='date' placeholder='Start Date'  value={fromDate}
                onChange={(e) => setLeaveStartDate(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId='endDate'>
              <Form.Label>End Date</Form.Label>
              <Form.Control type='date' placeholder='End Date'  value={toDate}
                onChange={(e) => setLeaveEndDate(e.target.value)}></Form.Control>
            </Form.Group>
            </Form.Row>
            <Form.Group controlId='description'>
              <Form.Label>Detailed Reason For Leave Application</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                style={{ backgroundColor: 'var(--input-field-color)' }}
                value={reasonForLeave}
                onChange={(e) => setLeaveDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Control placeholder="Pending" disabled />
            </Form.Group>
            <hr />
            <Button className='applyleave-btn mb-2 mr-3' type='submit' onClick={handleClose}>
              Apply
            </Button>
            <Button className='mb-2' variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>

      <Table striped bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Detailed Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user._id}>
              <td>{user.leaveType}</td>
              <td>{moment(user.fromDate).format("DD-MM-YYYY")}</td>
              <td>{moment(user.toDate).format("DD-MM-YYYY")}</td>
              <td>{user.reasonForLeave}</td>
              <td>{user.leaveStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate
        destination={employees}
        pages={pages} 
        page={page} />			
    		</div>
      	</Col>
      </Row>
    </>
  );
}

export default MyLeaveApplicationScreen;