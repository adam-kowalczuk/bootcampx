const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2] || 'JUL02';
const values = [cohortName];

pool.query('SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort FROM teachers JOIN assistance_requests ON teachers.id = teacher_id JOIN students ON students.id = student_id JOIN cohorts ON cohorts.id = cohort_id WHERE cohorts.name LIKE $1 ORDER BY teacher;', values)
  .then(res => {
    console.log('connected');
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));