/* jshint esversion: 6 */

import parse from 'parse';

class ContactDetails extends parse.Object {
  constructor(contactDetails) {
    super('ContactDetails');

    this.contactDetails = contactDetails;
    this.getPhone = this.getPhone.bind(this);
    this.getMobile = this.getMobile.bind(this);
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

  getId() {
    return this.contactDetails.id;
  }

  getPhone() {
    return this.contactDetails.get('phone');
  }

  getMobile() {
    return this.contactDetails.get('mobile');
  }
}

export default ContactDetails;
