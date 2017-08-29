import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Dailytotals from '../../api/dailytotals';

const categorylist = ['Opportunity', 'Horizon', 'Critical'];
const duedatelist = ['09/01/17', '09/04/17', '09/07/17', '09/12/17', '09/15/17', '09/20/17'];


const crititcalDailytotalsSeed = (userId, username) => ({
  collection: Dailytotals,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 10,
  model(dataIndex) {
    return {
      username: 'admin',
      owner: userId,
      text: `Dailytotal #${dataIndex + 1}`,
      dueDate: `09/${dataIndex + 1}/17`,
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
