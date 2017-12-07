const Student = function (first, last, course) {
  this.first = first;
  this.last = last;
  this.course = [];
};

Student.prototype.name = function() {
  console.log(`${this.first} ${this.last}`);
};

Student.prototype.enroll = function(course) {
  if (!(course.students.includes(this))) {
    course.students.push(this);
    this.course.push(course);
  }
};

Student.prototype.courseLoad = function() {
  let courseLoad = {};
  // console.log(this.course);
  this.course.forEach (function(course) {
    courseLoad[course.department] = (courseLoad[course.department] || 0) + course.credits;
  });
  return courseLoad;
};

const Course = function (name, department, credits, students) {
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.students = [];
};

Course.prototype.addStudent = function(student) {
  student.enroll(this);
};
