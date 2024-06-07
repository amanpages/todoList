import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Checkbox from './Checkbox';
import Button from './Button';

const TodoRow = ({ id, label, onDelete, onEdit }) => {
  const [checked, setChecked] = useState(() => {
    const storedChecked = localStorage.getItem(id);
    return storedChecked ? JSON.parse(storedChecked) : false;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(checked));
  }, [checked, id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(label);
    setIsEditing(false);
  };

  return (
    <div className="todo-row">
      <Checkbox label={label} checked={checked} onChange={(isChecked) => setChecked(isChecked)} />
      <Button onClick={handleEdit} variant="small" className="edit-btn">Edit</Button>
      <Button onClick={onDelete} variant="small" className="delete-btn">Delete</Button>

      <Modal
        isOpen={isEditing}
        onRequestClose={handleCancel}
        contentLabel="Edit Task"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Edit Task</h2>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="edit-input"
        />
        <Button onClick={handleSave} variant="small" className="save-btn">Save</Button>
        <Button onClick={handleCancel} variant="small" className="cancel-btn">Cancel</Button>
      </Modal>
    </div>
  );
};

export default TodoRow;
