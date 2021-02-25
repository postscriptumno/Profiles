import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import {useHttp} from '../../hooks/http.hook';
import './profile-card.css';

const ProfileCard = ({profile, setCardEditing, editingCard, index}) => {
  const {request} = useHttp();

  return (
    <Card className="profile-card" style={{
      width: editingCard === profile._id ? '420px' : '200px',
      height: editingCard === profile._id ? '420px' : '200px',
    }}>
      <Card.Body>
        <Card.Title>Profile #{index}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {profile.name}
        </Card.Subtitle>
        <Card.Text className="d-flex flex-column">
          <span>Gender: {profile.gender}</span>
          <span>
              Birthdate: {profile.birthdate}
          </span>
          <span>City: {profile.city}</span>
        </Card.Text>
        {
          editingCard === profile._id ?
            (
              <Card.Link style={{cursor: 'pointer'}} onClick={() => {
                setCardEditing(-1);
              }}>
                X
              </Card.Link>
            ) :
            (
              <Card.Link style={{cursor: 'pointer'}} onClick={() => {
                setCardEditing(profile._id);
              }}>
                Edit
              </Card.Link>
            )
        }
        <Card.Link
          style={{
            cursor: 'pointer',
          }}
          onClick={async () => {
            return await request(
                `/api/profiles/delete/${profile._id}`,
                'DELETE',
            );
          }}
        >Delete</Card.Link>
      </Card.Body>
    </Card>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  editingCard: PropTypes.number.isRequired,
  setCardEditing: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default ProfileCard;