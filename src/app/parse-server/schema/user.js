/* jshint esversion: 6 */

import parse from 'parse';
import Person from './person';

class User extends parse.Object {
  constructor(user) {
    super('User');

    this.user = user;
    this.getPerson = this.getPerson.bind(this);
  }

  static saveUser({
    personName,
    contactDetails,
  }, existingUser) {
    return new Promise((resolve, reject) => {
      const existingPerson = existingUser.get('person');

      Person.savePerson({
        personName,
        contactDetails,
      }, existingPerson)
        .then((person) => {
          if (existingPerson) {
            resolve();
          } else {
            existingUser.set('person', Person.createWithoutData(person.id));
            existingUser.save()
              .then(result => resolve(result))
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }

  getId() {
    return this.user.id;
  }

  getPerson() {
    const obj = this.user || this;

    return new Person(obj.get('person'));
  }
}

export default User;
