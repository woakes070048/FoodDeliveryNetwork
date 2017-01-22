/* jshint esversion: 6 */

import parse from 'parse';
import ContactDetails from './contact-details';
import Name from './name';

class Person extends parse.Object {
  constructor(person) {
    super('Person');

    this.person = person;
  }

  savePerson({
    personName,
    contactDetails,
  }) {
    let promises = [];
    let personNameIdx = -1;
    let contactDetailsIdx = -1;

    if (personName) {
      personNameIdx = promises.length;
      promises = [...promises, Name.spawn(personName)
        .save(),
      ];
    }

    if (contactDetails) {
      contactDetailsIdx = promises.length;
      promises = [...promises, ContactDetails.spawn(contactDetails)
        .save(),
      ];
    }

    const self = this;

    return new Promise((resolve, reject) => {
      if (promises.length > 0) {
        Promise.all(promises)
          .then((values) => {
            const person = self.person || new Person();

            if (personNameIdx !== -1) {
              person.set('personName', Name.createWithoutData(values[personNameIdx].id));
            }

            if (contactDetailsIdx !== -1) {
              person.set('contactDetails', ContactDetails.createWithoutData(values[contactDetailsIdx].id));
            }

            person.save()
              .then(result => resolve(result))
              .catch(error => reject(error));
          })
          .catch(error => reject(error));
      } else {
        resolve();
      }
    });
  }
}

export default Person;
