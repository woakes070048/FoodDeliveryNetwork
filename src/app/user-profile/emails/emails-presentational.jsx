import React, {
  PropTypes,
} from 'react';
import {
  Col,
} from 'react-bootstrap';
import EmailPresentational from './email-presentational';

const EmailsPresentational = ({
    emails,
    sendEmailVerification,
  }) =>
    <Col
      sm={6}
      md={6}
      lg={4}
    >
      <h3>Emails</h3>
      <div className="form-divider" />
      {emails.map(email => <EmailPresentational
        key={email.emailAddress}
        email={email}
        sendEmailVerification={sendEmailVerification}
      />)}
    </Col>;

EmailsPresentational.propTypes = {
  emails: PropTypes.arrayOf(
    React.PropTypes.shape({
      emailAddress: PropTypes.string.isRequired,
      emailAddressVerified: PropTypes.bool.isRequired,
    }),
  ),
  sendEmailVerification: PropTypes.func.isRequired,
};

export default EmailsPresentational;
