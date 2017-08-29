/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Dailytotals } from './dailytotals.js';

if (Meteor.isServer) {
  describe('Dailytotals', () => {
    describe('methods', () => {
      const userId = Random.id();
      let dailytotalId;

      beforeEach(() => {
        Dailytotals.remove({});
        dailytotalId = Dailytotals.insert({
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        });
      });

      it('can delete owned dailytotal', () => {
        // Find the internal implementation of the dailytotal method so we can
        // test it in isolation
        const deleteDailytotal = Meteor.server.method_handlers['dailytotals.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId };

        // Run the method with `this` set to the fake invocation
        deleteDailytotal.apply(invocation, [dailytotalId]);

        // Verify that the method does what we expected
        assert.equal(Dailytotals.find().count(), 0);
      });
    });
  });
}
