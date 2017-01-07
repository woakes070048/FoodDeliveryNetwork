import React, {
  PropTypes,
} from 'react';
import {
  Badge,
  Button,
  Col,
} from 'react-bootstrap';

function getVerificationButtonOrBadge(sendEmailVerification, emailAddressVerified) {
  return emailAddressVerified ?
    (
      <Badge>Verified</Badge>
    ) :
    (
      <Button
        bsStyle="warning"
        bsSize="xsmall"
        onClick={sendEmailVerification}
      >
            Verify email
      </Button>
    );
}

const EmailPresentational = ({
    email,
    sendEmailVerification,
  }) =>
    <div>
      <Col
        sm={10}
        md={10}
        lg={10}
      >
        {email.emailAddress}
      </Col>
      <Col
        smOffset={10}
        mdOffset={10}
        lgOffset={10}
      >
        {getVerificationButtonOrBadge(sendEmailVerification, email.emailAddressVerified)}
      </Col>
    </div>;

EmailPresentational.propTypes = {
  email: React.PropTypes.shape({
    emailAddress: PropTypes.string.isRequired,
    emailAddressVerified: PropTypes.bool.isRequired,
  }),
  sendEmailVerification: PropTypes.func.isRequired,
};

export default EmailPresentational;
