/* jshint esversion: 6 */

import parse from 'parse';

class Name extends parse.Object {
  constructor() {
    super('Name');
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
}

export default Name;
