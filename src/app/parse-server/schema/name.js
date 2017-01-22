/* jshint esversion: 6 */

import parse from 'parse';

class Name extends parse.Object {
  constructor(name) {
    super('Name');

    this.name = name;
    this.getSalutation = this.getSalutation.bind(this);
    this.getFirstName = this.getFirstName.bind(this);
    this.getMiddleName = this.getMiddleName.bind(this);
    this.getLastName = this.getLastName.bind(this);
    this.getPreferredName = this.getPreferredName.bind(this);
  }

  static spawn({
    salutation,
    firstName,
    middleName,
    lastName,
    preferredName,
  }) {
    const name = new Name();

    name.set('salutation', salutation);
    name.set('firstName', firstName);
    name.set('middleName', middleName);
    name.set('lastName', lastName);
    name.set('preferredName', preferredName);

    return name;
  }

  getId() {
    return this.name.id;
  }

  getSalutation() {
    return this.name.get('salutation');
  }

  getFirstName() {
    return this.name.get('firstName');
  }

  getMiddleName() {
    return this.name.get('middleName');
  }

  getLastName() {
    return this.name.get('lastName');
  }

  getPreferredName() {
    return this.name.get('preferredName');
  }

}

export default Name;
