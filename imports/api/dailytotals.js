import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';

export const Dailytotals = new Mongo.Collection('dailytotals');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish dailytotals that are public or belong to the current user
  Meteor.publish('dailytotals', function dailytotalsPublication() {
    return Dailytotals.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });

  Meteor.publish('dailytotals.view', function dailytotalsView(dailytotalId) {
    check(dailytotalId, String);
    return Dailytotals.find({ _id: dailytotalId, owner: this.userId });
  });

}

Meteor.methods({
  'dailytotals.insert'(dailytotal) {
    check(dailytotal, {
      text: String,
      dueDate: String,
      category: String,
    });

    // Make sure the user is logged in before inserting a dailytotal
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Dailytotals.insert({
        username: Meteor.user().username,
        owner: this.userId, ...dailytotal });
  },

  'dailytotals.update'(dailytotal) {
    check(dailytotal, {
      _id: String,
      text: String,
      dueDate: String,
      category: String,
    });

    const dailytotalId = dailytotal._id;
    Dailytotals.update(dailytotalId, { $set: dailytotal });
  },

  'dailytotals.remove'(dailytotalId) {
    check(dailytotalId, String);

    const dailytotal = Dailytotals.findOne(dailytotalId);
    if (dailytotal.private && dailytotal.owner !== Meteor.userId()) {
      // If the dailytotal is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Dailytotals.remove(dailytotalId);
  },

  'dailytotals.setChecked'(dailytotalId, setChecked) {
    check(dailytotalId, String);
    check(setChecked, Boolean);

    const dailytotal = Dailytotals.findOne(dailytotalId);
    if (dailytotal.private && dailytotal.owner !== Meteor.userId()) {
      // If the dailytotal is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Dailytotals.update(dailytotalId, { $set: { checked: setChecked } });
  },

  'dailytotals.setPrivate'(dailytotalId, setToPrivate) {
    check(dailytotalId, String);
    check(setToPrivate, Boolean);

    const dailytotal = Dailytotals.findOne(dailytotalId);

    // Make sure only the dailytotal owner can make a dailytotal private
    if (dailytotal.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Dailytotals.update(dailytotalId, { $set: { private: setToPrivate } });
  },
});


Dailytotals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Dailytotals.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Dailytotals.schema = new SimpleSchema({
  text: {
    type: String,
    label: 'The text of the dailytotal.',
  },
  dueDate: {
    type: String,
    label: 'The due date of the dailytotal.',
  },
  category: {
    type: String,
    label: 'The category of the dailytotal.',
  },
  username: {
    type: String,
    label: 'The username of the dailytotal.',
  },
  owner: {
    type: String,
    label: 'The username of the dailytotal.',
  },
  checked: {
    optional: true,
    type: Boolean,
    label: 'Check is completed.',
  },
  private: {
    optional: true,
    type: Boolean,
    label: 'Dailytotal to private or public.',
  },

});

Dailytotals.attachSchema(Dailytotals.schema);

export default Dailytotals;
