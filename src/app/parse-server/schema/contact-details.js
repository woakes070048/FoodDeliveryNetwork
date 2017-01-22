/* jshint esversion: 6 */

import parse from 'parse';

class ContactDetails extends parse.Object {
  constructor() {
    super('ContactDetails');
  }

  static spawn({
    phone,
    mobile,
  }) {
    const contactDetails = new ContactDetails();

    contactDetails.set('phone', phone);
    contactDetails.set('mobile', mobile);

    return contactDetails;
  }
}

export default ContactDetails;
