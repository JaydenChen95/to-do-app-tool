import { useState } from 'react';
import { Card, Button, Form, Collapse, Row, Col, Spinner } from 'react-bootstrap';
import { convertISODateToDateField } from '../utils/dateConverter';
import validate from '../utils/validate';
import ButtonWithConfirm from './ButtonWithConfirm';

export default function TaskItem({ task, onSave, onDelete, setError, onRestore }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isLoading, setIsLoading] = useState(false);

  // track if task is edited
  // if it's not, disable save button
  const [formChange, setFormChange] = useState(false);

  const handleChange = (e) => {
    setFormChange(true);
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSubTaskChange = (index, field, value) => {
    setFormChange(true);
    const updatedSubTasks = [...editedTask.subTasks];
    updatedSubTasks[index][field] = value;
    setEditedTask({ ...editedTask, subTasks: updatedSubTasks });
  };

  const handleAddSubTask = () => {
    setFormChange(true);
    setEditedTask({
      ...editedTask,
      subTasks: [
        ...editedTask.subTasks,
        { description: '', dueDate: '', priority: '', status: 'Uncompleted' },
      ],
    });
  };

  const handleRemoveSubTask = (index) => {
    setFormChange(true);
    const updatedSubTasks = editedTask.subTasks.filter((_, i) => i !== index);
    setEditedTask({ ...editedTask, subTasks: updatedSubTasks });
  };

  const handleSave = () => {
    const {error, message} = validate(editedTask);
    if(error){
        setError({
            show: true,
            message: message,
          })
          return;
    }
    setIsLoading(true);
    onSave(editedTask, setIsLoading);
    setIsEditing(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{task.description}</strong> <br />
            <small className={task.status === "Deleted" ? "text-danger" : "text-muted"}>{task.status}</small>
          </div>
          {
            isLoading ? <Spinner /> :
            (
              <Row>
                <Col>{
                        task.status !== "Deleted" 
                        && 
                        (<Button variant="outline-primary" size="sm" onClick={() => setIsEditing(!isEditing)}>
                          {isEditing ? 'Cancel' : 'Edit'}
                        </Button>)
                      }
                </Col>
                <Col>
                    {
                    task.status === 'Deleted' ? (<ButtonWithConfirm taskId={editedTask.id} onConfirm={onRestore} setIsLoading={setIsLoading} type="Restore" />) : 
                    (<ButtonWithConfirm taskId={editedTask.id} onConfirm={onDelete} setIsLoading={setIsLoading} type="Delete" />)
                    }
                </Col>
              </Row>
            )
          }
        </div>
        <Collapse in={isEditing}>
          <div className="mt-3">
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Description*</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={editedTask.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={editedTask.status} onChange={handleChange}>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Uncompleted</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate ? convertISODateToDateField(editedTask.dueDate) : null}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={editedTask.category} onChange={handleChange}>
                  <option value=""></option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select name="priority" value={editedTask.priority} onChange={handleChange}>
                  <option value=""></option>
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Select>
              </Form.Group>

              <hr />
              <h6>Sub-Tasks</h6>

              {editedTask.subTasks?.map((subTask, index) => (
                <div key={index} className="border p-2 mb-2 rounded bg-light">
                  <Row className="mb-2">
                    <Col>
                    <Form.Label>Description*</Form.Label>
                      <Form.Control
                        placeholder="Description"
                        value={subTask.description}
                        onChange={(e) =>
                          handleSubTaskChange(index, 'description', e.target.value)
                        }
                        required
                      />
                    </Col>
                    <Col>
                    <Form.Label>Due Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={subTask.dueDate ? convertISODateToDateField(subTask.dueDate) : null}
                        onChange={(e) =>
                          handleSubTaskChange(index, 'dueDate', e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <Form.Label>Priority</Form.Label>
                      <Form.Select
                        value={subTask.priority}
                        onChange={(e) =>
                          handleSubTaskChange(index, 'priority', e.target.value)
                        }
                      >
                        <option></option>
                        <option>Urgent</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </Form.Select>
                    </Col>
                    <Col>
                    <Form.Label>Status*</Form.Label>
                      <Form.Select
                        value={subTask.status}
                        onChange={(e) =>
                          handleSubTaskChange(index, 'status', e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Uncompleted</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <div className="text-end mt-2">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveSubTask(index)}
                    >
                      Remove Sub-Task
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline-secondary"
                size="sm"
                className="mb-3"
                onClick={handleAddSubTask}
              >
                Add Sub-Task
              </Button>

              <hr />

              <Button variant="success" size="sm" disabled={!formChange} onClick={handleSave}>
                Save
              </Button>
            </Form>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
