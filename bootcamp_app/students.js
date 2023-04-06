const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const queryString = 'SELECT students.id, students.name, cohorts.name as cohorts_name FROM students JOIN cohorts ON cohorts.id = cohort_id WHERE cohorts.name LIKE $1LIMIT $2;';
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohorts_name} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));