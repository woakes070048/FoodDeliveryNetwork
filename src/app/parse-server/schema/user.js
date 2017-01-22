/* jshint esversion: 6 */

import parse from 'parse';
import Person from './person';

class User extends parse.Object {
  constructor(user) {
    super('User');

    this.user = user || parse.User.current();
  }

  saveUser({
    personName,
    contactDetails,
  }) {
    const self = this;

    return new Promise((resolve, reject) => {
      const existingPerson = self.user.get('person');
      const person = new Person(existingPerson);

      person.savePerson({
        personName,
        contactDetails,
      })
        .then((savedPerson) => {
          if (existingPerson) {
            resolve();
          } else {
            self.user.set('person', Person.createWithoutData(savedPerson.id));
            self.user.save()
              .then(result => resolve(result))
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }
}

export default User;
