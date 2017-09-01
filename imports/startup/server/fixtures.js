import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Dailytotals from '../../api/dailytotals';

const categorylist = ['Opportunity', 'Horizon', 'Critical'];
const dailytotalslist = [454.25, 500, 399, 748.49, 25];

const crititcalDailytotalsSeed = (userId, username) => ({
  collection: Dailytotals,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 10,
  model(dataIndex) {
    return {
      username: 'admin',
      owner: userId,
      total: dailytotalslist[Math.floor(Math.random() * categorylist.length)],
      date: `2017-09-${dataIndex + 1}`,
      category: categorylist[Math.floor(Math.random() * categorylist.length)],
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    username: 'admin',
    password: 'password',
    data(userId, username) {
      return crititcalDailytotalsSeed(userId, username);
    },
  },
  ],

});
