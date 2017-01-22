/* jshint esversion: 6 */

import parse from 'parse';
import Name from './name';
import ContactDetails from './contact-details';

class Person extends parse.Object {
  constructor(person) {
    super('Person');

    this.person = person;
    this.getPersonName = this.getPersonName.bind(this);
    this.getContactDetails = this.getContactDetails.bind(this);
  }

  static loadPerson(personId, {
    loadName,
    loadContactDetails,
  }) {
    const query = new parse.Query(Person);

    if (loadName) {
      query.include('personName');
    }

    if (loadContactDetails) {
      query.include('contactDetails');
    }

    return new Promise((resolve, reject) => {
      query.get(personId)
        .then((person) => {
          resolve(new Person(person));
        })
        .catch(error => reject(error));
    });
  }

  static savePerson({
    personName,
    contactDetails,
  }, existingPerson = null) {
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

    return new Promise((resolve, reject) => {
      if (promises.length > 0) {
        Promise.all(promises)
          .then((values) => {
            const person = existingPerson || new Person();

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

  getId() {
    return this.person.id;
  }

  getPersonName() {
    return new Name(this.person.get('personName'));
  }

  getContactDetails() {
    return new ContactDetails(this.person.get('contactDetails'));
  }
}

export default Person;
